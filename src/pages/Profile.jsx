import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch(`${API}/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }

          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      {/* Header */}

      <div className="profile-header">
        <div className="profile-title">
          <h2>My Profile</h2>

          <p>
            <strong>Name :</strong> {user.user.name}
          </p>

          <p>
            <strong>Email :</strong> {user.user.email}
          </p>

          <span className="profile-badge">{user.user.role.toUpperCase()}</span>
        </div>

        <button onClick={handleLogout} className="btn logout-btn">
          Logout
        </button>
      </div>

      {/* Orders */}

      <h3 className="order-heading">Order History</h3>

      {loading ? (
        <p className="loading-text">Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <p>You haven't placed any orders yet.</p>

          <Link to="/shop" className="btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-info">
                <p>
                  <strong>Order ID :</strong> <span>{order._id}</span>
                </p>

                <p>
                  <strong>Date :</strong>{" "}
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </p>

                <p>
                  <strong>Total :</strong>{" "}
                  <span className="order-total">
                    ₹{order.totalAmount.toFixed(2)}
                  </span>
                </p>
              </div>

              <div>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
