import { Suspense } from 'react';
import { AppShell } from '@/components/core';
import { DiscoverClient } from '@/components/discover-client';

export default function DiscoverPage() {
  return <AppShell eyebrow="Search, filter, and keep the thread"><Suspense fallback={<div className="page-container page-content"><div className="empty-state"><h3>Loading the directory…</h3><p>Preparing filters and source-aware results.</p></div></div>}><DiscoverClient /></Suspense></AppShell>;
}
