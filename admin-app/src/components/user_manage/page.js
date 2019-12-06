import React, { Component } from "react";
import Navbar from "../navbar/page";
import * as user_manage from "../../utils/user_manage";
class page extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], newUsername: "", password: "" };
  }
  async componentDidMount() {
    console.log("hello");
    const result = await user_manage.user_manage_getData();
    console.log("ket qua la day: ", result);
    this.setState({ users: result });
  }
  clickAdd = () => {
    console.log("hello");
  };
  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    console.log("vao day");
    const { newUsername, password } = this.state;
    var user = { username: newUsername, password: password };
    const response = await user_manage.user_manage_addnew(user);
    const result = await user_manage.user_manage_getData();
    console.log("ket qua la day: ", result);
    this.setState({ users: result, newUsername: "", password: "" });

    // console.log(newUsername, password);
  };
  onBlock = async data => {
    console.log(data);
    const response = await user_manage.user_manage_block(data);
    const result = await user_manage.user_manage_getData();
    console.log("ket qua la day: ", result);
    this.setState({ users: result });
  };
  onDelete = async id => {
    const response = await user_manage.user_manage_delete(id);
    const result = await user_manage.user_manage_getData();
    console.log("ket qua la day: ", result);
    this.setState({ users: result });
  };
  renderUser = users => {
    let xhtml = null;
    if (this.state.users !== undefined) {
      xhtml = users.map((user, index) => {
        const userBlock = { id: user._id, block: user.block };
        return (
          <React.Fragment>
            <tr>
              <th scope="row" style={{ textAlign: "center" }}>
                {index + 1}
              </th>
              <td>{user.fullname!==""?user.fullname:user.email}</td>
              <td>{user.facebook}</td>
              <td>
                <button
                  type="button"
                  className={
                    user.block === false ? "btn btn-danger" : "btn btn-success"
                  }
                  //className="btn btn-success"
                  style={{ margin: "0 1%" }}
                  onClick={() => this.onBlock(userBlock)}
                >
                  {user.block === false ? "Block" : "Unblock"}
                </button>
                <button
                  type="button"
                  class="btn btn-warning"
                  style={{ margin: "0 1%" }}
                  onClick={() => this.onDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </React.Fragment>
        );
      });
    }
    return xhtml;
  };
  render() {
    return (
      <div>
        <Navbar />
        <div style={{ margin: "3%" }}>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
            style={{ float: "left", marginBottom: "1%" }}
          >
            Add new user
          </button>

          {/* Modal */}
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <form onSubmit={this.handleSubmit}>
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add new user
                    </h5>
                  </div>
                  <div class="modal-body">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                      name="newUsername"
                      value={this.state.newUsername}
                      onChange={this.onChange}
                      style={{ marginBottom: "1%" }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  #
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  FullName
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  FaceBook
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{this.renderUser(this.state.users)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default page;
