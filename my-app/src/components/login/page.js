import React, { Component } from "react";
import "./login.css";
import * as lg from "../../utils/login";
import queryString from "query-string";
import checkToken from "../../utils/CheckToken";
import { withRouter } from "react-router-dom";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: "",
      cbRemember: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("access_token", query.token);
      this.props.history.push("/home");
    }
    if (checkToken()) {
      this.props.history.push("/home")
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (e.target.name === "cbRemember") {
      this.setState({ cbRemember: !this.state.cbRemember });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password, cbRemember } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }
    console.log(username, password);
    this.setState({ loading: true });
    const islogin = await lg.login({ username, password, cbRemember });
    console.log(islogin);
    console.log("cooki: ", document.cookie);
    //const result = checkToken();
    console.log("checktoken: ", checkToken());
    if (checkToken() !== undefined) {
      this.props.history.push("/home");
    } else this.setState({ error: "dang nhap that bai", loading: false });
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
              <h3>Sign In</h3>
              {error(this.state.error)}
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
                    type="text"
                    className="form-control"
                    placeholder="username"
                    name="username"
                    value={this.state.username}
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
                    type="text"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={this.state.cbRemember}
                    onChange={event => this.handleChange(event)}
                    id="cbRemember"
                    name="cbRemember"
                  />
                  <label
                    class="form-check-label"
                    for="cbRemember"
                    style={{ marginLeft: "20px" }}
                  >
                    Remember me
                  </label>
                </div>

                {/* <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div> */}
                <div className="form-group">
                  <input
                    type="submit"
                    value="Login"
                    className="btn float-right login_btn"
                    disabled={this.state.loading}
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
                Don't have an account?<a href="/signup">Sign Up</a>
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
export default (LoginPage)
