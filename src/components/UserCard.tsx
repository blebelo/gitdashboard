import React from "react";
import './UserCard.css';
import type { IUserProps } from "../utils/types";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const UserCard: React.FC<IUserProps> = ({ login, avatar_url, profileLink, favorite,  onFavoriteToggle }) => {
    return (
        <div className="userCard">
            <img src={avatar_url} alt="User avatar" />
            <h2>{login}</h2>
            <div className="buttons">
                <a href={profileLink}>View Profile</a>
                {favorite ? (
                <HeartFilled
                    style={{ color: 'red', fontSize: '2.5rem' }}
                    onClick={onFavoriteToggle}
                />
                ) : (
                <HeartOutlined
                    style={{ color: 'red', fontSize: '2.5rem' }}
                    onClick={onFavoriteToggle}
                />
                )}

            </div>
        </div>
    );
};

export default UserCard;
