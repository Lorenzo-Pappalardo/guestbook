'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck, CircleXIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export default function CreationForm() {
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
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
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
                <FormControl>
                  <Input placeholder="Describe your experience" {...field} />
                </FormControl>
                <FormDescription>Describe your experience</FormDescription>
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
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormDescription>Check this box to remain anonymous</FormDescription>
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
