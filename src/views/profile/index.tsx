import React, { useEffect, useState } from "react";
import { usePageColorScheme } from '@/hooks/usePageTheme';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import PageHeader from "@/components/ui/header";
import { ProfileInformation } from "@/views/profile/components/ProfileInformation";
import { ProfileAbout } from "@/views/profile/components/ProfileAbout";
import { ProfileSocialAccounts } from "@/views/profile/components/ProfileSocialAccounts";

export const Profile: React.FC = () => {
  usePageColorScheme('light');

  const { data: user, loading: userLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <main className="min-h-screen flex text-white">
      <aside className="flex-1">
        <PageHeader title="Profile" />
        <div className="max-w-3xl m-auto p-6">
          {user &&
            <div className="space-y-12">
              <ProfileInformation user={user} />
              <ProfileAbout user={user} />
              <ProfileSocialAccounts user={user} />
            </div>
          }
        </div>
      </aside>
    </main>
  );
};
