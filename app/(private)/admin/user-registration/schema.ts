import { z } from 'zod';

export const UserRegistrationFormSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório!'),
  email: z.string().email('E-mail inválido!'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres!'),
  isAdmin: z.boolean(),
});

export type UserRegistrationFormValues = z.infer<
  typeof UserRegistrationFormSchema
>;
