// components/auth/SocialLoginButton.tsx
import { useState } from 'react';
import { Loader } from '@mantine/core';
import { useLoginWithOAuth, usePrivy } from '@privy-io/react-auth';
import { toast } from 'sonner';
import { mapPrivyError } from '@/utils/privyErrors';

type Provider = 'google' | 'github' | 'twitter' | 'discord';

type Props = {
    provider: Provider;
    label: string;
    icon: React.ReactNode;
    onComplete: (isNewUser: boolean) => void;
    ensurePreloginStored: () => void;
    disabled?: boolean;
};

export default function SocialLoginButton({
    provider, label, icon, onComplete, ensurePreloginStored, disabled
}: Props) {
    const { ready, authenticated } = usePrivy();
    const [loading, setLoading] = useState(false);

    const { initOAuth } = useLoginWithOAuth({
        onComplete: ({ isNewUser }) => onComplete(isNewUser),
        onError: (error) => {
            const msg = mapPrivyError(error);
            if (msg) toast.error(msg);
        },
    });

    const click = async () => {
        if (!ready || authenticated) return;
        ensurePreloginStored();
        try {
            setLoading(true);
            await initOAuth({ provider });
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={click}
            disabled={disabled || !ready || authenticated || loading}
            className="flex items-center justify-center gap-2 w-full bg-[#101011] hover:bg-gray-800 disabled:opacity-50 transition-colors h-12 px-4 rounded-2xl text-sm"
            aria-busy={loading}
            aria-live="polite"
        >
            {loading  ?
                <Loader size="sm" /> :
                <>
                    {icon}
                    <span>{label}</span>
                </>
            }
        </button>
    );
}
