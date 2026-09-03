import prisma from '../config/prisma.js';

/**
 * Obtener todas las reseñas de un producto con su promedio de calificación
 * GET /api/products/:productId/reviews
 */
export const getProductReviews = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);

    // 1. Verificar que el producto exista
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // 2. Obtener reseñas del producto
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 3. Calcular el promedio de calificación
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : null;

    res.status(200).json({
      productId,
      total: reviews.length,
      averageRating,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crear una reseña para un producto
 * POST /api/products/:productId/reviews
 */
export const createReview = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    const { author, rating, comment } = req.body;

    // 1. Verificar que el producto exista
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // 2. Crear la reseña
    const newReview = await prisma.review.create({
      data: {
        author,
        rating,
        comment,
        productId
      }
    });

    res.status(201).json({
      mensaje: 'Reseña creada exitosamente',
      data: newReview
    });
  } catch (error) {
    next(error);
  }
};
