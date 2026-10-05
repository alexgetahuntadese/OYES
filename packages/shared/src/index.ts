export const CURRENCIES = {
  USD: 'USD',
  ETB: 'ETB',
  KES: 'KES',
  EUR: 'EUR',
  GBP: 'GBP',
} as const;

export const LANGUAGES = {
  EN: 'en',
  AM: 'am',
  OM: 'om',
} as const;

export const USER_TYPES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  HQ_STAFF: 'HQ_STAFF',
  FIELD_OFFICER: 'FIELD_OFFICER',
  PARTNER: 'PARTNER',
  VOLUNTEER: 'VOLUNTEER',
} as const;

export const OFFICE_TYPES = {
  GLOBAL_HQ: 'GLOBAL_HQ',
  REGIONAL: 'REGIONAL',
  COUNTRY: 'COUNTRY',
  FIELD: 'FIELD',
} as const;

export const PROJECT_STATUS = {
  DRAFT: 'DRAFT',
  APPROVED: 'APPROVED',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  CLOSED: 'CLOSED',
} as const;

export const SYNC_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export const SYNC_OPERATION = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
} as const;

export const THEMATIC_AREAS = [
  'Education',
  'Gender Equality',
  'Public Health',
  'Food Security',
  'Water Sanitation',
  'Climate Resilience',
  'Economic Empowerment',
  'Child Protection',
] as const;

export const VULNERABILITY_STATUSES = [
  'IDP',
  'Refugee',
  'Orphan',
  'Disabled',
  'Elderly',
  'Female-Headed Household',
  'Child-Headed Household',
  'Chronic Illness',
] as const;
