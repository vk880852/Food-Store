import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sortedproduct = ({ data }) => {
  const [type, setType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedData, setSortedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const handleSort = (key) => {
    setType(key);
  };

  const productHandler = (id) => {
    navigate(`/products/${id}`);
  };

  const handleRemove = (id) => {
    setFilteredData(filteredData.filter((product) => product.id !== id));
  };

  useEffect(() => {
    const sortData = (data, key) => {
      if (key === 'selling_price' || key === 'id') {
        return [...data].sort((a, b) => a[key] - b[key]);
      } else {
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      }
    };

    const filterData = (data, term) => {
      return data.filter(
        (product) =>
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.id.toString().includes(term.toLowerCase())
      );
    };
    const sorted = sortData(data, type);
    setSortedData(sorted);

 
    const filtered = filterData(sorted, searchTerm);
    setFilteredData(filtered);
  }, [type, searchTerm, data]);

  return (
    <div className="container">
      <div className="container">
        <h1 className="text-center">Welcome to dashboard</h1>
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleSort('id')}
                  >
                    Sort by Id
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleSort('name')}
                  >
                    Sort by Name
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleSort('selling_price')}
                  >
                    Sort by Selling Price
                  </button>
                </th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.selling_price}</td>
                  <td>
                    <button
                      onClick={() => productHandler(product.id)}
                      className="btn btn-primary mr-2"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="btn btn-danger"
                    >
                      Check
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sortedproduct;
