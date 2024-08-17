import { PrismaClient } from '@prisma/client';
import { Match } from './model';

const prisma = new PrismaClient();

const insertMatch = async (data: Match) => {
  try {
    const createdMatch = await prisma.match.create({
      data: data,
    });

    return createdMatch;
  } catch (error: any) {
    throw error;
  }
};

const updateMatch = async (id: number, data: any) => {
  try {
    const updatedMatch = await prisma.match.update({
      where: {
        id: id,
      },
      data: data,
    });

    return updatedMatch;
  } catch (error: any) {
    throw error;
  }
};

const getMatchesById = async (id: number) => {
  try {
    return await prisma.match.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    throw error;
  }
};

const getMatchesByUser = async (userId: number) => {
  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          {
            firstId: userId,
          },
          {
            secondId: userId,
          },
        ],
      },
    });

    return matches;
  } catch (error: any) {
    throw error;
  }
};

const getMatchByUsers = async (firstUserId: number, secondUserId: number) => {
  try {
    const match = await prisma.match.findFirst({
      where: {
        firstId: firstUserId,
        secondId: secondUserId,
      },
    });

    return match;
  } catch (error: any) {
    throw error;
  }
};

export {
  insertMatch,
  updateMatch,
  getMatchesById,
  getMatchesByUser,
  getMatchByUsers,
};
