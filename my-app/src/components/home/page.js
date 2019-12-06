import React, { Component } from "react";
import Navbar from "../navbar/page";
import { group } from "../../utils/home";
import { Spin } from "react-loading-io";
import "./style.css";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null, loading: true, filtercountry: -1 };
  }
  componentDidMount() {
    group().then(data => {
      if (data != false)
        this.setState({ ...this.state, data: data.data, loading: false, filterStatus: -1 });
    });

  }
  onChange = event => {
    var target = event.target;
    var name = target.name;
    console.log(name);
    var value = target.type === "checkbox" ? target.checked : target.value;
    console.log(value);
    this.setState(
      {
        [name]: value
      },
      () => {
        if (this.state.filtercountry != -1) {
          const dataChunk = [];
          let chunk = [];
          const chunkSize = 2;
          const length = this.state.data.res1.length;
          for (let i = 0; i < length; i++) {
            if (
              chunk.length < chunkSize &&
              this.state.data.res1[i].country == this.state.filtercountry
            ) {
              chunk.push(this.state.data.res1[i]);
            }
            if (chunk.length == chunkSize || i == length - 1) {
              dataChunk.push(chunk);
              chunk = [];
            }
          }
          this.state.data = { ...this.state.data, chunks: dataChunk };
          this.setState({ ...this.state });
        } else {
          const { data } = JSON.parse(localStorage.getItem("data"));
          this.setState({ data: data });
        }
      }
    );
  };
  toChat = () => {
    this.props.history.push('group/')

  }
  render() {
    if (this.state.loading) {
      return <Spin size={64} />;
    } else {
      return (
        <div>
          <Navbar fullname={this.state.data.user.fullname} ></Navbar>
          <div className="col-md-12">
            <form action="#" method="post" id="frmSearch">
              <div className="form-group ad-30">
                <div className="input-group search-style">
                  <input
                    className="form-control new-search-bar"
                    name="country"
                    id="search"
                    placeholder="Enter Your Club Name"
                    type="text"
                  />
                  <span className="input-group-btn">
                    <button className="btn input-btn" type="submit" id="search-form">
                      Search
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-12">
            <div className="">
              <div className="row">
                <div className="col-md-3">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="filter-container">
                        <div className="card">
                          <form action="#" method="post" id="frmFilter">
                            <div className="content">
                              <p className="filter">FILTER</p>
                              <hr />
                              <select
                                className="form-control"
                                name="filtercountry"
                                id="country"
                                value={this.state.filtercountry}
                                onChange={this.onChange}
                              >
                                <option value={-1}>Filter By Country</option>
                                {this.state.data.country.map((val, index) => {
                                  return (
                                    <option key={index} value={val._id}>
                                      {val._id}
                                    </option>
                                  );
                                })}
                              </select>
                              {/* <div className="clearfix"></div>
                              <button className="btn add-apply">Apply</button> */}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-9">
                  <div>
                    {this.state.data.chunks.map((chunk, index) => {
                      return (
                        <div className="category-list" key={index}>
                          <div className="row">
                            {chunk.map((val, index) => {
                              return (
                                <form
                                  action="/home"
                                  method="post"
                                  id="Favorite"
                                  name={val.country}
                                  className="col-md-6"
                                  key={index}
                                >
                                  <div className="item">
                                    <a
                                      href={`/group/?gn=` + val.name}
                                      style={{ textDecoration: "none" }}
                                    //onClick={() => this.toChat()}
                                    >
                                      <div className="thumbnail">
                                        <div
                                          className="img"
                                          style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${val.image})`
                                          }}
                                        ></div>

                                        <div className="caption">
                                          <h4>
                                            {val.name} ({val.fans.length})
                                          </h4>

                                          <div className="row">
                                            <div className="col-xs-12 col-md-6">
                                              <p>{val.country}</p>
                                            </div>

                                            <div className="col-xs-12 col-md-6">
                                              <button className="btn add-fav">
                                                Add To Favorite
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </form>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
