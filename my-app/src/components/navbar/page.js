import React, { Component } from "react";
import "../home/style.css";
// import { Dropdown } from 'react-bootstrap';
export default class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }
  componentDidMount() {}
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/home">
              Chat App
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right" id="reload">
              <li>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <span className="glyphicon fa fa-bell nav-glyphicon"></span>
                  {/* <b className="caret"></b> */}
                  {/* <% if(data.totalRequest>0){ %> */}
                  <span className="label label-primary nav-label-icon">hi</span>
                  {/* <% } else { %>
                        <span className="label label-primary nav-label-icon" style="display:none"></span>
                        <% }%> */}
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <div className="navbar-login" id="requestBar">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="dropdown-tag">
                            <h3 className="text-center dropdown-tag-head">Friend Requests</h3>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        {/* <% if(data.request.length>0){ %>
                                    <% _.forEach(data.request,function(val){%> */}
                        <div className="row">
                          <div className="col-md-3">
                            <p className="text-center">
                              <img
                                src="https://placehold.it/300x300"
                                className="img-circle img-responsive dropdown-img"
                                alt="avartar"
                              />
                            </p>
                          </div>
                          <div className="col-md-9 pleft-0">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="col-md-12">
                                  <p className="text-left">
                                    <strong id="">asdf</strong>
                                  </p>
                                </div>
                                <div className="col-md-12">
                                  <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                      <input
                                        type="hidden"
                                        name="senderId"
                                        id="senderId"
                                        value="<%= val.userId._id%>"
                                      />
                                      <input
                                        type="hidden"
                                        name="senderName"
                                        id="senderName"
                                        value="<%= val.username%>"
                                      />
                                      <button
                                        type="submit"
                                        name="accept"
                                        id="accept_friend"
                                        className="btn btn-default drop-accept accept"
                                      >
                                        <i className="fa fa-check" aria-hidden="true"></i>
                                        Accept
                                      </button>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                      <input
                                        type="hidden"
                                        name="user_Id"
                                        id="user_Id"
                                        value="<%= val.userId._id%>"
                                      />
                                      <button
                                        type="submit"
                                        name="cancel"
                                        className="btn drop-cancel remove"
                                        id="cancel_friend"
                                      >
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        {/* <% })%>
                                    <% } else{%> */}
                        {/* <p className="text-center">No friend request</p> */}
                        {/* <%}%> */}
                      </div>
                    </div>
                  </li>
                </ul>
              </li>

              <li>
                <a role="button" onClick={this.props.onLogout}>
                  Logout
                </a>
              </li>
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.props.fullname}
                  {/* <span className="caret"></span> */}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">Action</a>
                  </li>
                  <li role="separator" className="divider"></li>
                  <li>
                    <a href="#">Separated link</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
