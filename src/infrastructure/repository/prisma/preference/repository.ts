import { PrismaClient } from '@prisma/client';
import { Preference, InsertPreference } from './model';

const prisma = new PrismaClient();

const insertPreference = async (data: InsertPreference) => {
  try {
    const createdPreference = await prisma.preference.create({
      data: data,
    });

    return createdPreference;
  } catch (error: any) {
    throw error;
  }
};

const updatePreference = async (id: number, data: Preference) => {
  try {
    const updatedPreference = await prisma.preference.update({
      where: {
        id: id,
      },
      data: {
        minAge: data.minAge,
        maxAge: data.maxAge,
        maxDistance: data.maxDistance,
      },
    });

    return updatedPreference;
  } catch (error: any) {
    throw error;
  }
};

const getPreferences = async () => {
  try {
    const preferences = await prisma.preference.findMany({});

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

export {
  insertPreference,
  updatePreference,
  getPreferences,
  getPreferenceByUser,
};
