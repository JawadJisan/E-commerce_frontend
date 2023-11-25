import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  // const {
  //   user: newUer,
  //   loading,
  //   isAuthenticated,
  // } = useSelector((state) => state.user) || {};

  const userData = useSelector((state) => state.user.user);

  const shouldRefresh = localStorage.getItem("refreshAccountPage");

  console.log(shouldRefresh);

  const navigate = useNavigate();

  // const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // if (isAuthenticated === false) {
    //   navigate("/login");
    // }
    if (shouldRefresh === "true") {
      localStorage.removeItem("refreshAccountPage");
      window.location.reload();
    }
    if (!userData) {
      <Loader />;
    }
  }, [navigate, userData, shouldRefresh]);

  // window.onload = function () {
  //   window.location.reload();
  // };

  return (
    // <>{userData ? <p>{userData.name} </p> : <Loader />}</>
    <>
      {userData ? (
        <>
          <MetaData title={`${userData?.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={userData?.avatar?.url} alt={userData?.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{userData?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{userData?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(userData?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
