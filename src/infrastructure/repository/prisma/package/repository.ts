import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertPackage = async (data: any) => {
  try {
    const createdPackage = await prisma.package.create({
      data: data,
    });

    return createdPackage;
  } catch (error: any) {
    throw error;
  }
};

// const updatePackage = async (id: number, data: any) => {
//   try {
//     const updatedPackage = await prisma.package.update({
//       where: {
//         id: id,
//       },
//       data: data,
//     });

//     return updatedPackage;
//   } catch (error: any) {
//     throw error;
//   }
// };

const getPackages = async () => {
  try {
    const packages = await prisma.package.findMany({
      // select: {
      //   id: true,
      //   email: true,
      //   name: true,
      //   photoUrl: true,
      //   role: true,
      // },
    });

    return packages;
  } catch (error: any) {
    throw error;
  }
};

const getPackageById = async (packageId: number) => {
  try {
    const pkg = await prisma.package.findUnique({
      where: {
        id: packageId,
      },
    });

    return pkg;
  } catch (error: any) {
    throw error;
  }
};

export { insertPackage, getPackages, getPackageById };
