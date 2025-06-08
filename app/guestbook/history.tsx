import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GuestbookEntry, PrismaClient } from '@/prisma/generated';

export default async function History() {
  const prisma = new PrismaClient();
  const guestbookEntries: ReadonlyArray<GuestbookEntry> = await prisma.guestbookEntry.findMany({
    take: 20,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <h3 className="text-xl font-extrabold tracking-tight text-balance mb-4">Latest contributions</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guestbookEntries.map(entry => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.hide ? 'Anonymous user' : entry.name}</TableCell>
              <TableCell>{entry.message}</TableCell>
              <TableCell>{entry.createdAt.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
