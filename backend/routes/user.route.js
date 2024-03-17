import express from 'express';
import { getUserProfileAndRepos } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile/:username', getUserProfileAndRepos);
/*
router.get('/profile/:username', (req, res) => {
  res.send('User profile for ' + req.params.username);
});
*/
// TODO => GET likes (who liked our profile)
// TODO => POST like a profile

export default router;
