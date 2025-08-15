// src/types/index.ts
import { UserRole } from "@/enums";

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

export interface IUserUpdate {
    // --- Profile fields ---
    name?: string | null;
    username?: string | null;
    bio?: string | null;
    location?: string | null;
    profile_image?: string | null;

    // --- Social usernames (flat) ---
    github?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    instagram?: string | null;
    discord?: string | null;

    // --- Misc, only if you allow editing from frontend ---
    has_accepted_terms?: boolean | null;
    is_guest?: boolean;
    role?: UserRole | null; // use with care
}

export interface IUser {
    privy_id: string;
    email?: string;

    // Public profile fields
    username: string;
    name: string;
    bio: string;
    location: string;
    profileImage: string;

    // Soacial accounts
    github: string | null
    twitter: string | null
    linkedin: string | null
    instagram: string | null
    discord: string | null

    wallets?: Wallet[];
    oauth_accounts?: OAuthAccount[];
    metadata?: Record<string, any>;
    role: UserRole;
    created_at: string;
}