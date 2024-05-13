import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sortedproduct from '../Components/Sortedproduct.jsx';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://frontend-assessment-server.onrender.com/api/dashboard');
        setData(res.data);
      } catch (e) {
        console.log(e);
        setError(e);
      }
    };
    fetchData();
  }, []);
 data.forEach((x)=>{
      x.id=Number(x.id);
      x.selling_price=Number(x.selling_price);
  })
  return (
    <div className='container '>
      {
        data.length > 0 ? 
        (
         <Sortedproduct data={data}/>
  
        ) :
        (
          <div>
            Something went wrong
          </div>
        )
      }
    </div>
  );
};
  
export default Dashboard;
