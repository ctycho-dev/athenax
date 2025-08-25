import React, { useEffect, useState } from "react";
import { usePageColorScheme } from '@/hooks/usePageTheme';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import PageHeader from "@/components/ui/header";
import { ProfileInformation } from "@/views/profile/components/ProfileInformation";
import { ProfileAbout } from "@/views/profile/components/ProfileAbout";
import { ProfileSocialAccounts } from "@/views/profile/components/ProfileSocialAccounts";
import { useGetMyProfileQuery } from "@/services/profileApi";

export const Profile: React.FC = () => {
  usePageColorScheme('light');

  const { data: user, loading: userLoading } = useSelector((state: RootState) => state.user);
  const { data: profile, isLoading: profileLoading } = useGetMyProfileQuery()

  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <main className="min-h-screen flex text-white">
      <aside className="flex-1">
        <PageHeader title="Profile" />
        <div className="max-w-3xl m-auto p-6">
          {profile && user &&
            <div className="space-y-12">
              <ProfileInformation profile={profile} user={user} />
              <ProfileAbout profile={profile} />
              <ProfileSocialAccounts profile={profile} />
            </div>
          }
        </div>
      </aside>
    </main>
  );
};
