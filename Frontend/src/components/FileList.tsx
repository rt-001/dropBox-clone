import React, { useState } from "react";
import { FileType } from "../types/file";
import { fileService } from "../utils/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

interface FileListProps {
    files: FileType[];
    loading: boolean;
    onFileDelete: (id: string) => void;
    onFileView: (file: FileType) => void;
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
};

const getFileTypeColor = (mimetype: string): string => {
    if (mimetype.startsWith("image/")) return "#4caf50"; // green
    if (mimetype.startsWith("text/")) return "#2196f3"; // blue
    if (mimetype.startsWith("application/pdf")) return "#f44336"; // red
    if (mimetype.startsWith("application/json")) return "#ff9800"; // orange
    return "#9e9e9e"; // grey
};

const FileList: React.FC<FileListProps> = ({ files, loading, onFileDelete, onFileView }) => {
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    const handleDownload = (id: string) => {
        window.open(fileService.getDownloadUrl(id), "_blank");
    };

    const handleDelete = async (id: string) => {
        try {
            setDeletingIds((prev) => new Set(prev).add(id));
            await fileService.deleteFile(id);
            onFileDelete(id);
        } catch (error) {
            console.error("Error deleting file:", error);
        } finally {
            setDeletingIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (files.length === 0) {
        return <div className="empty-message">No files uploaded yet. Upload your first file!</div>;
    }

    return (
        <div className="table-container">
            <table className="file-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Upload Date</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file._id}>
                            <td>{file.originalName}</td>
                            <td>
                                <span
                                    className="file-chip"
                                    style={{
                                        backgroundColor: getFileTypeColor(file.mimetype),
                                        color: "#fff",
                                    }}
                                >
                                    {file.mimetype}
                                </span>
                            </td>
                            <td>{formatFileSize(file.size)}</td>
                            <td>{formatDate(file.uploadDate)}</td>
                            <td style={{ textAlign: "center" }}>
                                <button
                                    className="icon-button"
                                    title="View"
                                    onClick={() => onFileView(file)}
                                >
                                    <VisibilityIcon />
                                </button>
                                <button
                                    className="icon-button"
                                    title="Download"
                                    onClick={() => handleDownload(file._id)}
                                >
                                    <DownloadIcon />
                                </button>
                                <button
                                    className="icon-button"
                                    title="Delete"
                                    onClick={() => handleDelete(file._id)}
                                    disabled={deletingIds.has(file._id)}
                                >
                                    {deletingIds.has(file._id) ? (
                                        <div className="button-spinner"></div>
                                    ) : (
                                        <DeleteIcon />
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FileList;
