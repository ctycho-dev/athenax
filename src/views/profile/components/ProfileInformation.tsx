import React, { useState, useEffect } from "react";
import { useUpdateProfileMutation } from "@/services/profileApi";
import { Button, TextInput, Group, Stack, Notification } from "@mantine/core";
import { FiEdit2, FiSave, FiX, FiMapPin, FiCalendar, FiMail } from "react-icons/fi";
import { ProfileAvatar } from "./ProfileAvatar";
import { IUser } from "@/types/user";
import { ProfileOut, ProfileUpdate } from "@/types/profile";
import { format, parseISO } from "date-fns";
import { profileOutToUpdate } from "@/utils/profileHelper";


interface ProfileInformationProps {
  profile: ProfileOut
  user: IUser
}


export const ProfileInformation: React.FC<ProfileInformationProps> = ({
  profile, user
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const [updateProfile] = useUpdateProfileMutation();

  // If user changes from parent, update local editData (needed when switching users etc)
  useEffect(() => {
    if (!isEditing) {
      setEditData(profile);
    }
  }, [profile, isEditing]);


  // Start editing, load data
  const handleEdit = () => {
    // onProfileUpdate(user);
    setIsEditing(true);
    setStatus("idle");
  };

  // Cancel editing, reset
  const handleCancel = () => {
    // onProfileUpdate(user);
    setIsEditing(false);
    setStatus("idle");
  };

  const handleSave = async () => {
    setStatus("saving");
    try {
      // Call backend mutation
      const payload: ProfileUpdate = profileOutToUpdate(editData)
      await updateProfile({ id: profile.id, data: payload}).unwrap();
      setIsEditing(false);
      setStatus("saved");
    } catch (e) {
      setStatus("error");
    }
  };

  // When cropping/uploading avatar
  const handleAvatarUpload = (base64Url: string) => {
    setEditData(prev => ({
      ...prev,
      profileImage: base64Url,
    }));
  };


  // UI
  return (
    <div>
      <Group justify="space-between" mb={16}>
        <h2 className="text-xl font-semibold text-white">Profile Information</h2>
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
          Profile updated!
        </Notification>
      )}
      {status === "error" && (
        <Notification color="red" my="sm" withCloseButton={false}>
          Error saving profile. Please try again.
        </Notification>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <ProfileAvatar
          src={isEditing ? editData.profile_image : profile.profile_image}
          name={isEditing ? editData.name : profile.name}
          onUpload={handleAvatarUpload}
        />
        <div className="flex-1 space-y-4">
          {!isEditing ? (
            <>
              <div>
                <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
                <p className="text-gray-400">{profile.username}</p>
                <p className="text-blue-400 font-medium">{profile.display_role}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {profile.location &&
                  <div className="flex items-center"><FiMapPin className="mr-2" />{profile.location}</div>
                }
                <div className="flex items-center"><FiCalendar className="mr-2" />Joined {profile.created_at ? format(parseISO(profile.created_at), "MMMM yyyy") : ""}</div>
                {user.email && <div className="flex items-center"><FiMail className="mr-2" />{user.email}</div>}
              </div>
            </>
          ) : (
            <Stack gap={16}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Full Name"
                  placeholder="Enter your name"
                  value={editData.name || ''}
                  onChange={e => setEditData({ ...editData, name: e.currentTarget.value || null })}
                />
                <TextInput
                  label="Username"
                  placeholder="Enter your username"
                  value={editData.username || ''}
                  onChange={e => setEditData({ ...editData, username: e.currentTarget.value || null })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Role"
                  placeholder="What is your role?"
                  value={editData.display_role}
                  disabled
                // onChange={e => setEditData({ ...editData, role: e.currentTarget.value })}
                />
                <TextInput
                  label="Email"
                  type="email"
                  disabled
                  placeholder="Enter your email"
                  value={user.email}
                />
              </div>
              <TextInput
                label="Location"
                placeholder="Enter your location"
                value={editData.location || ''}
                onChange={e => setEditData({ ...editData, location: e.currentTarget.value || null })}
              />
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};
