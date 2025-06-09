'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck, CircleXIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export default function CreationForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      message: '',
      hide: false
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    fetch('/api/guestbook', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => {
      toast(res.ok ? 'Your contribution has been registered.' : 'Failed to register your contribution.', {
        icon: res.ok ? <CircleCheck /> : <CircleXIcon />,
        position: 'bottom-center'
      });

      if (res.ok) {
        router.refresh();
      }
    });
  };

  return (
    <div className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormDescription>This is your public display name.</FormDescription>
                <FormControl>
                  <Input placeholder="John Wick" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormDescription>Describe your experience</FormDescription>
                <FormControl>
                  <Textarea placeholder="I love pencils." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hide"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hide name on guestbook</FormLabel>
                <FormDescription>Check this box to remain anonymous</FormDescription>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}

const formSchema = z.object({
  name: z.string().max(50, 'Name too long'),
  message: z.string().max(1000, 'Reached maximum message length'),
  hide: z.boolean()
});
