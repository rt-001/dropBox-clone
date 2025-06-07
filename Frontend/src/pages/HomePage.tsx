import React, { useState, useEffect, useCallback } from "react";
import {
    Container,
    Typography,
    Box,
    Alert,
    AlertTitle,
    Snackbar,
    Paper,
    Divider,
    useTheme,
} from "@mui/material";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import FileViewer from "../components/FileViewer";
import { fileService } from "../utils/api";
import { FileType } from "../types/file";

const HomePage: React.FC = () => {
    const [files, setFiles] = useState<FileType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
    const [viewerOpen, setViewerOpen] = useState<boolean>(false);
    const theme = useTheme();
    const fetchFiles = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fileService.getFiles();
            setFiles(data);
            setError(null);
        } catch (error) {
            console.error("Error fetching files:", error);
            setError("Failed to load files. Please refresh the page.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const handleUploadSuccess = () => {
        fetchFiles();
        setSuccessMessage("File uploaded successfully!");
    };

    const handleFileDelete = (id: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
        setSuccessMessage("File deleted successfully!");
    };

    const handleFileView = (file: FileType) => {
        setSelectedFile(file);
        setViewerOpen(true);
    };

    const handleViewerClose = () => {
        setViewerOpen(false);
    };

    const handleCloseSuccessMessage = () => {
        setSuccessMessage(null);
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    mb: 4,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                    color: "white",
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                    Typeface Assignment Project
                </Typography>
                <Typography variant="subtitle1">
                    Upload, store, and download your files in one place.
                </Typography>
            </Paper>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}

            <FileUpload onUploadSuccess={handleUploadSuccess} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Your Files
                </Typography>
                <Divider />
            </Box>

            <FileList
                files={files}
                loading={loading}
                onFileDelete={handleFileDelete}
                onFileView={handleFileView}
            />

            <FileViewer file={selectedFile} open={viewerOpen} onClose={handleViewerClose} />

            <Snackbar
                open={!!successMessage}
                autoHideDuration={5000}
                onClose={handleCloseSuccessMessage}
                message={successMessage}
            />
        </Container>
    );
};

export default HomePage;
