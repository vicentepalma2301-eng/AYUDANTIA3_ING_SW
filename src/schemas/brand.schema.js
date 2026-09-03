import { z } from 'zod';

// Esquema para crear una marca (POST)
export const createBrandSchema = z.object({
  name: z
    .string({ required_error: 'El nombre de la marca es obligatorio' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede exceder los 80 caracteres')
    .trim(),
  country: z
    .string()
    .max(60, 'El país no puede exceder los 60 caracteres')
    .trim()
    .optional(),
  website: z
    .string()
    .url('Formato de URL inválido')
    .max(200, 'La URL no puede exceder los 200 caracteres')
    .trim()
    .optional()
});

// Esquema para actualizar una marca (PUT / PATCH)
export const updateBrandSchema = createBrandSchema.partial();

// Esquema para validar parámetros numéricos en la URL (:id)
export const brandIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'El ID de la marca debe ser un número entero')
    .transform(Number)
});
