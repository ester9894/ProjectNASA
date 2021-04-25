import Joi from "joi-browser";
import React from "react"; 
import * as userService from "../services/userService";
import Form from "./Form";
// import { auth } from "firebase";
import { connect } from "react-redux";
import {actions} from "../redux/actions";
// import base from "../Firebase";

const mapDispatchToProps = (dispatch) => ({
  setUserName: (name) => dispatch(actions.setUserName(name)),
});

export default connect(
  null,
  mapDispatchToProps
)(
  class RegisterForm extends Form {
    setUserName = this.props.setUserName;
    state = { data: { name: "", email: "", password: "" }, errors: {} };

    schema = {
      name: Joi.string().required().label("Name"),
      email: Joi.string().email().required().label("email"),
      password: Joi.string().min(5).required().label("Password"),
    };

    doSubmit = async () => {
      const {name, email, password } = this.state.data;
      try {
        // await base.auth().createUserWithEmailAndPassword(email, password);
        const { data } = await userService.register(this.state.data);
        const { jwt, name } = data;
        if (jwt) this.setUserName(name);
        localStorage.setItem("token", jwt);
        this.props.history.push("/thePicture");
      } catch (ex) {
        alert(ex);
        if (ex.response && ex.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.username = ex.response.data;
          this.setState({ errors });
        }
      }
    };
    render() {
      return (
        <div className="login">
          <br />
          <form className="inner" onSubmit={this.handleSubmit}>
            <h3>Register</h3>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
          </form>
          <br />
        </div>
      );
    }
  }
);