// ProfileAvatar.tsx
import React, { useState, useRef } from "react";
import {
    Avatar,
    Stack,
    Center,
} from "@mantine/core";
import { FiCamera } from "react-icons/fi";
import { toast } from "sonner";
import { useUploadImageFileMutation } from "@/services/imageApi";
import { useUpdateProfileMutation } from "@/services/profileApi";
import { ProfileOut, ProfileUpdate } from "@/types/profile";
import { profileOutToUpdate } from "@/utils/profileHelper";
import { isValidImageFile } from "@/utils/imageUtils";
import { getCroppedImg } from "@/utils/imageUtils";
import { ImageCropperModal } from "./ImageCropperModal";
import { Toaster } from "sonner";

interface ProfileAvatarProps {
    src: string | null;
    name: string | null;
    profile: ProfileOut;
    onUpload: (publicUrl: string) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
    src,
    name,
    profile,
    onUpload,
}) => {
    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;
    } | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const displayName = name && name.trim() ? name : "Anonymous";

    // RTK Mutations
    const [uploadImage] = useUploadImageFileMutation();
    const [updateProfile] = useUpdateProfileMutation();

    // Hidden file input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        console.log("Selected file:", file);
        if (!file) return;

        if (!isValidImageFile(file, 5)) {
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setOpen(true);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        setIsSaving(true);

        try {
            const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);

            const uploadResult = await uploadImage({
                imageType: "profile",
                bucket: "scholarx-profile",
                file: croppedFile,
            }).unwrap();

            const payload: ProfileUpdate = profileOutToUpdate(profile);
            payload.profileImage = uploadResult.publicUrl;
            console.log("Updating profile with:", payload);
            await updateProfile({
                id: profile.id,
                data: payload,
            }).unwrap();

            // onUpload(uploadResult.publicUrl);
            toast.success("Profile photo updated!");
        } catch (error: any) {
            console.error("Upload failed:", error);
            toast.error("Upload failed", { description: error.data?.detail || error.message });
        } finally {
            setIsSaving(false);
            handleClose();
        }
    };

    const handleClose = () => {
        setOpen(false);
        setImageSrc(null);
        setCroppedAreaPixels(null);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Stack align="center" gap={8}>
            <div
                style={{
                    position: "relative",
                    display: "inline-block",
                    cursor: "pointer",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleAvatarClick}
            >
                <Avatar
                    src={src}
                    size={128}
                    radius={64}
                    alt={`Profile picture of ${displayName}`}
                    aria-label={`Change profile picture of ${displayName}`}
                >
                    {displayName.charAt(0).toUpperCase()}
                </Avatar>

                {isHovered && (
                    <Center
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            transition: "opacity 0.2s ease",
                            opacity: 1,
                        }}
                    >
                        <FiCamera color="white" size={24} />
                    </Center>
                )}
            </div>

            {/* Native hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />

            {/* Cropper Modal */}
            <ImageCropperModal
                opened={open}
                imageSrc={imageSrc || ""}
                onClose={handleClose}
                onCropComplete={setCroppedAreaPixels}
                onSave={handleSave}
                isLoading={isSaving}
            />
            <Toaster richColors />
        </Stack>
    );
};