import { Request, Response } from 'express';
import {
  response,
  exceptionResponse,
} from '../infrastructure/commons/response';
import {
  UnprocessableEntityError,
  NotFoundError,
} from '../infrastructure/commons/exceptions';
import {
  getPreferenceByUser,
  insertPreference,
  updatePreference,
} from '../infrastructure/repository/prisma/preference/repository';
import {
  getProfileById,
  updateProfile,
} from '../infrastructure/repository/prisma/user/repository';
import { parseDateString } from '../infrastructure/commons/helpers/date';

const editPreference = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user;
    const { minAge, maxAge, maxDistance } = req.body;
    if (minAge > maxAge) {
      throw new UnprocessableEntityError(
        'Minimum age cannot be greater than maximum age!'
      );
    }

    // retrieve user preference
    const user = await getProfileById(userId);
    let preference = await getPreferenceByUser(userId);
    if (!preference) {
      preference = await insertPreference({
        userId,
        minAge,
        maxAge,
        maxDistance,
      });
    } else {
      preference = await updatePreference(preference?.id, {
        minAge,
        maxAge,
        maxDistance,
      });
    }

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully update preference!',
      content: {
        user,
        preference,
      },
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

const getOwnProfile = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user;
    const user = await getProfileById(userId);
    if (!user) {
      throw new NotFoundError('User not found!');
    }
    const preference = await getPreferenceByUser(userId);

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully get own profile!',
      content: {
        user: {
          ...user,
          age: new Date().getFullYear() - user.birthdate.getFullYear(),
        },
        preference: preference,
      },
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

const editProfile = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user;
    const { name, birthdate, bio, hobbies, location } = req.body;

    const user = await getProfileById(userId);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const updatedUser = await updateProfile(userId, {
      name,
      birthdate: new Date(parseDateString(birthdate)),
      bio,
      hobbies,
      location,
    });

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully update profile!',
      content: {
        id: updatedUser.id,
        name: updatedUser.name,
        photoUrls: updatedUser.photoUrls,
        gender: updatedUser.gender,
        location: updatedUser.location,
        bio: updatedUser.bio,
        hobbies: updatedUser.hobbies,
        age: new Date().getFullYear() - updatedUser.birthdate.getFullYear(),
      },
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

export { getOwnProfile, editPreference, editProfile };
