// utils/profileDefaults.ts
import { ProfileCreate } from '@/types/profile';
import { ProfileOut, ProfileUpdate } from '@/types/profile';

export const getDefaultProfileValues = (): ProfileCreate => ({
  userId: null,           // ✅ Changed from user_id
  accountType: null,      // ✅ Changed from account_type
  username: null,

  // public display
  name: null,
  location: null,
  bio: null,
  profileImage: null,     // ✅ Changed from profile_image
  displayRole: '',        // ✅ Changed from display_role

  // socials
  github: null,
  twitter: null,
  linkedin: null,
  instagram: null,
  discord: null,
  googleScholar: null,    // ✅ Changed from google_scholar
  orcid: null,
  researchgate: null,
  website: null,
  cmcCg: null,           // ✅ Changed from cmc_cg

  // publisher
  organizationName: null,        // ✅ Changed from organization_name
  institutionName: null,         // ✅ Changed from institution_name
  verificationStatus: false,     // ✅ Changed from verification_status

  // project
  organizationType: null,        // ✅ Changed from organization_type
  mission: null,
  teamSize: null,               // ✅ Changed from team_size
  foundedYear: null,            // ✅ Changed from founded_year

  // personal
  currentAffiliation: null,     // ✅ Changed from current_affiliation
  interests: [],
});

export const profileOutToUpdate = (profile: ProfileOut): ProfileUpdate => {
  return {
    accountType: profile.accountType,           // ✅ Changed from account_type
    username: profile.username,
    name: profile.name,
    location: profile.location,
    bio: profile.bio,
    profileImage: profile.profileImage,         // ✅ Changed from profile_image
    displayRole: profile.displayRole,           // ✅ Changed from display_role
    
    // socials
    github: profile.github,
    twitter: profile.twitter,
    linkedin: profile.linkedin,
    instagram: profile.instagram,
    discord: profile.discord,
    googleScholar: profile.googleScholar,       // ✅ Changed from google_scholar
    orcid: profile.orcid,
    researchgate: profile.researchgate,
    website: profile.website,
    cmcCg: profile.cmcCg,                      // ✅ Changed from cmc_cg
    
    // publisher
    organizationName: profile.organizationName,         // ✅ Changed from organization_name
    institutionName: profile.institutionName,           // ✅ Changed from institution_name
    verificationStatus: profile.verificationStatus,     // ✅ Changed from verification_status
    
    // project
    organizationType: profile.organizationType,         // ✅ Changed from organization_type
    mission: profile.mission,
    teamSize: profile.teamSize,                         // ✅ Changed from team_size
    foundedYear: profile.foundedYear,                   // ✅ Changed from founded_year
    
    // personal
    currentAffiliation: profile.currentAffiliation,     // ✅ Changed from current_affiliation
    interests: profile.interests,
  };
};
