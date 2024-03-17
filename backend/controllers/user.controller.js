export const getUserProfileAndRepos = async (req, res) => {
  const { username } = req.params;
  const accessToken = process.env.GITHUB_API_KEY || '';
  try {
    // 60 requests per hour, 5000 requests per hour for authenticated requests
    // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${accessToken}`,
      },
    });

    const profile = await userRes.json();

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
