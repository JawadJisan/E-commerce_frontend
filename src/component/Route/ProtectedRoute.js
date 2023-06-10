import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state?.user
  );

  // (loading === false && isAuthenticated === false) ?
  if (isAdmin === true && user?.role === "admin") {
    return children;
  }
  if (isAdmin === false && user?.role === "user") {
    return <Navigate to="/login" />;
  }

  if (loading === false && isAuthenticated === false) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }

  // if (loading === false && isAuthenticated === false) {
  // }

  // return (
  //     <>
  //         {loading === false && (
  //             if(isAuthenticated)
  //         )}

  //         {/* {loading === false && (
  //             <Route
  //                 {...rest}
  //                 render={(props) => {
  //                     if (isAuthenticated === false) {
  //                         // return <Redirect to="/login" />;
  //                         return <Route path="/" element={<Navigate replace to="/login" />} />
  //                     }

  //                     if (isAdmin === true && user.role !== "admin") {
  //                         return <Route path="/" element={<Navigate replace to="/login" />} />
  //                     }

  //                     return <Component {...props} />;
  //                 }}
  //             />
  //         )} */}
  //     </>
  // );
};

export default ProtectedRoute;
