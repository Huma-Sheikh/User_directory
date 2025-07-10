import React from "react";
import { User } from "../type";
import { STRINGS } from "../utilis/string";
import { truncate } from "../utilis/functions"; // ✅ import function
import "./UserCard.css";
import Image from "../assets/Image_not_available.png";

interface Props {
  user: User;
  onViewMore: (user: User) => void;
}

const UserCard: React.FC<Props> = ({ user, onViewMore }) => {
  return (
    <div className="glass-card">
      <div className="glass-avatar-wrapper">
        <img src={user?.avatar || Image} alt="Avatar" className="glass-avatar" />
      </div>

      <h2 className="glass-name">
        {user?.firstname} {user?.lastname}
      </h2>

      <div className="glass-role">{user?.role}</div>

      <p className="glass-description" title={user?.description}>
        {truncate(user?.description, 70)} 
      </p>

      <div className="glass-join-info">
        <span className="glass-join-label">{STRINGS?.JOINED_LABEL}</span>
        <span className="glass-join-date">{user?.join_date}</span>
      </div>

      <button className="glass-btn" onClick={() => onViewMore(user)}>
        {STRINGS?.VIEW_MORE}
      </button>
    </div>
  );
};

export default UserCard;
