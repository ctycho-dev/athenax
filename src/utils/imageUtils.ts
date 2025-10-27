// utils/imageUtils.ts
import { toast } from "sonner";

export const isValidImageFile = (file: File, maxSizeInMB = 5): boolean => {
    if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return false;
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
        toast.error(`Image must be less than ${maxSizeInMB}MB.`);
        return false;
    }

    return true;
};

export const getCroppedImg = (
    imageSrc: string,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
): Promise<File> => {
    return new Promise(async (resolve, reject) => {
        try {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = imageSrc;

            await new Promise((r) => (image.onload = r));

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Failed to get canvas context");

            const { x, y, width, height } = croppedAreaPixels;
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        toast.error("Canvas is empty");
                        reject(new Error("Canvas failed to produce blob"));
                        return;
                    }
                    const file = new File([blob], "profile-cropped.jpg", {
                        type: "image/jpeg",
                    });
                    resolve(file);
                },
                "image/jpeg",
                0.95
            );
        } catch (error: any) {
            toast.error("Image processing failed", { description: error.message });
            reject(error);
        }
    });
};