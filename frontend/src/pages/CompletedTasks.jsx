import { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';
import API_BASE from '../api';

const CompletedTasks = () => {
  const [Data, setData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/v2/get-complete-tasks`, { headers });
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch completed tasks:", error);
      }
    };
    fetchCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default CompletedTasks;
