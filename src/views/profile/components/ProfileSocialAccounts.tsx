import React, { useState, useEffect } from "react";
import { Button, TextInput, Group, Notification } from "@mantine/core";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useUpdateProfileMutation } from "@/services/profileApi";
import { ProfileOut, ProfileUpdate } from "@/types/profile";
import { IUser } from "@/types/user";

// Define social platforms config
const SOCIALS = [
  { key: "github", label: "GitHub", icon: FaGithub, color: "text-gray-300", domain: "github.com" },
  { key: "twitter", label: "X", icon: FaSquareXTwitter, color: "text-gray-300", domain: "twitter.com" },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedin, color: "text-blue-500", domain: "linkedin.com/in" },
  { key: "instagram", label: "Instagram", icon: FaInstagram, color: "text-pink-400", domain: "instagram.com" },
  { key: "discord", label: "Discord", icon: FaDiscord, color: "text-indigo-400", domain: "discord.com/users" },
] as const;

type SocialKey = (typeof SOCIALS)[number]["key"];

interface ProfileSocialAccountsProps {
  profile: ProfileOut
  user: IUser
}

export const ProfileSocialAccounts: React.FC<ProfileSocialAccountsProps> = ({ profile, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editAccounts, setEditAccounts] = useState<Record<SocialKey, string>>(() =>
    SOCIALS.reduce((acc, { key }) => {
      acc[key] = (profile[key] as string) || "";
      return acc;
    }, {} as Record<SocialKey, string>)
  );
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const [updateProfile] = useUpdateProfileMutation();

  // Reset edit state when exiting or entering edit mode
  useEffect(() => {
    if (!isEditing) {
      setEditAccounts(
        SOCIALS.reduce((acc, { key }) => {
          acc[key] = (profile[key] as string) || "";
          return acc;
        }, {} as Record<SocialKey, string>)
      );
    }
  }, [isEditing, profile]);

  const handleEdit = () => {
    setIsEditing(true);
    setStatus("idle");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setStatus("idle");
  };

  const handleSave = async () => {
    setStatus("saving");
    try {
      const updatedProfile: Partial<ProfileUpdate> = {};

      SOCIALS.forEach(({ key }) => {
        const value = editAccounts[key];
        updatedProfile[key] = value || null; // now safe, since type is string | null
      });

      // ✅ Call the mutation
      await updateProfile({ id: profile.id, data: updatedProfile }).unwrap();

      // 🟡 Option 1: Trust the backend & optimistic UI — just exit edit mode
      setIsEditing(false);
      setStatus("saved");

      // 🔁 No need to refetch — if you use `providesTags`/`invalidatesTags`, RTK will auto-refresh user elsewhere
    } catch (err) {
      setStatus("error");
      console.error("Failed to update user:", err);
    }
  };

  const handleChange = (key: SocialKey, value: string) => {
    setEditAccounts((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Group justify="space-between" mb="sm">
        <h2 className="text-xl font-semibold text-white">Social Accounts</h2>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={handleEdit} leftSection={<FiEdit2 />}>
            Edit
          </Button>
        ) : (
          <Group gap="xs">
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
          Social links updated!
        </Notification>
      )}
      {status === "error" && (
        <Notification color="red" my="sm" withCloseButton={false}>
          Error saving. Please try again.
        </Notification>
      )}

      <p className="text-gray-400 mb-6">Connect with me on various platforms</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SOCIALS.map(({ key, label, icon: IconComponent, color, domain }) => {
          const username = isEditing ? editAccounts[key] : profile[key];
          const hasUsername = !!username;

          return (
            <div
              key={key}
              className="flex items-center justify-between p-4 rounded-medium border border-border"
            >
              <div className="flex items-center space-x-3 flex-1">
                <IconComponent className={`h-5 w-5 ${color}`} />
                <div className="flex-1">
                  <p className="text-white font-medium">{label}</p>
                  {!isEditing ? (
                    <p className="text-gray-400 text-sm">
                      {hasUsername ? username : <span className="italic text-gray-600">Not set</span>}
                    </p>
                  ) : (
                    <TextInput
                      value={editAccounts[key]}
                      onChange={(e) => handleChange(key, e.currentTarget.value)}
                      placeholder={`Your ${label} username`}
                      size="sm"
                    />
                  )}
                </div>
              </div>

              {!isEditing && hasUsername && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
                  component="a"
                  href={getSocialUrl(domain, username as string)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper to generate social URLs
function getSocialUrl(domain: string, username: string): string {
  return `https://${domain}/${username.trim()}`;
}