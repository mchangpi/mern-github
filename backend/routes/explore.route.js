import express from 'express';
import { explorePopularRepos } from '../controllers/explore.controller.js';

const router = express.Router();

router.get('/repos/:language', explorePopularRepos);
/*
router.get('/repos/:language', (req, res) => {
  res.send('explore language: ' + req.params.language);
});
*/
export default router;
