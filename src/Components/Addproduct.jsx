import React, { useState } from 'react';
import useFetchData from '../useFetch.js'

const Addproduct = () => {
  const { loading, error, postData } = useFetchData('https://frontend-assessment-server.onrender.com/api/products');

  const [value, setValue] = useState({
    name: '',
    description: '',
    allergen_info: ''
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData(value);
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h3 className="text-center my-3 fs-4">Add Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="name"
            value={value.name}
            onChange={handleChange}
            className="form-control"
            id="productName"
            placeholder="Enter Product Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description</label>
          <input
            type="text"
            className="form-control"
            id="productDescription"
            placeholder="Product Description"
            name="description"
            value={value.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="allergenInfo">Product Allergen Info</label>
          <input
            type="text"
            name="allergen_info"
            value={value.allergen_info}
            placeholder="Product Allergen Info"
            onChange={handleChange}
            className="form-control"
            id="allergenInfo"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
