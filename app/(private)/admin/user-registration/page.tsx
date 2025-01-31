'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CreateUser } from '@/services/create-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  UserRegistrationFormSchema,
  UserRegistrationFormValues,
} from './schema';
import { PasswordInput } from '@/components/ui/password-input';

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(UserRegistrationFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      isAdmin: false,
    },
  });

  async function onSubmit(data: UserRegistrationFormValues) {
    setIsLoading(true);

    const result = await CreateUser({
      name: data.name,
      email: data.email,
      password: data.password,
      permission: data.isAdmin ? 'admin' : 'collaborator',
    });

    if (result?.error) {
      setIsLoading(false);
      toast({ title: 'Ops', description: result.error });
      return;
    }

    setIsLoading(false);
  }

  return (
    <div className="h-full flex items-center justify-center font-sans">
      <Form {...form}>
        <form
          className="flex flex-col w-96 gap-4 bg-secondary px-6 py-8 rounded-lg shadow"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-xl text-center font-bold ">
            Cadastro de usuários
          </h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha:</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAdmin"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm">Administrador</FormLabel>
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit">
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
