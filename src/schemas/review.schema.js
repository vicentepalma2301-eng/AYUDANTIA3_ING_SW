import { z } from 'zod';

// Esquema para crear una reseña (POST)
export const createReviewSchema = z.object({
  author: z
    .string({ required_error: 'El nombre del autor es obligatorio' })
    .min(2, 'El nombre del autor debe tener al menos 2 caracteres')
    .max(100, 'El nombre del autor no puede exceder los 100 caracteres')
    .trim(),
  rating: z
    .number({ required_error: 'La calificación es obligatoria' })
    .int('La calificación debe ser un número entero')
    .min(1, 'La calificación debe ser al menos 1')
    .max(5, 'La calificación no puede exceder 5'),
  comment: z
    .string({ required_error: 'El comentario es obligatorio' })
    .min(10, 'El comentario debe tener al menos 10 caracteres')
    .max(500, 'El comentario no puede exceder los 500 caracteres')
    .trim()
});

// Esquema para validar el parámetro :productId en la URL
export const productIdParamSchema = z.object({
  productId: z
    .string()
    .regex(/^\d+$/, 'El ID del producto debe ser un número entero')
    .transform(Number)
});
