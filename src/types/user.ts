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
    account_type: string | null
    has_profile: boolean
    has_accepted_terms: boolean
    is_guest: boolean
}

export interface IUser {
    privy_id: string;
    email?: string;

    wallets?: Wallet[];
    oauth_accounts?: OAuthAccount[];
    metadata?: Record<string, any>;
    role: UserRole;

    has_accepted_terms: boolean
    is_guest: boolean

    account_type: string
    has_profile: boolean
    created_at: string;
}