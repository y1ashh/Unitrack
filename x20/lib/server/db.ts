import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { universityTrackerPrisma?: PrismaClient };

export function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  if (!globalForPrisma.universityTrackerPrisma) {
    globalForPrisma.universityTrackerPrisma = new PrismaClient();
  }
  return globalForPrisma.universityTrackerPrisma;
}
