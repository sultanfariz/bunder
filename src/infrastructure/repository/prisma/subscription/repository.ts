import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertSubscription = async (data: any) => {
  try {
    const createdSubscription = await prisma.subscription.create({
      data: data,
    });

    return createdSubscription;
  } catch (error: any) {
    throw error;
  }
};

const updateSubscription = async (id: number, data: any) => {
  try {
    const updatedSubscription = await prisma.subscription.update({
      where: {
        id: id,
      },
      data: data,
    });

    return updatedSubscription;
  } catch (error: any) {
    throw error;
  }
};

const getSubscriptions = async () => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      // select: {
      //   id: true,
      //   email: true,
      //   name: true,
      //   photoUrl: true,
      //   role: true,
      // },
    });

    return subscriptions;
  } catch (error: any) {
    throw error;
  }
};

const getSubscriptionByUserId = async (userId: number) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: userId,
      },
    });

    return subscription;
  } catch (error: any) {
    throw error;
  }
};

export {
  insertSubscription,
  updateSubscription,
  getSubscriptions,
  getSubscriptionByUserId,
};
