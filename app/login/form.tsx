'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

import { LoginFormSchema, LoginFormValues } from './schema';
import { signIn } from '../actions'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { redirect } from 'next/navigation'

export function FormLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);

    const result = await signIn(data);

    if (result?.error) {
      setIsLoading(false);
      toast({ title: 'Ops', description: result.error })
      return;
    }

    if (result?.redirectUrl) {
      redirect(result.redirectUrl);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-64 font-sans"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite seu e-mail" />
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
                <Input
                  {...field}
                  placeholder="Digite sua senha"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button className='w-full' type="submit" size="lg" disabled={isLoading}>
            {isLoading ? <LoaderCircle size={12} className='animate-spin' /> : 'Acessar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
