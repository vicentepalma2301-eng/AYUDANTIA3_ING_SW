import { Router } from 'express';
import {
  getProductReviews,
  createReview
} from '../controllers/review.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createReviewSchema,
  productIdParamSchema
} from '../schemas/review.schema.js';

const router = Router({ mergeParams: true });

// Endpoints de Reseñas de un Producto (/api/products/:productId/reviews)
router.get('/reviews', validate(productIdParamSchema, 'params'), getProductReviews);
router.post('/reviews', validate(productIdParamSchema, 'params'), validate(createReviewSchema, 'body'), createReview);

export default router;
