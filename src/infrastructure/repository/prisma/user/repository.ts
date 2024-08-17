import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertUser = async (data: any) => {
  try {
    const createdUser = await prisma.user.create({
      data: data,
    });

    return createdUser;
  } catch (error: any) {
    throw error;
  }
};

const updateUser = async (id: number, data: any) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });

    return updatedUser;
  } catch (error: any) {
    throw error;
  }
};

const getProfiles = async () => {
  try {
    const profiles = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        gender: true,
        location: true,
        photoUrls: true,
        birthdate: true,
        hobbies: true,
        bio: true,
        // subscription: true,
      },
    });

    return profiles;
  } catch (error: any) {
    throw error;
  }
};

const getProfilesWithSubs = async () => {
  try {
    const profiles = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        gender: true,
        location: true,
        photoUrls: true,
        birthdate: true,
        hobbies: true,
        bio: true,
        subscription: {
          select: {
            packageId: true,
            endDate: true,
          },
        },
      },
    });

    return profiles;
  } catch (error: any) {
    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error: any) {
    throw error;
  }
};

const getUserById = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error: any) {
    throw error;
  }
};

export {
  insertUser,
  updateUser,
  getProfiles,
  getProfilesWithSubs,
  getUserByEmail,
  getUserById,
};
