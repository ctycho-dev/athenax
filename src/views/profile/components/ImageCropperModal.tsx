// components/ImageCropperModal.tsx
import React from "react";
import {
    Modal,
    Slider,
    Group,
    Button,
    Center,
    Loader,
    Stack,
} from "@mantine/core";
import Cropper from "react-easy-crop";
import { useCallback, useState } from "react";

interface ImageCropperModalProps {
    opened: boolean;
    imageSrc: string;
    onClose: () => void;
    onCropComplete: (croppedAreaPixels: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => void;
    onSave: () => Promise<void>;
    isLoading: boolean;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
    opened,
    imageSrc,
    onClose,
    onCropComplete,
    onSave,
    isLoading,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const handleCropComplete = useCallback(
        (_: any, pixels: any) => {
            onCropComplete(pixels);
        },
        [onCropComplete]
    );

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Adjust your avatar"
            centered
            size="lg"
            // withScrollableContent={false}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: 300,
                    backgroundColor: "#000",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                    style={{
                        containerStyle: { height: "100%", width: "100%" },
                        mediaStyle: { maxWidth: "100%", maxHeight: "100%" },
                    }}
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
                    style={{ flex: 1 }}
                />
            </Group>

            <Button
                fullWidth
                mt="lg"
                onClick={onSave}
                disabled={isLoading}
                leftSection={isLoading ? <Loader size="sm" color="white" /> : null}
            >
                {isLoading ? "Saving..." : "Save"}
            </Button>
        </Modal>
    );
};