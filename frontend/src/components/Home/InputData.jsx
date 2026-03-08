import axios from 'axios';
import { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import API_BASE from '../../api';

const InputData = ({ InputDiv, setInputDiv, updatedData, setupdatedData, refreshTasks }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    setData({ title: updatedData.title, desc: updatedData.desc });
  }, [updatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      try {
        await axios.post(`${API_BASE}/api/v2/create-task`, Data, { headers });
        setData({ title: "", desc: "" });
        setInputDiv("hidden");
        refreshTasks && refreshTasks();
      } catch (error) {
        alert(error.response?.data?.message || "Failed to create task.");
        console.error(error);
      }
    }
  };

  const updateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      try {
        await axios.put(`${API_BASE}/api/v2/update-task/${updatedData.id}`, Data, { headers });
        setupdatedData({ id: "", title: "", desc: "" });
        setData({ title: "", desc: "" });
        setInputDiv("hidden");
        refreshTasks && refreshTasks();
      } catch (error) {
        alert(error.response?.data?.message || "Failed to update task.");
        console.error(error);
      }
    }
  };

  const handleClose = () => {
    setInputDiv("hidden");
    setData({ title: "", desc: "" });
    setupdatedData({ id: "", title: "", desc: "" });
  };

  return (
    <>
      <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`} />
      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-2/6 bg-gray-900 p-4 rounded'>
          <div className='flex justify-end'>
            <button className='text-2xl' onClick={handleClose}>
              <RxCross2 />
            </button>
          </div>
          <input
            type='text'
            placeholder='Title'
            name='title'
            className='px-3 py-2 rounded w-full bg-gray-700'
            value={Data.title}
            onChange={change}
          />
          <textarea
            name='desc'
            cols='30'
            rows='10'
            placeholder='Description..'
            className='px-3 py-2 rounded w-full bg-gray-700 my-3'
            value={Data.desc}
            onChange={change}
          />
          {updatedData.id === "" ? (
            <button
              className='px-3 py-2 bg-red-400 rounded text-white text-xl font-semibold cursor-pointer'
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className='px-3 py-2 bg-red-400 rounded text-white text-xl font-semibold cursor-pointer'
              onClick={updateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
