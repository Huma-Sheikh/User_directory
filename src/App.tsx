import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import UserModal from "./components/UserModal";
import NavBar from "./components/NavBar";
import "./App.css";

export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  role: string;
  join_date: string;
  description: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users")
      .then((res) => {
        const userList = res.data.data.users;
        setUsers(userList);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleViewMore = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const displayedUsers =
    searchTerm.trim() === ""
      ? users
      : users.filter((user) => {
          const regex = new RegExp(searchTerm, "i");
          return regex.test(user.role?.toString() || "");
        });

  return (
    <div className="app-container">
      <NavBar isModalOpen={showModal} onSearchChange={setSearchTerm} />

      <div className="app-container" style={{ paddingTop: "80px" }}>
        {loading ? (
          <div className="loader-overlay">
            <div className="glass-loader"></div>
          </div>
        ) : displayedUsers.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            No users found matching your search.
          </p>
        ) : (
          <div className="grid">
            {displayedUsers.map((user) => (
              <UserCard key={user.id} user={user} onViewMore={handleViewMore} />
            ))}
          </div>
        )}

        {selectedUser && (
          <UserModal user={selectedUser} isOpen={showModal} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default App;
