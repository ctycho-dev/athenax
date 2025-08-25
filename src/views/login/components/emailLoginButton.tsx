// components/auth/EmailLoginButton.tsx
import { MdOutlineMailOutline } from 'react-icons/md';
import { useLogin, usePrivy } from '@privy-io/react-auth';
import { toast } from 'sonner';
import { mapPrivyError } from '@/utils/privyErrors';

type Props = {
  onComplete: (isNewUser: boolean) => void;
  disabled?: boolean;
  ensurePreloginStored: () => void;
};

export default function EmailLoginButton({ onComplete, disabled, ensurePreloginStored }: Props) {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin({
    onComplete: ({ isNewUser }) => onComplete(isNewUser),
    onError: (error) => {
      const msg = mapPrivyError(error);
      if (msg) toast.error(msg);
    },
  });

  const handleClick = () => {
    if (!ready || authenticated) return;
    ensurePreloginStored();
    login({ loginMethods: ['email'] });
  };

  return (
    <button
      type="button"
      disabled={disabled || !ready || authenticated}
      onClick={handleClick}
      className="w-full bg-[#101011] hover:bg-gray-800 transition-colors text-white font-medium px-4 rounded-2xl flex items-center h-14 gap-2 disabled:opacity-50"
      aria-label="Continue with Email"
    >
      <MdOutlineMailOutline className="text-2xl" />
      <span>Continue with Email</span>
    </button>
  );
}
