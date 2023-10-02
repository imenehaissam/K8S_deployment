import React, { useState, useEffect } from "react";
import axios from 'axios';
import './UserProfile.css';
import {env} from './env';

function UserProfile() {
  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "" });
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${env.REACT_APP_Backend_URL}/users`);
        setUserList(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, );

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${env.REACT_APP_Backend_URL}/users/${userId}`);
      const updatedUserList = userList.filter(user => user._id !== userId);
      setUserList(updatedUserList);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(`${env.REACT_APP_Backend_URL}/createuser`, newUser);
      setUserList([...userList, response.data]);
      setNewUser({ firstName: "", lastName: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-list-container">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-user">
        <input
          type="text"
          placeholder="First Name"
          value={newUser.firstName}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        />
        <button className="add-button" onClick={handleAddUser}>
          Add User
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
