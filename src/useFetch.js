import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Something went wrong.');
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel fetch on unmount (optional)
    return () => {};
  }, [url]);

  const fetchDataAgain = () => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Something went wrong.');
        setLoading(false);
      });
  };

  const postData = async (dataToSend) => {
    setLoading(true);
    try {
      const response = await axios.post(url, dataToSend);
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong.');
      setLoading(false);
    }
  };

  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, error, loading, fetchDataAgain, postData };
};

export default useFetchData;
