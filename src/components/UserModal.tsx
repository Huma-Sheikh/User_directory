import React from "react";
import { User } from "../App";
import "./Modal.css";

interface ModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<ModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="designer-modal-overlay">
      <div className="designer-modal-container">
        <button className="designer-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="designer-modal-content">
          
          {/* Left Side */}
          <div className="designer-modal-left">
            <h1>{user.firstname} {user.lastname}</h1>
            <p className="join-date">🗓️ Joined: {user.join_date}</p>
            <h1> Description </h1>
            <p className="description">{user.description}</p>
            <p className="email">📧 {user.email}</p>
          </div>

          <div className="designer-modal-right">
            

            <div className="card card-middle">
              <img src={user.avatar} alt="Avatar" />
            </div>

            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserModal;
