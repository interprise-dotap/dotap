import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email('E-mail inválido!'),
  password: z.string().min(1, 'Campo obrigatório!'),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
