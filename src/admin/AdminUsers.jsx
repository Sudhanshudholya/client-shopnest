import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/adminUsers.css";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const API = import.meta.env.VITE_API;
  
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${API}/auth/users`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="admin-users-container">
      <h2 className="users-title">User Directory</h2>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>JOINED</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u._id.substring(0, 8)}...</td>

                <td>{u.name}</td>

                <td>{u.email}</td>

                <td>
                  <span
                    className={
                      u.role === "admin"
                        ? "role-badge admin-role"
                        : "role-badge user-role"
                    }
                  >
                    {u.role.toUpperCase()}
                  </span>
                </td>

                <td>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;