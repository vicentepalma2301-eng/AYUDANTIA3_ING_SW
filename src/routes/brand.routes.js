import { Router } from 'express';
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
} from '../controllers/brand.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createBrandSchema,
  updateBrandSchema,
  brandIdParamSchema
} from '../schemas/brand.schema.js';

const router = Router();

// Endpoints de Marcas
router.get('/', getAllBrands);
router.get('/:id', validate(brandIdParamSchema, 'params'), getBrandById);
router.post('/', validate(createBrandSchema, 'body'), createBrand);
router.put('/:id', validate(brandIdParamSchema, 'params'), validate(updateBrandSchema, 'body'), updateBrand);
router.delete('/:id', validate(brandIdParamSchema, 'params'), deleteBrand);

export default router;
