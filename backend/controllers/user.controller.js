import User from '../models/user.model.js';

const accessToken = process.env.GITHUB_API_KEY || '';

const getProfile = async (username) => {
  // 60 requests per hour, 5000 requests per hour for authenticated requests
  // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
  const userRes = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      authorization: `token ${accessToken}`,
    },
  });

  const profile = await userRes.json();
  return profile;
};

export const getUserProfileAndRepos = async (req, res) => {
  const { username } = req.params;
  try {
    const profile = await getProfile(username);

    const repoRes = await fetch(profile.repos_url, {
      headers: {
        authorization: `token ${accessToken}`,
      },
    });
    const repos = await repoRes.json();

    res.status(200).json({ profile, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikedBy = async (req, res) => {
  try {
    const authUser = await User.findById(req.user._id.toString());
    res.status(200).json({ likedBy: authUser.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikedProfiles = async (req, res) => {
  try {
    console.log('get liked profiles', req);
    const authUser = await User.findById(req.user._id.toString());
    console.log('liked profiles', authUser.likedProfiles);
    res.status(200).json({ likedProfiles: authUser.likedProfiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postLikeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const authUser = await User.findById(req.user._id.toString());

    let userToLike = null;

    try {
      userToLike = await getProfile(username);
      console.log('like profile: ', userToLike.login);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    for (let liked of authUser.likedProfiles) {
      if (liked.username === userToLike.login) {
        return res.status(400).json({ error: 'Already liked the profile' });
      }
    }

    authUser.likedProfiles.push({
      username: userToLike.login,
      avatarUrl: userToLike.avatar_url,
      likedDate: Date.now().toLocaleString(),
    });
    await authUser.save();

    res.status(200).json({ message: 'User liked the profile successfully' });
  } catch (error) {
    // console.log('error', error.message);
    res.status(500).json({ error: error.message });
  }
};

/*
export const likeProfile = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findById(req.user._id.toString());
		console.log(user, "auth user");
		const userToLike = await User.findOne({ username });

		if (!userToLike) {
			return res.status(404).json({ error: "User is not a member" });
		}

		if (user.likedProfiles.includes(userToLike.username)) {
			return res.status(400).json({ error: "User already liked" });
		}

		userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() });
		user.likedProfiles.push(userToLike.username);

		// await userToLike.save();
		// await user.save();
		await Promise.all([userToLike.save(), user.save()]);

		res.status(200).json({ message: "User liked" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
*/
