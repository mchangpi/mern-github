import express from 'express';
import {
  getUserProfileAndRepos,
  getLikedProfiles,
  postLikeProfile,
} from '../controllers/user.controller.js';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js';

const router = express.Router();

router.get('/profile/:username', getUserProfileAndRepos);

router.get('/likes', ensureAuthenticated, getLikedProfiles);

router.post('/like/:username', ensureAuthenticated, postLikeProfile);

export default router;
