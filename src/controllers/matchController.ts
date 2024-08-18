import { Request, Response } from 'express';
import {
  response,
  exceptionResponse,
} from '../infrastructure/commons/response';
import { UnauthorizedError } from '../infrastructure/commons/exceptions';
import {
  getProfileById,
  getUserById,
} from '../infrastructure/repository/prisma/user/repository';
import { getMatchesByUser } from '../infrastructure/repository/prisma/match/repository';

const getMatches = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user;
    const user = await getUserById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found!');
    }

    const matches = await getMatchesByUser(userId);

    // populate the opposite user
    const newMatches = await Promise.all(
      matches.map(async (match: any) => {
        const oppositeUserId =
          match.firstId === userId ? match.secondId : match.firstId;
        const oppositeUser = await getProfileById(oppositeUserId);
        if (!oppositeUser) {
          return null;
        }
        match.oppositeUser = {
          id: oppositeUser.id,
          name: oppositeUser.name,
          age: new Date().getFullYear() - oppositeUser.birthdate.getFullYear(),
          photoUrls: oppositeUser.photoUrls,
          gender: oppositeUser.gender,
          location: oppositeUser.location,
          bio: oppositeUser.bio,
          hobbies: oppositeUser.hobbies,
        };
        return match;
      })
    );

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully get matches!',
      content: newMatches,
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

export { getMatches };
