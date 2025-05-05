// src/types/index.ts
export enum UserRole {
    ADMIN = 'admin',
    BD = 'bd',
    USER = 'user',
}

export enum WalletChains {
    ETH = "eth",
    SOL = "sol"
}

export enum OAuthProvider {
    GOOGLE = "google",
    DISCORD = "discord",
    TWITTER = "twitter"
}

export interface Wallet {
    address: string;
    chain: 'ethereum' | 'solana';
    verified: boolean;
}

export interface OAuthAccount {
    provider: OAuthProvider;
    provider_id: string;
    email?: string;
    verified: boolean;
}

export interface User {
    privy_id: string;
    email?: string;
    name?: string;
    profile_image?: string;
    wallets?: Wallet[];
    oauth_accounts?: OAuthAccount[];
    metadata?: Record<string, any>;
    role: UserRole;
    created_at: string;
}