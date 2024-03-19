import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';
import { formatDate } from '../utils/functions';

const LikesPage = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const res = await fetch('/api/users/likes', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setLikes(data.likedProfiles);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getLikes();
  }, []);

  console.log('likes:', likes);

  return (
    <div className="relative overflow-x-auto rounded-lg px-4 shadow-md">
      <table className="bg-glass w-full overflow-hidden text-left text-sm rtl:text-right">
        <thead className="bg-glass text-xs uppercase">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">No</div>
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {likes.map((user, idx) => (
            <tr className="bg-glass border-b" key={user.username}>
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <span>{idx + 1}</span>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center whitespace-nowrap px-6 py-4 "
              >
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.avatarUrl}
                  alt="User Avatar"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.username}</div>
                </div>
              </th>
              <td className="px-6 py-4">{formatDate(user.likedDate)}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <FaHeart size={22} className="mx-2 text-red-500" />
                  Liked profile
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default LikesPage;
