import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  getUserByEmail,
  addProfilePhotos,
  getProfileById,
} from '../infrastructure/repository/prisma/user/repository';
import prisma from '../infrastructure/repository/prisma/driver';
import {
  response,
  exceptionResponse,
} from '../infrastructure/commons/response';
import {
  DuplicatedDataError,
  UnauthorizedError,
  UnprocessableEntityError,
} from '../infrastructure/commons/exceptions';

const register = async (req: Request, res: Response) => {
  try {
    return await prisma.$transaction(async (tx: any) => {
      const {
        email,
        password,
        name,
        birthdate,
        gender,
        location,
        bio,
        hobbies,
      } = req.body;

      const user = await getUserByEmail(email);
      if (user) {
        throw new DuplicatedDataError('User already exist!');
      }

      const data = {
        email,
        password: await Bun.password.hash(password),
        name,
        birthdate: new Date(birthdate),
        gender,
        location,
        bio,
        hobbies,
        photoUrls: '',
        // photoUrls:
        //   'https://eu.ui-avatars.com/api/?name=' +
        //   name.replace(/\s/g, '+') +
        //   '&size=250',
      };

      const createdUser = await tx.user.create({
        data,
      });

      // create subscription for basic plan
      await tx.subscription.create({
        data: {
          userId: createdUser.id,
          packageId: 1,
          startDate: new Date(),
        },
      });

      // create basic preferences
      await tx.preference.create({
        data: {
          userId: createdUser.id,
          minAge: 18,
          maxAge: 100,
          maxDistance: 50000,
        },
      });

      return response(res, {
        code: 201,
        success: true,
        message: 'Successfully create user!',
        content: createdUser,
      });
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Email or password is incorrect!');
    }
    if (!(await Bun.password.verify(password, user.password))) {
      throw new UnauthorizedError('Email or password is incorrect!');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    let accessToken = jwt.sign(payload, process.env.TOKEN || '', {
      expiresIn: process.env.TOKEN_EXPIRED,
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: `Successfully login ${user.name}!`,
      content: accessToken,
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

const addProfilePhoto = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user;
    if (!userId) {
      throw new UnauthorizedError('Unauthorized!');
    }

    const image = req.file as Express.Multer.File;
    if (!image) {
      throw new UnprocessableEntityError('Image is required!');
    }

    const photoUrl = process.env.UPLOAD_PATH + image.filename;

    const user = await getProfileById(userId);
    if (!user) {
      throw new UnauthorizedError('Unauthorized!');
    }

    const newPhotoUrls =
      user.photoUrls === '' ? photoUrl : user.photoUrls + ',' + photoUrl;

    const updatedUser = await addProfilePhotos(user.id, newPhotoUrls);

    const payload = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      photoUrls: updatedUser.photoUrls,
    };

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully update user!',
      content: payload,
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

export { register, login, addProfilePhoto };
