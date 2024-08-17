import { PrismaClient } from '@prisma/client';
import { Preference } from './model';

const prisma = new PrismaClient();

const insertPreference = async (data: Preference) => {
  try {
    const createdPreference = await prisma.preference.create({
      data: data,
    });

    return createdPreference;
  } catch (error: any) {
    throw error;
  }
};

// const updatePreference = async (id: number, data: any) => {
//   try {
//     const updatedPreference = await prisma.preference.update({
//       where: {
//         id: id,
//       },
//       data: data,
//     });

//     return updatedPreference;
//   } catch (error: any) {
//     throw error;
//   }
// };

const getPreferences = async () => {
  try {
    const preferences = await prisma.preference.findMany({
      // select: {
      //   id: true,
      //   email: true,
      //   name: true,
      //   photoUrl: true,
      //   role: true,
      // },
    });

    return preferences;
  } catch (error: any) {
    throw error;
  }
};

const getPreferenceByUser = async (userId: number) => {
  try {
    const preference = await prisma.preference.findUnique({
      where: {
        userId: userId,
      },
    });

    return preference;
  } catch (error: any) {
    throw error;
  }
};

export { insertPreference, getPreferences, getPreferenceByUser };
