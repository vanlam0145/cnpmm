import "./group.css";

import queryString from "query-string";
import React, { Component } from "react";

import Messages from "./messenger";
import io from "socket.io-client";

import Navbar from "../navbar/page";
export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
      filtercountry: -1,
      groupname: queryString.parse(this.props.location.search).gn,
      ENDPOINT: "http://localhost:4000",
      response: "",
      message: [],
    };
    this.socket = null;
  }

  componentWillMount(e) {
    const user = JSON.parse(localStorage.getItem("data")).data.user
    const { ENDPOINT } = this.state;
    this.socket = io(ENDPOINT);
    this.socket.on('connect', () => {
      const params = {
        room: this.state.groupname,
        name: user.fullname
      }
      this.socket.emit('join', params, () => {
        console.log('User has join this channel');
      })
    });
    this.socket.on('newMessage', (message) => {
      this.addMessage(message);
    })
    this.setState({ loading: false, filterStatus: -1 });

  }
  addMessage = (Me) => {
    this.state.message.push({ text: Me.text, user: Me.from });
    console.log(this.state.message);
    this.setState({ message: [...this.state.message] });
  };
  sendnewMessage = (e) => {
    e.preventDefault();
    const message = {
      text: e.target.msg.value,
      room: this.state.groupname,
      from: JSON.parse(localStorage.getItem("data")).data.user.email,
      fromimage: JSON.parse(localStorage.getItem("data")).data.user.userImage
    }
    if (e.target.msg.value) {
      this.socket.emit("createMessage", message, () => {
        console.log("nt")
      }); //gửi event về server
      e.target.msg.value = "";
    }
  }
  render() {
    return (
      <div  >
        <Navbar fullname={JSON.parse(localStorage.getItem("data")).data.user.email}></Navbar>
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="chat_container">
              <div className="row">
                <div className="col-sm-4 col-md-3 mob-clearfix">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card-container">
                        <div className="card">
                          <div className="front">
                            <div className="cover"></div>
                            <div className="user cover-img">
                              {/* <% if(user.userImage){ %> */}
                              {/* <img src="" className="img-circle" alt=""/> */}
                              {/* <% }else{ %> */}
                              <img
                                src="http://placehold.it/300x300"
                                className="img-circle"
                                alt=""
                              />
                              {/* <% }%> */}
                            </div>
                            <div className="content">
                              <div className="main">
                                <h3 className="name">{JSON.parse(localStorage.getItem("data")).data.user.fullname}</h3>
                                <p className="profession-online">
                                  <i className="fa fa-circle online" aria-hidden="true"></i>
                                  Online
                                </p>
                                <p className="text-center">Mantra</p>
                              </div>
                              <div className="footer">
                                <i className="fa fa-mail-forward"></i>
                                <a href="#">View My Profile</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: "10px" }}>
                    <div className="col-md-12">
                      <div className="card-container">
                        <div className="card">
                          <div className="front">
                            <div className="content main-scroll">
                              <div className="main" id="main_scroll">
                                <p className="friends" style={{ marginBottom: "0px" }}>
                                  Online Friends <span id="numOfFriends"></span>
                                </p>
                                <hr style={{ marginTop: "10px" }} />
                                {/* <% if(data.friendsList.length>0){ %>
                                                    <% _.forEach(data.friendsList,function(fr){ %> */}
                                <div className="fr" hidden>
                                  ahha
                                </div>
                                {/* <% }) %>
                                                    <% } %> */}
                                <div className="onlineFriends"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-5 col-md-6 message_section">
                  <div className="row">
                    <div className="new_message_head">
                      <div className="pull-left">
                        <button className="club_name">
                          {this.state.groupname}
                          {/* <%= groupName%> */}
                        </button>
                      </div>
                      <div className="pull-right"></div>
                    </div>

                    <div className="chat_area">
                      <ul id="messages" className="list-unstyled">
                        <Messages messages={this.state.message} name={JSON.parse(localStorage.getItem("data")).data.user.email} />
                      </ul>
                    </div>

                    <div className="message_write">
                      <form id="message-form" onSubmit={this.sendnewMessage}>
                        {/* <input type="hidden" id="groupName" value="<%= groupName %>">
                                    <input type="hidden" id="sender" value="<%= user.username||user.fullname %>">
                                    <input type="hidden" id="senderImage" value="<%= user.userImage%>"> */}
                        <textarea
                          className="form-control"
                          name="message"
                          id="msg"
                          placeholder="Type a message"
                        ></textarea>
                        {/* <div className="clearfix"></div> */}
                        <div className="chat_bottom">
                          <button
                            id="send-message"
                            type="submit"
                            className="pull-right btn btn-primary"
                            style={{ background: "#4aa1f3", border: "#4aa1f3" }}
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-sm-3 col-md-3 mob-50 mob-clearfix">
                  <div className="new_message_head">
                    <div className="pull-left">
                      <button className="club_fans">
                        <i
                          className="fa fa-users"
                          aria-hidden="true"
                          style={{ paddingRight: "15px", color: "#4aa1f3 !important" }}
                        ></i>
                        Online Club Fans <span id="numValue"></span>
                      </button>
                    </div>
                  </div>

                  <div className="gr-rightsidebar">
                    <div id="myModal" className="modal fade" role="dialog">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                              &times;
                            </button>
                            <h3 className="modal-title" id="name"></h3>
                          </div>
                          <div className="modal-body">
                            <form action="" method="post" id="add_friend">
                              {/* <input type="hidden" name="receiverName" id="receiverName" value="">
                                                <input type="hidden" name="sender-name" id="sender-name" value="
                                                <%= user.username %>"> */}
                              <button type="submit" id="friend-add" className="btn add">
                                <i className="fa fa-user"></i> Add Friend
                              </button>

                              <a id="nameLink" className="btn ">
                                View Profile
                              </a>

                              <div id="myTest"></div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn_close" data-dismiss="modal">
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12" id="main">
                      <div id="users"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
