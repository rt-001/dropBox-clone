import express from "express";
import {
    uploadFile,
    getFiles,
    downloadFile,
    deleteFile,
    getFileById,
} from "../controller/fileController";
import upload from "../middlewares/upload";

const router = express.Router();

// Upload a file
router.post("/", upload.single("file"), uploadFile);

// Get all files
router.get("/", getFiles);

// Get a single file
router.get("/:id", getFileById);

// Download a file
router.get("/:id/download", downloadFile);

// Delete a file
router.delete("/:id", deleteFile);

export default router;