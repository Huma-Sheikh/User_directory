import React from "react";
import { User } from "../App";
import "./UserCard.css";

interface Props {
  user: User;
  onViewMore: (user: User) => void;
}

const UserCard: React.FC<Props> = ({ user, onViewMore }) => {
  const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="glass-card">
     

      <div className="glass-avatar-wrapper">
        <img src={user.avatar} alt="Avatar" className="glass-avatar" />
      </div>
      <h2 className="glass-name">
        {user.firstname} {user.lastname}
      </h2>

 <div className="glass-role">{user.role}</div>
      
     <p className="glass-description" title={user.description}>
  {truncate(user.description, 70)}
</p>

      <div className="glass-join-info">
        <span className="glass-join-label">📅 Joined</span>
        <span className="glass-join-date">{user.join_date}</span>
      </div>

      <button className="glass-btn" onClick={() => onViewMore(user)}>
        View More →
      </button>
    </div>
  );
};

export default UserCard;
