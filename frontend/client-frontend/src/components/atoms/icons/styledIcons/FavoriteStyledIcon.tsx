import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import themes from "@/theme/themes";
import CustomizedBadges from "@/components/atoms/icons/styledIcons/CustomizedBadges";
import {useFavorite} from "../../../../../contexts/FavoriteContext";
import {ClickAwayListener, Divider, Popover, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Link from "next/link";
import {baseURL} from "../../../../../api/ApiClient";
import {Delete} from "@/components/atoms/icons";
import useTheme from "@/theme/themes";

const StyledFavoriteIcon = styled(FavoriteBorderIcon)(({theme}) => ({
    fontSize: 24,
    color: themes().palette.info.main,
}));

const FavoriteStyledIcon = () => {

    const theme = useTheme();

    const {allFavorites, numberOfFavorites, removeFromFavorite} = useFavorite();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: { currentTarget: React.SetStateAction<null>; }) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "favorites-popover" : undefined;

    const favoriteDeleteButton = (productId: number) => {
        removeFromFavorite(productId);
    };

    return (
        numberOfFavorites ? (
            <CustomizedBadges
                badgeContent={numberOfFavorites}
                aria-describedby={id}
                onClick={(e: any) => handleClick(e)}
            >
                <StyledFavoriteIcon/>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box sx={{
                            p: 2, width: "200px",
                            backgroundColor: theme.palette.background.lighter,
                            borderRadius: "14px",
                        }}>
                            {allFavorites.map((item) => (
                                <>
                                    <Box
                                        key={item.id}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            borderRadius: "14px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <Link
                                            href={`/shop/${item.id}`}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                                padding: 2,
                                                textDecoration: "none"
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    flex: "0 0 auto",
                                                    width: "44px",
                                                    height: "44px",
                                                }}
                                            >
                                                <img
                                                    src={`${baseURL}${item.imageName}`}
                                                    alt=""
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        borderRadius: "10px"
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{maxWidth: "118px"}}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{fontWeight: "bold", color: theme.palette.info.main}}
                                                >
                                                    {item.name}</Typography>

                                                <Typography variant="subtitle2"
                                                            sx={{color: theme.palette.info.main}}
                                                >{`${item.price} RON`}</Typography>

                                            </Box>
                                        </Link>

                                        <Delete
                                            sx={{
                                                color: theme.palette.background.darker, cursor: "pointer",
                                                "&:hover": {
                                                    color: "red",
                                                },
                                            }}
                                            onClick={() => favoriteDeleteButton(item.id)}
                                        >
                                        </Delete>
                                    </Box>
                                    <Divider sx={{backgroundColor: theme.palette.primary.main}}/>
                                </>
                            ))}

                        </Box>
                    </ClickAwayListener>
                </Popover>
            </CustomizedBadges>
        ) : (
            <StyledFavoriteIcon/>
        )
    );
};
export default FavoriteStyledIcon;