import { Request, Response } from 'express';
import {
  response,
  exceptionResponse,
} from '../infrastructure/commons/response';
import {
  NotFoundError,
  UnauthorizedError,
} from '../infrastructure/commons/exceptions';
import { getUserById } from '../infrastructure/repository/prisma/user/repository';
import { getMatchesById } from '../infrastructure/repository/prisma/match/repository';
import {
  getMessageByIdAndReceiver,
  getMessagesByMatch,
  updateMessageRead,
} from '../infrastructure/repository/prisma/message/repository';
import prisma from '../infrastructure/repository/prisma/driver';

const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user;
    const matchId = Number(req.params.matchId);
    const user = await getUserById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found!');
    }

    // check if user is in the match
    const match = await getMatchesById(matchId);
    if (!match) {
      throw new NotFoundError('Match not found!');
    }
    if (match.firstId !== userId && match.secondId !== userId) {
      throw new UnauthorizedError('You are not in this chat!');
    }

    let messages = await getMessagesByMatch(matchId);

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully get messages!',
      content: messages,
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

const sendMessage = async (req: Request, res: Response) => {
  try {
    return await prisma.$transaction(async (tx: any) => {
      const { id: userId } = res.locals.user;
      const matchId = Number(req.params.matchId);
      const { content } = req.body;

      const user = await getUserById(userId);
      if (!user) {
        throw new UnauthorizedError('User not found!');
      }

      // check if user is in the match
      const match = await getMatchesById(matchId);
      if (!match) {
        throw new NotFoundError('Match not found!');
      }
      if (match.firstId !== userId && match.secondId !== userId) {
        throw new UnauthorizedError('You are not in this chat!');
      }

      await tx.message.create({
        data: {
          matchId,
          senderId: userId,
          receiverId: match.firstId === userId ? match.secondId : match.firstId,
          content,
          isRead: false,
          timestamp: new Date(),
        },
      });

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully send message!',
      });
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

const readMessage = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user;
    const messageId = Number(req.params.messageId);
    const user = await getUserById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found!');
    }

    const message = await getMessageByIdAndReceiver(messageId, userId);
    if (!message) {
      throw new NotFoundError('Message not found!');
    }

    await updateMessageRead(messageId);

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully read message!',
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

export { getMessages, sendMessage, readMessage };
