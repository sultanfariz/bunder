import { Request, Response } from 'express';
import {
  response,
  exceptionResponse,
} from '../infrastructure/commons/response';
import {
  UnprocessableEntityError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenAccessError,
} from '../infrastructure/commons/exceptions';
import {
  getSubscriptionByUserId,
  insertSubscription,
  updateSubscription,
} from '../infrastructure/repository/prisma/subscription/repository';
import { getPackageById } from '../infrastructure/repository/prisma/package/repository';
import {
  getProfiles,
  getProfilesWithSubs,
  getUserById,
} from '../infrastructure/repository/prisma/user/repository';
import { fetchLocationByCoordinates } from '../infrastructure/commons/libs/OpenStreetMap/geocode';
import { getPreferenceByUser } from '../infrastructure/repository/prisma/preference/repository';
import {
  convertCoordinatesStrToLatLon,
  euclideanDistance,
} from '../infrastructure/commons/libs/OpenStreetMap/euclideanDistance';
import {
  getSwipeByUser,
  getSwipeByUserAndDate,
  insertSwipe,
} from '../infrastructure/repository/prisma/swipe/repository';
import prisma from '../infrastructure/repository/prisma/driver';
import PaymentNeededError from '../infrastructure/commons/exceptions/PaymentNeededError';

const discoverProfiles = async (req: Request, res: Response) => {
  try {
    // check if user has a unlimited swipe subscription
    const { id: userId } = res.locals.user;
    // retrieve user data
    const user = await getUserById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found!');
    }
    const currentSubscription = await getSubscriptionByUserId(userId);

    if (currentSubscription?.packageId !== 2) {
      // count swiped profiles for today only
      const swipedProfiles = await getSwipeByUserAndDate(userId, new Date());
      if (swipedProfiles.length >= 10) {
        throw new PaymentNeededError(
          'You have reached your daily swipe limit!'
        );
      }
    }

    // fetch all profiles and filter them based on user's preference
    let allProfiles = await getProfilesWithSubs();
    let filteredProfiles = allProfiles.filter(
      (profile) => profile.id !== userId
    );

    // filter only the opposite gender
    filteredProfiles = filteredProfiles.filter(
      (profile) => profile.gender !== user.gender
    );
    // sort based on userId ascending
    filteredProfiles = filteredProfiles.sort((a, b) => a.id - b.id);

    // sort profile based on user is verified or not
    let verifiedProfiles = filteredProfiles.filter((profile) => {
      if (profile.subscription) {
        return profile.subscription.packageId === 3;
      }
      return false;
    });
    let unverifiedProfiles = filteredProfiles.filter((profile) => {
      if (profile.subscription) {
        return profile.subscription.packageId !== 3;
      }
      return true;
    });
    let sortedProfiles = verifiedProfiles.concat(unverifiedProfiles);

    let profiles = await Promise.all(
      sortedProfiles.map(async (profile) => {
        // const [lat, lon] = convertCoordinatesStrToLatLon(profile.location);
        // const { address } = await fetchLocationByCoordinates(lat, lon);
        // console.log(address);

        return {
          id: profile.id,
          name: profile.name,
          gender: profile.gender,
          age:
            new Date().getFullYear() -
            new Date(profile.birthdate).getFullYear(),
          photoUrls: profile.photoUrls,
          // city: address.city,
          location: profile.location,
          hobbies: profile.hobbies,
          bio: profile.bio,
        };
      })
    );

    // retrieve user's preference
    const userPreference = await getPreferenceByUser(userId);
    if (userPreference) {
      profiles = profiles.filter((profile) => {
        return (
          profile.age >= userPreference.minAge &&
          profile.age <= userPreference.maxAge &&
          euclideanDistance(profile.location, user.location) / 1000 <= // convert to km
            userPreference.maxDistance
        );
      });
    }

    // need to check if the profile is already swiped
    let swipedProfiles = await getSwipeByUser(userId);
    profiles = profiles.filter(
      (profile) =>
        !swipedProfiles.find((swipe) => swipe.candidateId === profile.id)
    );

    // good to have: rank the profiles based on user's profile similarity

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully get all profiles!',
      content: profiles[0],
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

const swipeProfile = async (req: Request, res: Response) => {
  try {
    return await prisma.$transaction(async (tx: any) => {
      const { id: userId } = res.locals.user;
      const profileId = Number(req.params.profileId);
      const { swipeDirection } = req.body;

      // check if profile exist
      const profile = await getUserById(profileId);
      if (!profile) {
        throw new NotFoundError('Profile not found!');
      }

      if (profileId === userId) {
        throw new ForbiddenAccessError('You cannot swipe your own profile!');
      }

      // check if user has a unlimited swipe subscription
      const currentSubscription = await getSubscriptionByUserId(userId);
      if (currentSubscription?.packageId !== 2) {
        // count swiped profiles for today only
        const swipedProfiles = await getSwipeByUserAndDate(userId, new Date());
        if (swipedProfiles.length >= 10) {
          throw new PaymentNeededError(
            'You have reached your daily swipe limit!'
          );
        }
      }

      // check if user already swipe the profile
      const swipedProfile = await getSwipeByUser(userId);
      if (swipedProfile.find((swipe) => swipe.candidateId === profileId)) {
        throw new ForbiddenAccessError('You already swipe this profile!');
      }

      await tx.swipe.create({
        data: {
          userId,
          candidateId: profileId,
          swipe: swipeDirection,
          timestamp: new Date(),
        },
      });

      // if the candidate already swipe the user, create a match
      if (swipeDirection === 'RIGHT') {
        const candidateSwipedProfile = await getSwipeByUser(profileId);
        const match = candidateSwipedProfile.find(
          (swipe) => swipe.userId === profileId && swipe.swipe === 'RIGHT'
        );
        if (match) {
          // create a match
          await tx.match.create({
            data: {
              firstId: userId,
              secondId: profileId,
              timestamp: new Date(),
            },
          });
        }
      }

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully swipe profile!',
      });
    });
  } catch (error: any) {
    return exceptionResponse(res, error);
  }
};

export { discoverProfiles, swipeProfile };
