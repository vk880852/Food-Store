import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  console.log(productId);
  const [product, setProduct] = useState(null);
  const [loading, setLoading]=useState(false);
  console.log(productId);
  const [showProduct, setShowProduct] = useState({
    allergen_info: false,
    description: false,
    cooking_instruction: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://frontend-assessment-server.onrender.com/api/products/${productId}`
        ); 
        setProduct(response.data);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [productId]);

  const changeHandle = (e) => {
    const { name } = e.target;
    setShowProduct({ ...showProduct, [name]: !showProduct[name] });
  };

  return (
    <div className="container">
      <h3 className="text-center">Welcome to the Product Page</h3>
      {!loading ?<p>Loading...</p>:product && (
        <div className="card mt-3">
          <div className="card-header">{product.name}</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <img src={product.productImage} className="img-fluid" alt="Product" />
              </div>
              <div className="col-md-6">
                <h4 className="mb-3">Price: ${product.selling_price}</h4>
                <button name="allergen_info" value={showProduct.allergen_info} className="mb-3 btn btn-primary" onClick={changeHandle}>
                  Allergen Info:
                </button>
                {showProduct.allergen_info && <p>allergen_info:{product.allergen_info}</p>}
                <button name="description" value={showProduct.description} className="mb-3 btn btn-primary" onClick={changeHandle}>
                  Description:
                </button>
                {showProduct.description && <p>Description:{product.description}</p>}
                <button name="cooking_instruction" value={showProduct.cooking_instruction} className="mb-3 btn btn-primary" onClick={changeHandle}>
                  Cooking Instruction:
                </button>
                {showProduct.cooking_instruction && <p>Cooking_instruction:{product.cooking_instruction}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
