import { AppShell } from '@/components/core';
import { DiscoverClient } from '@/components/discover-client';

export default function UniversitiesPage() {
  return <AppShell eyebrow="Search universities by name or market"><DiscoverClient universityOnly /></AppShell>;
}
