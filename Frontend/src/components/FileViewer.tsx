import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { FileType } from "../types/file";
import { fileService } from "../utils/api";

interface FileViewerProps {
    file: FileType | null;
    open: boolean;
    onClose: () => void;
}

const FileViewer: React.FC<FileViewerProps> = ({ file, open, onClose }) => {
    if (!file) return null;

    const isImage = file.mimetype.startsWith("image/");
    const isText = file.mimetype.startsWith("text/") || file.mimetype === "application/json";
    const isPdf = file.mimetype === "application/pdf";
    const downloadUrl = fileService.getDownloadUrl(file._id);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    minHeight: "60vh",
                    maxHeight: "80vh",
                },
            }}
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div" noWrap sx={{ maxWidth: "80%" }}>
                        {file.originalName}
                    </Typography>
                    <Box>
                        <IconButton
                            href={downloadUrl}
                            target="_blank"
                            download
                            color="primary"
                            aria-label="download"
                        >
                            <DownloadIcon />
                        </IconButton>
                        <IconButton onClick={onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ padding: isImage ? 1 : 2 }}>
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {isImage && (
                        <img
                            src={downloadUrl}
                            alt={file.originalName}
                            style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }}
                        />
                    )}

                    {isText && (
                        <iframe
                            src={downloadUrl}
                            title={file.originalName}
                            style={{ width: "100%", height: "60vh", border: "none" }}
                        />
                    )}

                    {isPdf && (
                        <iframe
                            src={`${downloadUrl}#toolbar=0`}
                            title={file.originalName}
                            style={{ width: "100%", height: "60vh", border: "none" }}
                        />
                    )}

                    {!isImage && !isText && !isPdf && (
                        <Box sx={{ textAlign: "center", padding: 3 }}>
                            <Typography variant="body1" gutterBottom>
                                Preview not available for this file type.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Click the download button to access this file.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button
                    color="primary"
                    href={downloadUrl}
                    target="_blank"
                    download
                    startIcon={<DownloadIcon />}
                >
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FileViewer;
