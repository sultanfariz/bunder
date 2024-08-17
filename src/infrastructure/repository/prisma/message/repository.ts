import { PrismaClient } from '@prisma/client';
import { Message } from './model';

const prisma = new PrismaClient();

const insertMessage = async (data: Message) => {
  try {
    const createdMessage = await prisma.message.create({
      data: data,
    });

    return createdMessage;
  } catch (error: any) {
    throw error;
  }
};

const updateMessageRead = async (id: number) => {
  try {
    const updatedMessage = await prisma.message.update({
      where: {
        id: id,
      },
      data: {
        isRead: true,
      },
    });

    return updatedMessage;
  } catch (error: any) {
    throw error;
  }
};

const getMessagesByMatch = async (matchId: number) => {
  try {
    const message = await prisma.message.findMany({
      where: {
        matchId: matchId,
      },
    });

    return message;
  } catch (error: any) {
    throw error;
  }
};

const getMessageByIdAndReceiver = async (id: number, receiverId: number) => {
  try {
    const message = await prisma.message.findFirst({
      where: {
        id: id,
        receiverId: receiverId,
      },
    });

    return message;
  } catch (error: any) {
    throw error;
  }
};

export {
  insertMessage,
  updateMessageRead,
  getMessagesByMatch,
  getMessageByIdAndReceiver,
};
