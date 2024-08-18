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
  getSubscriptionByUserId,
  insertSubscription,
  updateSubscription,
} from '../infrastructure/repository/prisma/subscription/repository';
import {
  getPackageById,
  getPackages,
} from '../infrastructure/repository/prisma/package/repository';

const subscribeNewPackage = async (req: Request, res: Response) => {
  try {
    const packageId = Number(req.params.packageId);
    const { id: userId } = res.locals.user;

    // check if package exist
    const packageExist = await getPackageById(packageId);
    if (!packageExist) {
      throw new NotFoundError('Package not found!');
    }

    // check if the packageId is not basic
    if (packageId === 1) {
      throw new UnprocessableEntityError(
        'You cannot subscribe to the basic package!'
      );
    }

    // check current subscription
    const currentSubscription = await getSubscriptionByUserId(userId);
    if (!currentSubscription) {
      const newSubscription = await insertSubscription({
        userId,
        packageId,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      });

      return response(res, {
        code: 200,
        success: true,
        message: `Successfully subscribe to package ${packageExist.name}!`,
        content: {
          subscription: newSubscription,
          package: packageExist,
        },
      });
    }

    // if subscription same, update the end date by 30 days
    if (currentSubscription && currentSubscription.packageId === packageId) {
      let updatedSubscription = await updateSubscription(
        currentSubscription?.id,
        {
          endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        }
      );

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully update subscription!',
        content: {
          subscription: updatedSubscription,
          package: packageExist,
        },
      });
    }

    const updatedSubscription = await updateSubscription(
      currentSubscription?.id,
      {
        packageId,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      }
    );

    return response(res, {
      code: 200,
      success: true,
      message: `Successfully subscribe to package ${packageExist.name}!`,
      content: {
        subscription: updatedSubscription,
        package: packageExist,
      },
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

export { subscribeNewPackage };
