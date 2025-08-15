import React, { useState, useEffect } from "react";
import { setUser } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { useUpdateUserMutation } from "@/services/userApi";
import { Button, TextInput, Group, Stack, Notification } from "@mantine/core";
import { FiEdit2, FiSave, FiX, FiMapPin, FiCalendar, FiMail } from "react-icons/fi";
import { ProfileAvatar } from "./ProfileAvatar";
import { IUser } from "@/types/user";
import { format, parseISO } from "date-fns";


interface ProfileInformationProps {
  user: IUser
}


export const ProfileInformation: React.FC<ProfileInformationProps> = ({
  user,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const [updateUser] = useUpdateUserMutation();

  // If user changes from parent, update local editData (needed when switching users etc)
  useEffect(() => {
    if (!isEditing) {
      setEditData(user);
    }
  }, [user, isEditing]);

  useEffect(() => {
    console.log(editData)
  }, [editData])

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
      const upd = await updateUser(editData).unwrap();
      dispatch(setUser(upd));
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
          src={isEditing ? editData.profileImage : user.profileImage}
          name={isEditing ? editData.name : user.name}
          onUpload={handleAvatarUpload}
        />
        <div className="flex-1 space-y-4">
          {!isEditing ? (
            <>
              <div>
                <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                <p className="text-gray-400">{user.username}</p>
                <p className="text-blue-400 font-medium">{user.role}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {user.location &&
                  <div className="flex items-center"><FiMapPin className="mr-2" />{user.location}</div>
                }
                <div className="flex items-center"><FiCalendar className="mr-2" />Joined {user.created_at ? format(parseISO(user.created_at), "MMMM yyyy") : ""}</div>
                <div className="flex items-center"><FiMail className="mr-2" />{user.email}</div>
              </div>
            </>
          ) : (
            <Stack gap={16}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Full Name"
                  placeholder="Enter your name"
                  value={editData.name}
                  onChange={e => setEditData({ ...editData, name: e.currentTarget.value })}
                />
                <TextInput
                  label="Username"
                  placeholder="Enter your username"
                  value={editData.username}
                  onChange={e => setEditData({ ...editData, username: e.currentTarget.value })}
                />
              </div>
              <TextInput
                label="Role"
                placeholder="What is your role?"
                value={editData.role}
                disabled
              // onChange={e => setEditData({ ...editData, role: e.currentTarget.value })}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Location"
                  placeholder="Enter your location"
                  value={editData.location}
                  onChange={e => setEditData({ ...editData, location: e.currentTarget.value })}
                />
                <TextInput
                  label="Email"
                  type="email"
                  disabled
                  placeholder="Enter your email"
                  value={editData.email}
                  onChange={e => setEditData({ ...editData, email: e.currentTarget.value })}
                />
              </div>
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};
