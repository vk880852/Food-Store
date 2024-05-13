import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://frontend-assessment-server.onrender.com/api/products");
        const sortedProducts = res.data.sort((a, b) => a.selling_price - b.selling_price);
        setNewProducts(sortedProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productHandler = (id) => {
    navigate(`/products/${id}`);
  };

  const addProduct = () => {
    navigate("/addproduct");
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">New Products</h1>
      <div className="row">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <Skeleton height={200} />
                <div className="card-body">
                  <Skeleton count={2} />
                </div>
              </div>
            </div>
          ))
        ) : (
          newProducts.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <img src={product.productImage} className="card-img-top" alt="Product" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ${product.selling_price}</p>
                  <button onClick={() => productHandler(product.id)} className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
