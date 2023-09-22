import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setQuery, setSearch } from "../redux/reducers/search";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setSearch(true));
    dispatch(setQuery(searchQuery));
  };

  return (
    <>
      <Col className="col-2">
        <nav className="navbar navbar-expand-md navbar-white bg-navbar fixed-left justify-content-between" id="sidebar">
          <div className="nav-container">
            <Link to={"/"} className="navbar-brand">
              <img alt="error" width="131" height="40" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <ul>
                  <li>
                    <Link to={"/"} className="nav-item nav-link">
                      <i className="fas fa-home fa-lg"></i>&nbsp; Home
                    </Link>
                  </li>
                  <li>
                    <a className="nav-item nav-link" href="#/">
                      <i className="fas fa-book-open fa-lg"></i>&nbsp; Your Library
                    </a>
                  </li>
                  <li>
                    <div className="input-group mt-3">
                      <input
                        type="text"
                        className="form-control mb-2"
                        id="searchField"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                      />
                      <div className="input-group-append" style={{ marginBottom: "4%" }}>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          id="button-addon1"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          GO
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="nav-btn">
            <button className="btn signup-btn" type="button">
              Sign Up
            </button>
            <button className="btn login-btn" type="button">
              Login
            </button>
            <a href="#">Cookie Policy</a> |<a href="#"> Privacy</a>
          </div>
        </nav>
      </Col>
    </>
  );
};

export default Sidebar;
