import metadata from '@/data/university-metadata.json';

export type UniversitySourceMetadata = {
  name: string;
  website: string | null;
  status: string;
  pageTitle?: string;
  description?: string;
  city?: string;
  region?: string;
  logoUrl?: string;
  error?: string;
};

const records = metadata.records as Record<string, UniversitySourceMetadata>;

export function getUniversitySourceMetadata(name: string) {
  return records[name];
}
