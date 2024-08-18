const { Router } = require('express');
import {
  register,
  login,
  addProfilePhoto,
} from '../controllers/authController';
import { getMatches } from '../controllers/matchController';
import {
  getMessages,
  readMessage,
  sendMessage,
} from '../controllers/messagesController';
import { subscribeNewPackage } from '../controllers/subscriptionController';
import { discoverProfiles, swipeProfile } from '../controllers/swipeController';
import {
  editPreference,
  editProfile,
  getOwnProfile,
} from '../controllers/userController';
import { auth, verifyRole } from '../infrastructure/commons/middlewares/jwt';
import uploadFile from '../infrastructure/commons/middlewares/uploadFile';
import validateBody, {
  userSchema,
  loginSchema,
  swipeSchema,
  messageSchema,
} from '../infrastructure/transport/validator';
import {
  preferenceSchema,
  profileSchema,
} from '../infrastructure/transport/validator/UserSchema';

const router = Router();

// auth
router.post('/register', validateBody(userSchema), register);
router.post('/login', validateBody(loginSchema), login);

// user profile
router.post(
  '/image-upload',
  auth,
  uploadFile().single('image'),
  addProfilePhoto
);
router.get('/my', auth, getOwnProfile);
router.put(
  '/my/preferences',
  auth,
  validateBody(preferenceSchema),
  editPreference
);
router.put('/my/profile', auth, validateBody(profileSchema), editProfile);

// subscription
router.post('/subscription/:packageId/subscribe', auth, subscribeNewPackage);

// discovery
router.get('/discover', auth, discoverProfiles);
router.post('/swipe/:profileId', auth, validateBody(swipeSchema), swipeProfile);

// match
router.get('/matches', auth, getMatches);

// message
router.get('/matches/:matchId/messages', auth, getMessages);
router.post(
  '/matches/:matchId/messages',
  auth,
  validateBody(messageSchema),
  sendMessage
);
router.post('/matches/:matchId/messages/:messageId/read', auth, readMessage);

export default router;
