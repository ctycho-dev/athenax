// Enums/union types that match your backend literals
export type AccountType = 'Publisher' | 'Project' | 'Personal use';
export type OrganizationType = 'Startup' | 'Lab' | 'Corporate';

export const ACCOUNT_TYPE_OPTIONS = [
  { label: "Publisher (Official media/research outlets, professors)", value: "Publisher" as AccountType },
  { label: "Project (Company/startup/initiative sharing research)", value: "Project" as AccountType },
  { label: "Personal use (Individual researcher writing for themselves)", value: "Personal use" as AccountType }
];


interface ProfileBase {
  // public display
  username: string | null;
  name: string | null;
  location: string | null;
  bio: string | null;
  profile_image: string | null;
  display_role: string;

  // socials
  github: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  discord: string | null;
  google_scholar: string | null;
  orcid: string | null;
  researchgate: string | null;
  website: string | null;
  cmc_cg: string | null;

  // publisher
  organization_name: string | null;
  institution_name: string | null;
  verification_status: boolean;

  // project
  organization_type: OrganizationType | null;
  mission: string | null;
  team_size: number | null;
  founded_year: number | null;

  // personal
  current_affiliation: string | null;
  interests: string[];
}

// Extend for specific use cases
export interface ProfileCreate extends ProfileBase {
  user_id: string | null;
  account_type: AccountType | null;
}

export interface ProfileUpdate extends Partial<ProfileBase> {
  account_type?: AccountType | null;
  website_url?: string | null;
}

export interface ProfileOut extends ProfileBase {
  id: number
  user_id: number;
  account_type: AccountType;
  website_url: string | null;
  created_at: string;
}