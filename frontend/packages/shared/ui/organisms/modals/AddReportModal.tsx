import { useState, useRef, useEffect } from "react";
import { BaseModal, useThemeToggle } from "ui";
import { Box, Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import {reportCommentApi, reportReviewApi, useAlert} from "components";

type AddReportModalProps = {
    isModalOpen: boolean;
    toggleModal: () => void;
    idCommentOrReviewToReport: number;
    userId: number;
    reportFor: "review" | "comment";
};

const AddReportModal = ({ isModalOpen, toggleModal, idCommentOrReviewToReport, userId, reportFor }: AddReportModalProps) => {
    const theme = useTheme();
    const { isDark } = useThemeToggle();
    const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
    const {pushAlert} = useAlert();
    const [selectedReason, setSelectedReason] = useState('');
    const [isTopShadowVisible, setIsTopShadowVisible] = useState(false);
    const [isBottomShadowVisible, setIsBottomShadowVisible] = useState(true);

    const reasonsContainerRef = useRef<HTMLDivElement>(null);

    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedReason(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedReason) {
            if(reportFor === "review") {
                reportReviewApi(idCommentOrReviewToReport, userId, selectedReason)
                    .then(response => {
                        pushAlert({
                            type: "success",
                            title: "Report submitted",
                            paragraph: "Your report was submitted successfully!"
                        });
                    })
                    .catch(error => {
                        pushAlert({
                            type: "error",
                            title: "Report submitted",
                            paragraph: error.response.data.message
                        });
                    });
            } else if(reportFor === "comment") {
                reportCommentApi(idCommentOrReviewToReport, userId, selectedReason)
                    .then(response => {
                        pushAlert({
                            type: "success",
                            title: "Report submitted",
                            paragraph: "Your report was submitted successfully!"
                        });
                    })
                    .catch(error => {
                        pushAlert({
                            type: "error",
                            title: "Report submitted",
                            paragraph: error.response.data.message
                        });
                    });
            }
            toggleModal();
        } else {
            console.error("No reason selected");
        }
    };

    const reasons = [
        { value: "off_topic", label: "Off Topic", description: "Review doesn't pertain to an experience at or with this business" },
        { value: "spam", label: "Spam", description: "Review is from a bot, or a fake account" },
        { value: "conflict_of_interest", label: "Conflict of Interest", description: "Review is from someone affiliated with the business or a competitor's business" },
        { value: "profanity", label: "Profanity", description: "Review contains swear words, has sexually explicit language" },
        { value: "bullying_or_harassment", label: "Bullying or Harassment", description: "Review personally attacks a specific individual" },
        { value: "personal_information", label: "Personal Information", description: "Review contains personal information, such as an address or a phone number" },
        { value: "not_helpful", label: "Not Helpful", description: "Review doesn't help people decide if the product is okay or not" },
    ];

    const handleScroll = () => {
        if (reasonsContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = reasonsContainerRef.current;
            setIsTopShadowVisible(scrollTop > 0);
            setIsBottomShadowVisible(scrollTop + clientHeight < scrollHeight);
        }
    };

    useEffect(() => {
        handleScroll();
    }, []);

    return (
        <BaseModal isModalOpen={isModalOpen} toggleModal={toggleModal}>
            {idCommentOrReviewToReport && (
                <Box
                    sx={{
                        backgroundColor: isDark ? theme.palette.background.default : 'rgba(234, 235, 255)',
                        p: 4,
                        borderRadius: '14px',
                        border: '1px solid #a5b4fc',
                        maxHeight: smallScreenSize ? '100%' : 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    }}
                >
                    <Typography variant="h6" color={theme.palette.info.main} sx={{ mb: 2 }}>
                        Report {reportFor === "review" ? "Review" : "Comment"}
                    </Typography>
                    <Box
                        ref={reasonsContainerRef}
                        onScroll={handleScroll}
                        sx={{
                            flex: '1 1 auto',
                            overflowY: 'auto',
                            maxHeight: '400px',
                            position: 'relative',
                            boxShadow: `${isTopShadowVisible ? 'inset 0 10px 8px -8px rgba(0,0,0,0.5), ' : ''}${isBottomShadowVisible ? 'inset 0 -10px 8px -8px rgba(0,0,0,0.5)' : 'none'}`,
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: '8px',
                            },
                        }}
                    >
                        <FormControl component="fieldset">
                            <RadioGroup value={selectedReason} onChange={handleReasonChange}>
                                {reasons?.map((reason, index) => (
                                    <Box key={reason.value}>
                                        <FormControlLabel
                                            value={reason.label}
                                            control={<Radio sx={{color: theme.palette.info.main}} />}
                                            label={
                                                <Box>
                                                    <Typography color={theme.palette.info.main} fontWeight={theme.typography.fontWeightRegular }>{reason.label}</Typography>
                                                    <Typography color={theme.palette.info.main}>{reason.description}</Typography>
                                                </Box>
                                            }
                                        />
                                        {index < reasons.length - 1 && <Divider color={"#aaa"} sx={{ my: 1 }} />}
                                    </Box>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={toggleModal} sx={{ mr: 2 }}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                    </Box>
                </Box>
            )}
        </BaseModal>
    );
};

export default AddReportModal;
