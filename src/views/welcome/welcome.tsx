import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import logoWithName from '@/assets/logo-with-name.svg';
import { usePageColorScheme } from '@/hooks/usePageTheme';
import { useCreateProfileMutation, useGetMyProfileQuery } from '@/services/profileApi';
import { useUpdateUserMutation } from '@/services/userApi';
import { ProfileCreate, AccountType, ACCOUNT_TYPE_OPTIONS } from '@/types/profile';
import { IUserUpdate } from '@/types/user';
import { getDefaultProfileValues } from '@/utils/profileHelper';
import { getLastPath, clearLastPath } from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import { Toaster, toast } from 'sonner';

const getAccountTypeFromLabel = (label: string | null): AccountType | null => {
  if (!label) return null;
  const option = ACCOUNT_TYPE_OPTIONS.find(opt => opt.label === label);
  return option ? option.value : null;
};


export const Welcome: React.FC = () => {
  usePageColorScheme('light');
  const navigate = useNavigate();

  const [role, setRole] = useState<string | null>(null);
  const [accountTypeLabel, setAccountTypeLabel] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [createProfile] = useCreateProfileMutation();
  const { data: profile, isLoading: profileLoading } = useGetMyProfileQuery()
  const [updateUser] = useUpdateUserMutation()
  const { data: user } = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch();

  const syncedRef = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (syncedRef.current) return;

      if (user && user.has_profile) {
        redirect()
      }

      if (!profileLoading) {
        syncedRef.current = true
      }

      if (profile && user) {
        setRole(profile.display_role || null);

        const option = ACCOUNT_TYPE_OPTIONS.find(opt => opt.value === profile.account_type);
        if (option) {
          setAccountTypeLabel(option.label);
        }

        if (!user.has_profile || user.account_type !== profile.account_type) {
          try {
            const userUpdateData: IUserUpdate = {
              has_profile: true,
              account_type: profile.account_type,
              has_accepted_terms: user.has_accepted_terms || false,
              is_guest: user.is_guest || false
            };

            const updated_user = await updateUser(userUpdateData).unwrap();
            if (user) {
              dispatch(setUser(updated_user));
            }

            redirect()

          } catch (error) {
            console.error('Failed to update user:', error);
            toast.error('Failed to sync user data. Please try again.');
          }
        } else {
          redirect()
        }
      }
    }
    run();
  }, [profile, profileLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!role || !accountTypeLabel) return;

      setSubmitting(true);
      const accountType = getAccountTypeFromLabel(accountTypeLabel);

      if (!accountType) {
        throw new Error('Invalid account type selected');
      }

      const payload: ProfileCreate = {
        ...getDefaultProfileValues(),
        display_role: role,
        account_type: accountType,
      };

      await createProfile(payload).unwrap();
      if (user) {
        dispatch(setUser({
          ...user,
          has_profile: true,
          account_type: accountType
        }));
      }

      redirect()

    } catch (e: any) {
      toast.error(
        e?.data?.message || e?.message || 'Failed to save onboarding data'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const redirect = () => {
    const lastPath = getLastPath();
    clearLastPath();
    navigate(lastPath, { replace: true });
  }

  return (
    <main className="bg-black/60 backdrop-blur-sm p-4 flex h-screen gap-2">
      <aside className="bg-slate-900 border border-slate-700 rounded-2xl w-xl mx-auto p-10 flex flex-col">
        <div className="mt-6 flex justify-center">
          <img src={logoWithName} alt="Company Logo" className="w-[156px]" />
        </div>

        <div className="flex-1 px-6 flex flex-col justify-center max-w-lg mx-auto w-full">
          <h1 className="font-medium text-[28px] mb-2 text-center">Tell us about you</h1>
          <p className="text-ia-gray-text leading-[24px] text-center mb-8">
            We ask this once to personalize your workspace.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <Select
              label="Your role"
              placeholder="Select one"
              required
              data={[
                "Business Administrator",
                "Data Engineer",
                "Developer",
                "DevOps",
                "Entrepreneur",
                "IT Administrator",
                "Product Manager",
                "Founder",
                "Student",
                "Other"
              ]}
              value={role}
              onChange={setRole}
            />

            <Select
              label="What describes you best"
              placeholder="Select one"
              required
              data={ACCOUNT_TYPE_OPTIONS.map(opt => opt.label)}
              value={accountTypeLabel}
              onChange={setAccountTypeLabel}
            />

            <button
              type="submit"
              disabled={submitting || !role || !accountTypeLabel}
              className="bg-card-gray rounded-medium-plus text-white py-3 px-6 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving…' : 'Continue'}
            </button>
          </form>

          <p className="text-xs text-ia-gray-text mt-6 text-center">
            You can edit this later in Settings.
          </p>
        </div>
      </aside>
      <Toaster richColors position="top-right" />
    </main>
  );
};