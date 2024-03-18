import { Link } from 'react-router-dom';
import { IoHomeSharp } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineExplore } from 'react-icons/md';
import { PiSignInBold } from 'react-icons/pi';
import { MdEditDocument } from 'react-icons/md';
import Logout from './Logout';
import { useAuthContext } from "../context/AuthContext";

const Sidebar = () => {
	const { authUser } = useAuthContext();

  return (
    <>
      <aside className="bg-glass sticky left-0 top-0 flex h-screen min-w-12 flex-col items-center overflow-y-auto border-r py-8 text-white sm:w-16">
        <nav className="flex h-full flex-col gap-3">
          <Link to="/" className="flex justify-center">
            <img className="h-8" src="/github.svg" alt="Github" />
          </Link>

          <Link
            to="/"
            className="flex justify-center rounded-lg p-1.5 transition-colors duration-200 
					hover:bg-gray-800"
          >
            <IoHomeSharp size={20} />
          </Link>

          {authUser && (
            <Link
              to="/likes"
              className="flex justify-center rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-800"
            >
              <FaHeart size={22} />
            </Link>
          )}

          {authUser && (
            <Link
              to="/explore"
              className="flex justify-center rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-800"
            >
              <MdOutlineExplore size={25} />
            </Link>
          )}

          {!authUser && (
            <Link
              to="/login"
              className="focus:outline-nones rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-800"
            >
              <PiSignInBold size={25} />
            </Link>
          )}

          {!authUser && (
            <Link
              to="/signup"
              className="focus:outline-nones rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-800"
            >
              <MdEditDocument size={25} />
            </Link>
          )}

          {authUser && (
            <div className="mt-auto flex flex-col gap-2">
              <Logout />
            </div>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
