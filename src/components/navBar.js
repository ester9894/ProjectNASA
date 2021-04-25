import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "../redux/actions";
// import base from "../Firebase";

const mapStateToProps = (state) => {
  return {
    name: state.userReducer.user.name,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUserName: (name) => dispatch(actions.setUserName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(function Navbar(props) {
    const {name, setUserName} = props;
    const logOut = () => {
    localStorage.removeItem("token");
    setUserName(null);
    // base.auth().signOut();
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="navbar-nav d-flex flex-row mb-1">
        {!name && (
          <>
         
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/signUp">
             Sign Up
            </NavLink>
          </>
        )}
        {name && (
          <>
            <div className="navbar-brand">{`Hello ${name}!  `}</div>
           
            <NavLink className="nav-item nav-link" to="/thePicture">
              Picture of the Day
            </NavLink>
            <NavLink className="nav-item nav-link" to="/myPictures">
              My Pictures
            </NavLink>
            <NavLink className="nav-item nav-link" onClick={logOut} to="/login">
              Log out
            </NavLink>
            <div className="navbar-brand m-1"></div>
          </>
        )}
      </div>
    </nav>
  );
});