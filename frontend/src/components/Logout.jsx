import { MdLogout } from 'react-icons/md';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Logout = () => {
  const { authUser, setAuthUser } = useAuthContext();
  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/logout', { credentials: 'include' });
      const data = await res.json();
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <img
        src={authUser?.avatarUrl}
        className="h-10 w-10 rounded-full border border-gray-800"
      />

      <div
        className="bg-glass mt-auto flex cursor-pointer items-center rounded-lg border border-gray-300 p-2"
        onClick={handleLogout}
      >
        <MdLogout size={22} />
      </div>
    </>
  );
};

export default Logout;
