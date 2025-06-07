import mongoose, { Document, Schema } from "mongoose";

export interface IFile extends Document {
    filename: string;
    originalName: string;
    path: string;
    size: number;
    mimetype: string;
    uploadDate: Date;
}

const fileSchema = new Schema<IFile>({
    filename: {
        type: String,
        required: true,
        unique: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IFile>("File", fileSchema);