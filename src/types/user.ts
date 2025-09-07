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
    has_accepted_terms: boolean
    is_guest: boolean
    has_profile: boolean
}

export interface IUser {
    id: number
    privy_id: string;
    email?: string;

    wallets?: Wallet[];
    metadata?: Record<string, any>;
    role: UserRole;

    has_accepted_terms: boolean
    is_guest: boolean

    has_profile: boolean
    created_at: string;
}