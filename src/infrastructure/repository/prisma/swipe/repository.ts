import { PrismaClient } from '@prisma/client';
import { Swipe } from './model';

const prisma = new PrismaClient();

const insertSwipe = async (data: Swipe) => {
  try {
    const createdSwipe = await prisma.swipe.create({
      data: {
        userId: data.userId,
        candidateId: data.candidateId,
        swipe: data.swipe,
        timestamp: data.timestamp,
      },
    });

    return createdSwipe;
  } catch (error: any) {
    throw error;
  }
};

// const updateSwipe = async (id: number, data: any) => {
//   try {
//     const updatedSwipe = await prisma.swipe.update({
//       where: {
//         id: id,
//       },
//       data: data,
//     });

//     return updatedSwipe;
//   } catch (error: any) {
//     throw error;
//   }
// };

const getSwipes = async () => {
  try {
    const swipes = await prisma.swipe.findMany({
      // select: {
      //   id: true,
      //   email: true,
      //   name: true,
      //   photoUrl: true,
      //   role: true,
      // },
    });

    return swipes;
  } catch (error: any) {
    throw error;
  }
};

const getSwipeByUser = async (userId: number) => {
  try {
    const swipe = await prisma.swipe.findMany({
      where: {
        userId: userId,
      },
    });

    return swipe;
  } catch (error: any) {
    throw error;
  }
};

const getSwipeByUserAndDate = async (userId: number, date: Date) => {
  try {
    // timestamp must be between 00:00:00 and 23:59:59
    date = new Date(date.setHours(0, 0, 0, 0));
    const swipe = await prisma.swipe.findMany({
      where: {
        userId: userId,
        timestamp: {
          gte: date,
          lt: new Date(date.getTime() + 86400000),
        },
      },
    });

    return swipe;
  } catch (error: any) {
    throw error;
  }
};

// const getSwipeMatch = async (firstUserId: number, secondUserId: number) => {
//   try {
//     const swipe = await prisma.swipe.findUnique({
//       where: {
//         userId: firstUserId,
//         candidateId: secondUserId,
//       },
//     });

//     return swipe;
//   } catch (error: any) {
//     throw error;
//   }
// };

export { insertSwipe, getSwipes, getSwipeByUser, getSwipeByUserAndDate };
