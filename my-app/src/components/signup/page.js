import React, { Component } from "react";
import "../login/login.css";
import * as lg from "../../utils/login";
import queryString from "query-string";
export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repassword: "",
      submitted: false,
      loading: false,
      errorpass: "",
      error: "",
      open: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //   componentDidMount() {
  //     var query = queryString.parse(this.props.location.search);
  //     if (query.token) {
  //       window.localStorage.setItem("access_token", query.token);
  //       this.props.history.push("/home");
  //     }
  //   }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      let errorpass = "";
      if (this.state.password != this.state.repassword) {
        errorpass = "hai mat khau khac nhau";
        this.setState({ errorpass: errorpass, open: true });
      } else {
        this.setState({ open: false });
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    console.log(email, password);
    // stop here if form is invalid
    if (!(email && password)) {
      return;
    }

    this.setState({ loading: true });
    const data = await lg.register({ email, password });
    if (data.code != 1) {
      alert("dang ky thanh cong");
      this.props.history.push("/login");
    } else alert(data.haha);
  }
  render() {
    const error = error => {
      if (this.state.error !== "")
        return (
          <div>
            <p style={{ color: "red" }}>{error}</p>
          </div>
        );
    };
    return (
      <div className="x">
        <div className="d-flex justify-content-center h-100">
          <div className="cardd">
            <div className="cardd-header">
              <h3>Register</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <a href="http://localhost:4000/auth/facebook">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </span>
                <span>
                  <a href="http://localhost:4000/auth/google">
                    <i className="fab fa-google-plus-square"></i>
                  </a>
                </span>
                <span>
                  <i className="fab fa-twitter-square"></i>
                </span>
              </div>
            </div>
            <div className="cardd-body">
              <form name="form" onSubmit={this.handleSubmit}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                {/* {error(this.state.error)} */}
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="repassword"
                    name="repassword"
                    value={this.state.repassword}
                    onChange={this.handleChange}
                  />
                </div>
                {error(this.state.errorpass)}
                {/* <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div> */}
                <div className="form-group">
                  <input
                    type="submit"
                    value="SignUp"
                    className="btn float-right login_btn"
                    disabled={this.state.open}
                  />
                  {this.state.loading && (
                    <img
                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      alt="loading"
                    />
                  )}
                </div>
              </form>
            </div>
            <div className="cardd-footer">
              <div className="d-flex justify-content-center links">
                You have an account?<a href="/login">SignIn</a>
              </div>
              {/* <div className="d-flex justify-content-center">
                <a href="/Forgot">Forgot your password?</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
