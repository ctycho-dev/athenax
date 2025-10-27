// Updated frontend types to match backend camelCase output
export type AccountType = 'Publisher' | 'Project' | 'Personal use';
export type OrganizationType = 'Startup' | 'Lab' | 'Corporate';

export const ACCOUNT_TYPE_OPTIONS = [
  { label: "Publisher (Official media/research outlets, professors)", value: "Publisher" as AccountType },
  { label: "Project (Company/startup/initiative sharing research)", value: "Project" as AccountType },
  { label: "Personal use (Individual researcher writing for themselves)", value: "Personal use" as AccountType }
];

interface ProfileBase {
  username: string | null;
  name: string | null;
  location: string | null;
  bio: string | null;
  profileImage: string | null;
  displayRole: string;

  github: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  discord: string | null;
  googleScholar: string | null;
  orcid: string | null;
  researchgate: string | null;
  website: string | null;
  cmcCg: string | null;

  organizationName: string | null;
  institutionName: string | null;
  verificationStatus: boolean;

  // project - NOW ALL CAMELCASE ✅
  organizationType: OrganizationType | null;
  mission: string | null;
  teamSize: number | null;
  foundedYear: number | null;
  currentAffiliation: string | null;
  interests: string[];
}

export interface ProfileCreate extends ProfileBase {
  userId: string | null;
  accountType: AccountType | null;
}

export interface ProfileUpdate extends Partial<ProfileBase> {
  accountType?: AccountType | null;
  websiteUrl?: string | null;
}

export interface ProfileOut extends ProfileBase {
  id: number
  userId: number; 
  accountType: AccountType;
  websiteUrl: string | null;
  createdAt: string;
}
