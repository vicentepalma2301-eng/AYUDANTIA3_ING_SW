import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando carga de datos de prueba (Seed)...');

  // Limpiar base de datos previa (orden por restricciones de clave foránea)
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();

  // 1. Crear Categorías
  const electronica = await prisma.category.create({
    data: {
      name: 'Electrónica',
      description: 'Dispositivos inteligentes, computadores, audio y accesorios.'
    }
  });

  const hogar = await prisma.category.create({
    data: {
      name: 'Hogar y Oficina',
      description: 'Muebles ergonómicos, iluminación y artículos de escritorio.'
    }
  });

  const accesorios = await prisma.category.create({
    data: {
      name: 'Accesorios',
      description: 'Cables, adaptadores, mochilas y fundas protectoras.'
    }
  });

  // 2. Crear Marcas
  const logitech = await prisma.brand.create({
    data: {
      name: 'Logitech',
      country: 'Suiza',
      website: 'https://www.logitech.com'
    }
  });

  const apple = await prisma.brand.create({
    data: {
      name: 'Apple',
      country: 'Estados Unidos',
      website: 'https://www.apple.com'
    }
  });

  const sony = await prisma.brand.create({
    data: {
      name: 'Sony',
      country: 'Japón',
      website: 'https://www.sony.com'
    }
  });

  const samsung = await prisma.brand.create({
    data: {
      name: 'Samsung',
      country: 'Corea del Sur',
      website: 'https://www.samsung.com'
    }
  });

  // 3. Crear Productos asociados a categorías y marcas
  const p1 = await prisma.product.create({
    data: {
      name: 'Laptop Gamer Pro 16"',
      description: 'Intel i7, 32GB RAM, RTX 4070, 1TB SSD NVMe.',
      price: 1299990,
      stock: 15,
      sku: 'TECH-LAP-001',
      isAvailable: true,
      categoryId: electronica.id,
      brandId: sony.id
    }
  });

  const p2 = await prisma.product.create({
    data: {
      name: 'Mouse Ergonómico Inalámbrico',
      description: 'Sensor óptico 4000 DPI, batería recargable vía USB-C.',
      price: 34990,
      stock: 50,
      sku: 'TECH-MOU-002',
      isAvailable: true,
      categoryId: electronica.id,
      brandId: logitech.id
    }
  });

  const p3 = await prisma.product.create({
    data: {
      name: 'Silla de Oficina Ergonómica',
      description: 'Soporte lumbar ajustable, malla transpirable y apoyabrazos 3D.',
      price: 189990,
      stock: 8,
      sku: 'HOG-SIL-001',
      isAvailable: true,
      categoryId: hogar.id,
      brandId: samsung.id
    }
  });

  const p4 = await prisma.product.create({
    data: {
      name: 'Mochila Impermeable para Notebook 16"',
      description: 'Compartimento acolchado, puerto USB externo y tela antirayaduras.',
      price: 29990,
      stock: 0,
      sku: 'ACC-MOC-001',
      isAvailable: false,
      categoryId: accesorios.id,
      brandId: apple.id
    }
  });

  // 4. Crear Reseñas para los productos
  await prisma.review.createMany({
    data: [
      {
        author: 'Carlos Pérez',
        rating: 5,
        comment: 'Excelente laptop, corre todo sin problemas y la batería dura horas.',
        productId: p1.id
      },
      {
        author: 'María González',
        rating: 4,
        comment: 'Muy buena pantalla y rendimiento, aunque es un poco pesada.',
        productId: p1.id
      },
      {
        author: 'Jorge Silva',
        rating: 5,
        comment: 'El mouse es muy cómodo y preciso. La batería dura semanas.',
        productId: p2.id
      },
      {
        author: 'Ana Torres',
        rating: 3,
        comment: 'La silla es cómoda pero el ensamblaje fue complicado.',
        productId: p3.id
      }
    ]
  });

  console.log('✅ Base de datos poblada exitosamente:');
  console.log(`- 3 Categorías creadas: [${electronica.name}, ${hogar.name}, ${accesorios.name}]`);
  console.log(`- 4 Marcas creadas: [${logitech.name}, ${apple.name}, ${sony.name}, ${samsung.name}]`);
  console.log(`- 4 Productos creados: [${p1.name}, ${p2.name}, ${p3.name}, ${p4.name}]`);
  console.log('- 4 Reseñas creadas para los productos');
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
