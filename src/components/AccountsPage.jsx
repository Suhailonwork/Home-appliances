import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountsPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          "http://localhost/summit_home_appliancies/php_controllar/contraollers/getUserInfo.php",
          {
            withCredentials: true, // important to send cookies/session
          }
        );

        if (res.data.status === "success") {
          setUserInfo(res.data.data);
        } else {
          setMsg(res.data.message || "Failed to fetch user info.");
        }
      } catch (error) {
        console.error(error);
        setMsg("Something went wrong while fetching user info.");
      }
    };

    fetchUserInfo();
  }, []);

  if (msg) {
    return <p style={{ color: "red" }}>{msg}</p>;
  }

  if (!userInfo) {
    return <p>Loading your info...</p>;
  }

  return (
    <div>
      <h2>Welcome, {userInfo.name}</h2>
      <p>
        <strong>Contact:</strong> {userInfo.contact}
      </p>
      <p>
        <strong>email:</strong> {userInfo.email}
      </p>
      <p>
        <strong>Address:</strong> {userInfo.address}
      </p>
    </div>
  );
};

export default AccountsPage;
