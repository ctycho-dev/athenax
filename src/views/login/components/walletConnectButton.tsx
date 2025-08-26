// components/auth/WalletConnectButton.tsx
import { useState } from 'react';
import { Loader } from '@mantine/core';
import { useConnectWallet, usePrivy, useWallets } from '@privy-io/react-auth';
import { toast } from 'sonner';
import { mapPrivyError } from '@/utils/privyErrors';

type WalletId = 'metamask' | 'coinbase_wallet' | 'phantom' | 'wallet_connect';

function hasInjected(provider: WalletId) {
    const w = window as any;
    if (provider === 'metamask') return !!w.ethereum?.isMetaMask;
    if (provider === 'coinbase_wallet') return !!w.ethereum?.isCoinbaseWallet || !!w.coinbaseWalletExtension;
    if (provider === 'phantom') return !!w.solana?.isPhantom;
    return false;
}

type Props = {
    walletId: WalletId;
    label: string;
    icon: React.ReactNode;
    ensurePreloginStored: () => void;
    onAuthComplete: (isNewUser: boolean) => void;
    disabled?: boolean;
};

export default function WalletConnectButton({
    walletId, label, icon, ensurePreloginStored, onAuthComplete, disabled
}: Props) {
    const { ready, authenticated } = usePrivy();
    const { wallets } = useWallets();
    const [loading, setLoading] = useState(false);

    const { connectWallet } = useConnectWallet({
        onSuccess: async () => {
            try {
                await wallets[0]?.loginOrLink?.();
                onAuthComplete(true); // or decide in parent if they’re new
            } catch (err) {
                const msg = mapPrivyError(err) ?? 'Wallet sign-in failed';
                toast.error(msg);
            }
        },
        onError: (error) => {
            const msg = mapPrivyError(error);
            if (msg) toast.error(msg);
        },
    });

    const click = async () => {
        if (!ready || authenticated) return;

        if (walletId === 'wallet_connect') {
            connectWallet({
                walletList: ['wallet_connect'],
                walletChainType: 'ethereum-and-solana'
            });
            return;
        }

        if (!hasInjected(walletId)) {
            toast.error(
                walletId === 'metamask' ? 'MetaMask not found.' :
                    walletId === 'coinbase_wallet' ? 'Coinbase Wallet extension not found.' :
                        'Phantom not found.'
            );
            return;
        }

        try {
            setLoading(true);
            connectWallet({ walletList: [walletId], walletChainType: 'ethereum-and-solana', });
        } catch (err) {
            const msg = mapPrivyError(err) ?? 'Could not connect wallet.';
            toast.error(msg);
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
        >
            {loading ?
                <Loader size="sm" /> :
                <>
                    {icon}
                    <span>{label}</span>
                </>
            }
        </button>
    );
}
