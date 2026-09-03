import prisma from '../config/prisma.js';

/**
 * Obtener todas las marcas incluyendo el conteo de productos
 * GET /api/brands
 */
export const getAllBrands = async (req, res, next) => {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { products: true } // Cantidad de productos de cada marca
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.status(200).json({
      total: brands.length,
      data: brands
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener una marca por ID con sus productos
 * GET /api/brands/:id
 */
export const getBrandById = async (req, res, next) => {
  try {
    const brandId = Number(req.params.id);

    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            sku: true,
            isAvailable: true
          }
        }
      }
    });

    if (!brand) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }

    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

/**
 * Crear una nueva marca
 * POST /api/brands
 */
export const createBrand = async (req, res, next) => {
  try {
    const { name, country, website } = req.body;

    const newBrand = await prisma.brand.create({
      data: {
        name,
        country,
        website
      }
    });

    res.status(201).json({
      mensaje: 'Marca creada exitosamente',
      data: newBrand
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar una marca existente
 * PUT /api/brands/:id
 */
export const updateBrand = async (req, res, next) => {
  try {
    const brandId = Number(req.params.id);
    const { name, country, website } = req.body;

    const updatedBrand = await prisma.brand.update({
      where: { id: brandId },
      data: {
        name,
        country,
        website
      }
    });

    res.status(200).json({
      mensaje: 'Marca actualizada exitosamente',
      data: updatedBrand
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar una marca
 * DELETE /api/brands/:id
 */
export const deleteBrand = async (req, res, next) => {
  try {
    const brandId = Number(req.params.id);

    // Verificar si la marca tiene productos asociados
    const count = await prisma.product.count({
      where: { brandId }
    });

    if (count > 0) {
      return res.status(400).json({
        error: `No se puede eliminar la marca porque tiene ${count} producto(s) asociado(s).`
      });
    }

    await prisma.brand.delete({
      where: { id: brandId }
    });

    res.status(200).json({
      mensaje: 'Marca eliminada exitosamente'
    });
  } catch (error) {
    next(error);
  }
};
