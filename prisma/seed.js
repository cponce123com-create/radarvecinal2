const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // Districts and Sectors
  const miraflores = await prisma.district.upsert({
    where: { name: "Miraflores" },
    update: {},
    create: {
      name: "Miraflores",
      sectors: {
        create: [
          { name: "Sector 1" },
          { name: "Sector 2" },
          { name: "Sector 3" },
          { name: "Sector 4" },
          { name: "Sector 5" },
        ],
      },
    },
    include: { sectors: true },
  });

  // Report Categories
  const categories = [
    { name: "Robo / Asalto", icon: "ShieldAlert" },
    { name: "Pelea / Disturbio", icon: "AlertTriangle" },
    { name: "Actividad sospechosa", icon: "Eye" },
    { name: "Corte de agua / luz", icon: "Droplets" },
    { name: "Basura / limpieza", icon: "Trash2" },
    { name: "Comercio informal", icon: "Store" },
    { name: "Ruidos molestos", icon: "Volume2" },
    { name: "Menor perdido", icon: "UserMinus" },
    { name: "Incendio", icon: "Flame" },
    { name: "Emergencia médica", icon: "Siren" },
    { name: "Otro", icon: "Plus" },
  ];

  for (const cat of categories) {
    await prisma.reportCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  // Demo Admin User
  await prisma.user.upsert({
    where: { email: "admin@radarvecinal.com" },
    update: {},
    create: {
      email: "admin@radarvecinal.com",
      name: "Admin Radar",
      role: "ADMIN",
      districtId: miraflores.id,
      sectorId: miraflores.sectors[0].id,
    },
  });

  // Ads
  await prisma.adSlot.create({
    data: {
      title: "Restaurante El Vecino",
      content: "20% de descuento en platos de fondo para todos los usuarios de Radar Vecinal. ¡Te esperamos!",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop",
      link: "#",
    },
  });

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
