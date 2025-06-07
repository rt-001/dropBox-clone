import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const uploadDir = process.env.UPLOAD_DIR || "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "text/plain",
        "application/pdf",
        "application/json",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

export default upload;