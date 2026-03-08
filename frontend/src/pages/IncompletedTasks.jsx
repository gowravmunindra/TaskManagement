import { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';
import API_BASE from '../api';

const IncompletedTasks = () => {
  const [Data, setData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchIncomplete = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/v2/get-incomplete-tasks`, { headers });
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch incomplete tasks:", error);
      }
    };
    fetchIncomplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default IncompletedTasks;
