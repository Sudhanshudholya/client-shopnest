import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    if (!user || user?.user?.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API}/analytics`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          cache: "no-store",
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate("/login");
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src="/Logo.png" alt="Logo" className="dashboard-logo" />

        <div>
          <h2>Admin Dashboard</h2>
          <p>
            Welcome back, <span>{user?.user?.name}</span>
          </p>
        </div>
      </div>

      {stats ? (
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h4>Total Orders</h4>
            <div className="dashboard-number">{stats.totalOrders}</div>
          </div>

          <div className="dashboard-card">
            <h4>Total Products</h4>
            <div className="dashboard-number">{stats.totalProducts}</div>
          </div>

          <div className="dashboard-card">
            <h4>Total Users</h4>
            <div className="dashboard-number">{stats.totalUsers}</div>
          </div>

          <div className="dashboard-card">
            <h4>Total Revenue</h4>
            <div className="dashboard-number">
              ₹{stats.totalRevenue.toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-text">
          Loading metrics...
        </div>
      )}

      <div className="admin-controls">
        <h3>Administrative Controls</h3>

        <div className="control-buttons">
          <button
            className="btn"
            onClick={() => navigate("/admin/add-product")}
          >
            + Add Product
          </button>

          <button
            className="btn secondary-btn"
            onClick={() => navigate("/admin/products")}
          >
            📦 Manage Products
          </button>

          <button
            className="btn secondary-btn"
            onClick={() => navigate("/admin/orders")}
          >
            🚚 Manage Orders
          </button>

          <button
            className="btn secondary-btn"
            onClick={() => navigate("/admin/users")}
          >
            👥 Users Directory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;