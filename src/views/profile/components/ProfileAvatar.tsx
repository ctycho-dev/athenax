import React, { useState, useCallback, useEffect } from "react";
import { Avatar, FileInput, Stack, Modal, Button, Slider, Group } from "@mantine/core";
import Cropper from "react-easy-crop";
import { FiUpload } from "react-icons/fi";

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new window.Image();
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });
}

async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );
    return canvas.toDataURL("image/jpeg");
}

interface ProfileAvatarProps {
    src: string | null;
    name: string | null;
    onUpload: (dataUrl: string) => void; // cropped base64 string
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
    src,
    name,
    onUpload,
}) => {
    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const displayName = name && name.trim() ? name : "Anonymous";

    // When the user selects a file
    const onFileChange = (file: File | null) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setOpen(true);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        console.log('src', src)
        setImgSrc(src)
    }, [src])

    const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // When user clicks Save after cropping
    const handleSave = async () => {
        if (imageSrc && croppedAreaPixels) {
            const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (croppedImg) {
                onUpload(croppedImg);
                setImgSrc(croppedImg)
            }
            setImageSrc(null);
            setOpen(false);
        }
    };

    // Reset cropping when modal closes
    const handleClose = () => {
        setOpen(false);
        setImageSrc(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
    };

    return (
        <Stack align="center" gap={8}>
            <Avatar
                key={imgSrc}
                src={imgSrc}
                size={128}
                radius={64}
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
            >
                {displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
            </Avatar>
            <FileInput
                accept="image/*"
                onChange={onFileChange}
                leftSection={<FiUpload />}
                placeholder="Change Photo"
                styles={{
                    input: {
                        background: 'transparent',
                        // border: '1px solid oklch(0.7 0.0182 242.54 / 80%)',
                        // borderRadius: '10px'
                    }
                }}
            />
            <Modal
                opened={open}
                onClose={handleClose}
                title="Adjust your avatar"
                centered
                size="lg"
            >
                {imageSrc && (
                    <>
                        <div style={{ position: "relative", width: "100%", height: 300, background: "#111" }}>
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <Group mt="md">
                            <span>Zoom:</span>
                            <Slider
                                min={1}
                                max={3}
                                step={0.01}
                                value={zoom}
                                onChange={setZoom}
                                style={{ flex: 1, maxWidth: 200 }}
                            />
                        </Group>
                        <Button fullWidth mt="lg" onClick={handleSave}>
                            Save
                        </Button>
                    </>
                )}
            </Modal>
        </Stack>
    );
};
