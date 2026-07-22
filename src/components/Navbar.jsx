import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa"
import "../styles/navbar.css";
import Logo from "../../public/Logo.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("User Logout successfully")
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <nav className="navbar">

        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>
            <img src={Logo} alt="ShopNest" />
            <span>ShopNest</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-links desktop-menu">

          <li>
            <Link to="/shop">Shop</Link>
          </li>

          <li>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart />
              <span className="cart-count">
                {cartItems.length}
              </span>
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/profile">
                  <FaUserCircle />
                  {user?.user?.name}
                </Link>
              </li>

              {user?.user?.role === "admin" && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}

              <li>
                <button
                  onClick={handleLogout}
                  className="btn-logout"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {/* Mobile Right Side */}
        <div className="mobile-icons">

          <Link to="/cart" className="mobile-cart">
            <FaShoppingCart />

            <span className="cart-count">
              {cartItems.length}
            </span>
          </Link>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </nav>

      {/* Mobile Drawer */}

      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>

        <div className="drawer-header">

          <img src={Logo} alt="logo" />

          <h2>ShopNest</h2>

        </div>

        {user && (
          <div className="drawer-user">

            <FaUserCircle size={45} />

            <h3>{user?.user?.name}</h3>

            <p>{user?.user?.email}</p>

          </div>
        )}

        <ul>

          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/shop" onClick={closeMenu}>
              Shop
            </Link>
          </li>

          <li>
            <Link to="/cart" onClick={closeMenu}>
              Cart ({cartItems.length})
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
              </li>

              {user?.user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                  >
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <button
                  className="drawer-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {!user && (
            <li>
              <Link
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>
            </li>
          )}

        </ul>

      </div>
    </>
  );
};

export default Navbar;