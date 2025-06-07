import React, { useState, useEffect } from "react";
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
  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const downloadUrl = file ? fileService.getDownloadUrl(file._id) : "";
  const isImage = file ? file.mimetype.startsWith("image/") : false;
  const isText = file
    ? file.mimetype.startsWith("text/") && file.mimetype !== "application/json"
    : false;
  const isPdf = file ? file.mimetype === "application/pdf" : false;
  const isJson = file ? file.mimetype === "application/json" : false;
  useEffect(() => {
    if (open && isJson && downloadUrl) {
      setJsonError(null);
      setJsonContent(null);

      fetch(downloadUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => setJsonContent(JSON.stringify(data, null, 2)))
        .catch((err) => {
          console.error("Failed to load JSON:", err);
          setJsonError("Could not load JSON preview.");
        });
    }
  }, [open, isJson, downloadUrl]);

  // now it's safe to bail out if there's no file
  if (!file) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { minHeight: "60vh", maxHeight: "80vh" } }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" noWrap sx={{ maxWidth: "80%" }}>
            {file.originalName}
          </Typography>
          <Box>
            <IconButton href={downloadUrl} target="_blank" download color="primary">
              <DownloadIcon />
            </IconButton>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: isImage ? 1 : 2 }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          {isImage && (
            <img
              src={downloadUrl}
              alt={file.originalName}
              style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }}
            />
          )}

          {isPdf && (
            <iframe
              src={`${downloadUrl}#toolbar=0`}
              title={file.originalName}
              style={{ width: "100%", height: "60vh", border: "none" }}
            />
          )}

          {isText && (
            <iframe
              src={downloadUrl}
              title={file.originalName}
              style={{ width: "100%", height: "60vh", border: "none" }}
            />
          )}

          {isJson && (
            <Box sx={{ width: "100%" }}>
              {jsonError && <Typography color="error">{jsonError}</Typography>}
              {!jsonError && !jsonContent && <Typography>Loading JSON preview…</Typography>}
              {jsonContent && (
                <Box
                  component="pre"
                  sx={{
                    textAlign: "left",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    fontSize: "0.875rem",
                    backgroundColor: "#f5f5f5",
                    p: 2,
                    borderRadius: 1,
                    maxHeight: "60vh",
                    overflow: "auto",
                  }}
                >
                  {jsonContent}
                </Box>
              )}
            </Box>
          )}

          {!isImage && !isText && !isPdf && !isJson && (
            <Box sx={{ textAlign: "center", p: 3 }}>
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
