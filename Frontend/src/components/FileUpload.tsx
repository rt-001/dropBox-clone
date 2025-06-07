import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { fileService } from "../utils/api";

interface FileUploadProps {
    onUploadSuccess: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const progressBar = document.getElementById("progressBarFill");
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }, [progress]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const allowedExtensions = ['txt', 'pdf', 'json', 'jpeg', 'jpg', 'png'];
            const fileName = file.name.toLowerCase();
            const fileExtension = fileName.split('.').pop();

            if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
                setError("This file type is not supported. Please upload a txt, pdf, json, jpeg, or png file.");
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }
            setSelectedFile(event.target.files[0]);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file first");
            return;
        }
        setLoading(true);
        setProgress(0);

        try {
            await fileService.uploadFile(selectedFile);
            setProgress(100);
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            onUploadSuccess();
        } catch (err) {
            setError("Failed to upload file. Please try again.");
            console.error("Upload error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectFile = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    return (
        <div className="file-upload-container">
            <h2 className="file-upload-title">Upload New File</h2>

            {error && <div className="file-upload-error">{error}</div>}

            <div className="file-upload-content">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="file-upload-input"
                />

                <button className="file-upload-button" onClick={handleSelectFile} type="button">
                    Select File
                </button>

                {selectedFile && (
                    <div className="file-upload-info">
                        Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                    </div>
                )}

                {loading && (
                    <div className="file-upload-progress-wrapper">
                        <div className="file-upload-progress-bar-bg">
                            <div id="progressBarFill" className="file-upload-progress-bar-fill" />
                        </div>
                        <div className="file-upload-progress-text">{progress}%</div>
                    </div>
                )}

                <button
                    className={`file-upload-button primary ${
                        !selectedFile || loading ? "disabled" : ""
                    }`}
                    onClick={handleUpload}
                    disabled={!selectedFile || loading}
                    type="button"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
