import React, { useState } from "react";
import { FaEdit, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import API_BASE from "../../api";

const Cards = ({ home, setInputDiv, data, setupdatedData, refreshTasks }) => {
  const [loadingId, setLoadingId] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    setLoadingId(id);
    try {
      await axios.put(
        `${API_BASE}/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      refreshTasks && refreshTasks();
    } catch (error) {
      alert("Failed to update completion status.");
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleImportant = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/api/v2/update-important-task/${id}`,
        {},
        { headers }
      );
      refreshTasks && refreshTasks();
    } catch (error) {
      alert("Failed to update importance status.");
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${API_BASE}/api/v2/delete-task/${id}`,
        { headers }
      );
      refreshTasks && refreshTasks();
    } catch (error) {
      alert("Failed to delete task.");
      console.error(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setupdatedData({ id, title, desc });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items) => (
          // key must be on the outermost element returned from map
          <div
            key={items._id}
            className="flex flex-col justify-between bg-gray-800 rounded-sm p-4"
          >
            <div>
              <h1 className="text-2xl font-semibold text-white">{items.title}</h1>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${items.complete ? "bg-green-800" : "bg-red-500"
                  } p-2 rounded w-3/6 text-white`}
                onClick={() => handleCompleteTask(items._id)}
                disabled={loadingId === items._id}
              >
                {items.complete ? "Completed" : "Incomplete"}
              </button>

              <div className="text-white w-3/6 text-2xl font-semibold flex justify-around">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <CiHeart />
                  )}
                </button>

                {home !== "false" && (
                  <button onClick={() => handleUpdate(items._id, items.title, items.desc)}>
                    <FaEdit />
                  </button>
                )}

                <button onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}

      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoIosAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Tasks</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;

