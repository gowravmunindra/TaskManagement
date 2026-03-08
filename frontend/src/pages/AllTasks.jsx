import React, { useState, useEffect } from 'react'
import Cards from '../components/Home/Cards';
import InputData from '../components/Home/InputData';
import axios from 'axios';
import API_BASE from '../api';

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState(null);
  const [updatedData, setupdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/v2/get-all-tasks`, { headers });
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {Data && (
          <Cards
            home={"true"}
            setInputDiv={setInputDiv}
            data={Data.tasks}
            setupdatedData={setupdatedData}
            refreshTasks={fetchTasks}
          />
        )}
      </div>
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        updatedData={updatedData}
        setupdatedData={setupdatedData}
        refreshTasks={fetchTasks}
      />
    </>
  );
};

export default AllTasks;
