import { useState, useEffect } from 'react';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
import API_BASE from '../../api';

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important tasks",
      icon: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed tasks",
      icon: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      title: "Incompleted tasks",
      icon: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];

  const [Data, setData] = useState(null);

  const logout = () => {
    // Use removeItem — localStorage.clear() would wipe ALL keys
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    history("/login");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Empty dependency array — fetch once on mount, not every render
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/v2/get-all-tasks`, { headers });
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Data && (
        <div>
          <h1 className='text-xl font-semibold'>{Data.username}</h1>
          <h4 className='mb-2 text-gray-400'>{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className='my-8 flex items-center hover:bg-blue-500 p-2 rounded transition-all duration-300'
          >
            {items.icon} &nbsp; {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button className='bg-indigo-500 w-full p-2 rounded' onClick={logout}>
          Log out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
