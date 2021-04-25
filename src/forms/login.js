import React from "react";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import Form from "./Form";
import { connect } from "react-redux";
import {actions} from "../redux/actions";

import { Link } from "react-router-dom";
// import base from "../Firebase";

const mapDispatchToProps = (dispatch) => ({
  setUserName: (name) => dispatch(actions.setUserName(name)),
});

export default connect(
  null,
  mapDispatchToProps
)(
  class Login extends Form {
    setUserName = this.props.setUserName;
    state = { data: { name: "", password: "" }, errors: {} };

    schema = {
      name: Joi.string().required().label("name"),
      password: Joi.string().min(5).required().label("Password"),
    };

    doSubmit = async () => {
      const { name, password } = this.state.data;
      try {
        // await base.auth().signInWithEmailAndPassword(email, password);
        const { data } = await userService.login(this.state.data);
        const { jwt, name: myname } = data;
        if (jwt) this.setUserName(myname);
        localStorage.setItem("token", jwt);
        this.props.history.push("/thePicture");
      } catch (err) {
        alert("wrong password!");
        const user = { ...this.state.data };
        user.name = "";
        user.password = "";
        this.setState({ data: user });
      }
    };

    render() {
      return (
        <div className="login">
          <br />
          <form className="inner" onSubmit={this.handleSubmit}>
            <h3>Login</h3>
            {this.renderInput("name", "Name")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
            {/* <Link
              className="ms-auto p-2 bd-highlight forgot-password text-right"
              to="/register"
            >
       
              Register
            </Link> */}
          </form>
          <br />
        </div>
      );
    }
  }
);
