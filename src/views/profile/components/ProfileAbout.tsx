import React, { useState } from "react";
import { setUser } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { useUpdateUserMutation } from "@/services/userApi";
import { Button, Textarea, Group, Stack, Notification } from "@mantine/core";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";
import { IUser } from "@/types/user";

interface ProfileAboutProps {
  user: IUser;
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({
  user,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState(user.bio);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const [updateUser] = useUpdateUserMutation();

  // Start editing
  const handleEdit = () => {
    setEditBio(user.bio);
    setIsEditing(true);
    setStatus("idle");
  };

  // Cancel
  const handleCancel = () => {
    setEditBio(user.bio);
    setIsEditing(false);
    setStatus("idle");
  };

  // Save to backend (replace with your API)
  const handleSave = async () => {
    setStatus("saving");
    try {
      // Example fake API delay:
      const upd = await updateUser({ bio: editBio }).unwrap();
      dispatch(setUser(upd));

      setStatus("saved");
      setIsEditing(false);
      // if (onAboutUpdate) onAboutUpdate(editBio); // Optional, update parent
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <div>
      <Group justify="space-between" mb={8}>
        <h2 className="text-xl font-semibold text-white">About</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            leftSection={<FiEdit2 />}
          >
            Edit
          </Button>
        ) : (
          <Group gap={8}>
            <Button
              variant="outline"
              color="green"
              size="sm"
              onClick={handleSave}
              leftSection={<FiSave />}
              loading={status === "saving"}
            >
              Save
            </Button>
            <Button
              variant="outline"
              color="red"
              size="sm"
              onClick={handleCancel}
              leftSection={<FiX />}
              disabled={status === "saving"}
            >
              Cancel
            </Button>
          </Group>
        )}
      </Group>
      {status === "saved" && (
        <Notification color="green" my="sm" withCloseButton={false}>
          About updated!
        </Notification>
      )}
      {status === "error" && (
        <Notification color="red" my="sm" withCloseButton={false}>
          Error saving. Please try again.
        </Notification>
      )}

      {!isEditing ? (
        <p className="text-gray-300 leading-relaxed">{user.bio}</p>
      ) : (
        <Textarea
          value={editBio}
          onChange={(e) => setEditBio(e.currentTarget.value)}
          className="bg-transparent border-gray-600 text-white"
          placeholder="Tell us about yourself..."
          minRows={5}
          styles={{
            input: {
              maxWidth: 'auto',
              fontSize: '16px'
            }
          }}
        />
      )}
    </div>
  );
};
