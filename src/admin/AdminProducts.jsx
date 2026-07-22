import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/adminProducts.css"

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product deleted successfully.",
        });
      }
    }
  };

  return (
    <div className="admin-products-container">
      <div className="admin-products-header">
        <h2>Manage Products</h2>

        <Link to="/admin/add-product" className="add-product-btn">
          + Add Product
        </Link>
      </div>

      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>STOCK</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id.substring(0, 8)}...</td>

                <td>{product.name}</td>

                <td>₹{product.price.toFixed(2)}</td>

                <td>{product.category}</td>

                <td>{product.stock}</td>

                <td className="action-buttons">
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;