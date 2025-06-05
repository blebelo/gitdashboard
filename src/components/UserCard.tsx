import React from "react";
import './UserCard.css'
import type {IUserProps}  from "../utils/types";

const UserCard: React.FC<IUserProps> = ({ login, avatar_url, profileLink }) => {
    return(
        <div className="userCard"> 
            <img src={avatar_url} alt="User avatar"/>
            <h2>{login}</h2>
            <div className="buttons">
                <a href={profileLink}>View Profile</a>
                <img src='src\assets\heart-icon.png' alt='Fav' />
            </div>
        </div>
    );
}
export default UserCard;