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

const testData: ReadonlyArray<GuestbookEntry> = (() => {
  const now = Date.now();
  let i = 0;

  const data: Omit<GuestbookEntry, 'createdAt'>[] = [
    {
      id: 1,
      name: 'John Doe',
      message: 'Great service and friendly staff!',
      hide: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'Had a wonderful experience, will come back again.',
      hide: true
    },
    {
      id: 3,
      name: 'Alice Johnson',
      message: 'The food was amazing, highly recommend the pasta.',
      hide: false
    },
    {
      id: 4,
      name: 'Bob Wilson',
      message: 'Excellent customer support!',
      hide: false
    },
    {
      id: 5,
      name: 'Emma Davis',
      message: 'Love the atmosphere here.',
      hide: false
    },
    {
      id: 6,
      name: 'Michael Brown',
      message: 'Best coffee in town!',
      hide: true
    },
    {
      id: 7,
      name: 'Sarah Miller',
      message: 'Very clean and organized.',
      hide: false
    },
    {
      id: 8,
      name: 'David Garcia',
      message: 'Friendly staff and great prices.',
      hide: false
    },
    {
      id: 9,
      name: 'Lisa Anderson',
      message: 'Would definitely recommend to friends.',
      hide: false
    },
    {
      id: 10,
      name: 'James Taylor',
      message: 'Quick service and delicious food.',
      hide: false
    },
    {
      id: 11,
      name: 'Maria Martinez',
      message: 'Amazing experience overall!',
      hide: true
    },
    {
      id: 12,
      name: 'Robert Lee',
      message: 'Great location and parking.',
      hide: false
    },
    {
      id: 13,
      name: 'Jennifer White',
      message: 'The desserts are to die for!',
      hide: false
    },
    {
      id: 14,
      name: 'William Harris',
      message: 'Professional and courteous service.',
      hide: false
    },
    {
      id: 15,
      name: 'Patricia Clark',
      message: 'Love coming here with family.',
      hide: false
    },
    {
      id: 16,
      name: 'Charles Lewis',
      message: 'Best value for money.',
      hide: true
    },
    {
      id: 17,
      name: 'Linda Walker',
      message: 'Always a pleasant experience.',
      hide: false
    },
    {
      id: 18,
      name: 'Christopher Hall',
      message: 'Exceeded my expectations!',
      hide: false
    },
    {
      id: 19,
      name: 'Barbara Allen',
      message: 'Will be back soon!',
      hide: false
    },
    { id: 20, name: 'Daniel Young', message: 'Highly satisfied with everything.', hide: false }
  ];

  return data.map<GuestbookEntry>(entry => {
    const finalisedEntry = entry as GuestbookEntry;
    finalisedEntry.createdAt = new Date(now - i * 24 * 60 * 60 * 1000);
    i++;
    return finalisedEntry;
  });
})();
