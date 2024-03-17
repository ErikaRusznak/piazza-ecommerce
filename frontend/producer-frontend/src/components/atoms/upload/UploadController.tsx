import { useState } from "react";
import {Button, Typography} from "@mui/material";
import { CloudUploadIcon } from "@/components/atoms/icons";
import useTheme from "@/theme/themes";
import {CloudUpload} from "@mui/icons-material";

type FormUploadFieldDarkBackgroundProps = {
    onFileChange: (file: File) => void;
};


const UploadController = ({ onFileChange }: FormUploadFieldDarkBackgroundProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleButtonClick = () => {
        const fileInput = document.getElementById("file-input");
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
            onFileChange(file);
        }
    };

    return (
        <div className="py-2 flex flex-row gap-2">
            <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUpload />}
                onClick={handleButtonClick}
            >
                Upload File
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    style={{ visibility: "hidden" }}
                    onChange={handleFileChange}
                />
            </Button>
            {selectedFile && (
                <div className="flex flex-row gap-2 items-center">
                    <Typography>{selectedFile.name}</Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setSelectedFile(null)}
                    >
                        Clear
                    </Button>
                </div>
            )}
        </div>
    );
};

export default UploadController;


