import React from "react";
import { User } from "../type";
import { STRINGS } from "../utilis/string";
import { getSafeAvatar } from "../utilis/functions";
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
          {STRINGS.MODAL_CLOSE_ICON}
        </button>

        <div className="designer-modal-content">
          {/* Left Side */}
          <div className="designer-modal-left">
            <h1>
              {user?.firstname} {user?.lastname}
            </h1>
            <p className="join-date">
              {STRINGS.JOINED_LABEL} {user?.join_date}
            </p>
            <h1>{STRINGS.DESCRIPTION_LABEL}</h1>
            <p className="description"  data-testid="user-description">{user?.description}</p>
            <p className="email">
              {STRINGS.EMAIL_ICON} <a href={`mailto:${user?.email}`} className="email-link">
  {user?.email}
</a>
            </p>
          </div>

          {/* Right Side */}
          <div className="designer-modal-right">
            <div className="card card-middle">
              <img src={getSafeAvatar(user?.avatar)} alt="Avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
