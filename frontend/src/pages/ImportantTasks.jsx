import { useEffect, useState } from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';
import API_BASE from '../api';

const ImportantTasks = () => {
  const [Data, setData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchImportant = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/v2/get-important-tasks`, { headers });
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch important tasks:", error);
      }
    };
    fetchImportant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default ImportantTasks;
