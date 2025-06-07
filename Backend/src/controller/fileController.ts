import { Request, Response } from "express";
import fs from "fs";
import File from "../models/File";
export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ msg: "No file uploaded" });
            return;
        }
        const file = new File({
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            mimetype: req.file.mimetype,
        });

        const savedFile = await file.save();

        res.status(201).json(savedFile);
    } catch (error) {
        console.error(`Error in file upload: ${error}`);
        res.status(500).json({ msg: "Server error during file upload" });
    }
};
export const getFiles = async (req: Request, res: Response): Promise<void> => {
    try {
        // sort in descending order of upload date
        const files = await File.find().sort({ uploadDate: -1 });
        res.json(files);
    } catch (error) {
        console.error(`Error getting files: ${error}`);
        res.status(500).json({ msg: "Server error while retrieving files" });
    }
};
export const downloadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            res.status(404).json({ msg: "File not found" });
            return;
        }
        if (!fs.existsSync(file.path)) {
            res.status(404).json({ msg: "File not found on server" });
            return;
        }
        res.setHeader("Content-Disposition", `attachment; filename="${file.originalName}"`);
        res.setHeader("Content-Type", file.mimetype);

        // Stream the file from the filesystem to the client
        const fileStream = fs.createReadStream(file.path);
        fileStream.pipe(res);
    } catch (error) {
        console.error(`Error downloading file: ${error}`);
        res.status(500).json({ msg: "Server error during file download" });
    }
};
export const deleteFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            res.status(404).json({ msg: "File not found" });
            return;
        }
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        await File.deleteOne({ _id: file._id });

        res.json({ msg: "File deleted successfully" });
    } catch (error) {
        console.error(`Error deleting file: ${error}`);
        res.status(500).json({ msg: "Server error during file deletion" });
    }
};
export const getFileById = async (req: Request, res: Response): Promise<void> => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            res.status(404).json({ msg: "File not found" });
            return;
        }

        res.json(file);
    } catch (error) {
        console.error(`Error getting file: ${error}`);
        res.status(500).json({ msg: "Server error while retrieving file" });
    }
};