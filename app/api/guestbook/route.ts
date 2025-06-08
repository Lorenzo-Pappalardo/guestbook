import EntryCreate from '@/app/guestbook/entry';
import { GuestbookEntry, PrismaClient } from '../../../prisma/generated';

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  const newGuestbookEntry: EntryCreate = await req.json();
  const res: GuestbookEntry = await prisma.guestbookEntry.create({
    data: newGuestbookEntry
  });

  return Response.json(res);
}
