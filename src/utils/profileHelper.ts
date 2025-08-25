// utils/profileDefaults.ts
import { ProfileCreate } from '@/types/profile';
import { ProfileOut, ProfileUpdate } from '@/types/profile';

export const getDefaultProfileValues = (): ProfileCreate => ({
  user_id: null,
  account_type: null,
  username: null,

  // public display
  name: null,
  location: null,
  bio: null,
  profile_image: null,
  display_role: '',

  // socials
  github: null,
  twitter: null,
  linkedin: null,
  instagram: null,
  discord: null,
  google_scholar: null,
  orcid: null,
  researchgate: null,
  website: null,
  cmc_cg: null,

  // publisher
  organization_name: null,
  institution_name: null,
  verification_status: false,

  // project
  organization_type: null,
  mission: null,
  team_size: null,
  founded_year: null,

  // personal
  current_affiliation: null,
  interests: [],
});

export const profileOutToUpdate = (profile: ProfileOut): ProfileUpdate => {
  return {
    account_type: profile.account_type,
    username: profile.username,
    name: profile.name,
    location: profile.location,
    bio: profile.bio,
    profile_image: profile.profile_image,
    website_url: profile.website_url,
    display_role: profile.display_role,
    github: profile.github,
    twitter: profile.twitter,
    linkedin: profile.linkedin,
    instagram: profile.instagram,
    discord: profile.discord,
    google_scholar: profile.google_scholar,
    orcid: profile.orcid,
    researchgate: profile.researchgate,
    website: profile.website,
    cmc_cg: profile.cmc_cg,
    organization_name: profile.organization_name,
    institution_name: profile.institution_name,
    verification_status: profile.verification_status,
    organization_type: profile.organization_type,
    mission: profile.mission,
    team_size: profile.team_size,
    founded_year: profile.founded_year,
    current_affiliation: profile.current_affiliation,
    interests: profile.interests,
  };
};