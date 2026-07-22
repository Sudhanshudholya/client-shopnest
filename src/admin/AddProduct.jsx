import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import "../styles/addProduct.css";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user?.user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {return toast("Please select an image", {icon: "⚠️",});}

    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success("Product created successfully!");
        navigate("/shop");
      } else {
        toast.error(responseData.message || "Error creating product");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2>Add New Product</h2>

        <form className="add-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <textarea
            rows="5"
            placeholder="Description"
            required
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            required
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Category"
            required
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            required
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />

          <div className="upload-box">
            <label>Upload Product Image (Cloudinary)</label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="publish-btn" disabled={loading}>
            {loading ? "Uploading & Creating..." : "Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
