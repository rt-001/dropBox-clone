import axios from "axios";
import { FileType } from "../types/file";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fileService = {
    getFiles: async (): Promise<FileType[]> => {
        const response = await api.get("/files");
        return response.data;
    },

    getFile: async (id: string): Promise<FileType> => {
        const response = await api.get(`/files/${id}`);
        return response.data;
    },

    uploadFile: async (file: File): Promise<FileType> => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("/files", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },

    deleteFile: async (id: string): Promise<{ message: string }> => {
        const response = await api.delete(`/files/${id}`);
        return response.data;
    },

    getDownloadUrl: (id: string): string => {
        return `${API_URL}/files/${id}/download`;
    },
};
