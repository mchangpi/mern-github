import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const LikeProfile = ({ userProfile }) => {
  const { authUser } = useAuthContext();

  /*	authUser: backend/models/user.model.js
   *	userProfile: GitHub API
   */
  console.log('authUser', authUser?.username, 'userProfle', userProfile?.login);

  const isOwnProfile = authUser?.username === userProfile?.login;

  const handleLikeProfile = async () => {
    try {
      const res = await fetch(`/api/users/like/${userProfile.login}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!authUser || isOwnProfile) return null;

  return (
    <button
      className="bg-glass flex w-full items-center gap-2 rounded-md border border-blue-400 p-2 text-xs font-medium"
      onClick={handleLikeProfile}
    >
      <FaHeart size={16} /> Like Profile
    </button>
  );
};
export default LikeProfile;
