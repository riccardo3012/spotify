import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Player from "../redux/reducers/player";
import Topbar from "./Topbar";
import HomeContent from "./HomeContent";
import { useSelector } from "react-redux";

const Home = ({ query }) => {
  const [songs, setSongs] = useState([]);
  const { search, searchQuery } = useSelector((state) => state.search);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHomeContent = async (query) => {
    setIsLoading(true);
    try {
      let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);

      if (response.ok) {
        let data = await response.json();
        setSongs(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeContent(query);
  }, [query]);

  return (
    <>
      {songs && (
        <Container fluid className="container-fluid">
          <Row className="row">
            <Sidebar />
            <div className="col-12 col-md-9 offset-md-3 mainPage">
              <Topbar />

              <div className="row">
                <div className="col-10">
                  {isLoading && (
                    <Col xs={12} className="d-flex justify-content-center align-items-center pt-5 mt-5">
                      <Spinner className="" variant="primary"></Spinner>
                    </Col>
                  )}
                  <div id="searchResults" style={{ display: "none" }} className="">
                    <h2>Search Results</h2>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                      {search && <HomeContent query={searchQuery} data={songs} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div id="rock">
                    <h2>Rock Classics</h2>
                    {isLoading && (
                      <Col xs={12} className="d-flex justify-content-center align-items-center pt-5 ">
                        <Spinner className="" variant="primary"></Spinner>
                      </Col>
                    )}
                    <div
                      className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                      id="rockSection"
                    >
                      {<HomeContent query={"#rockSection"} data={songs} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div id="pop">
                    <h2>Pop Culture</h2>
                    {isLoading && (
                      <Col xs={12} className="d-flex justify-content-center align-items-center pt-5 ">
                        <Spinner className="" variant="primary"></Spinner>
                      </Col>
                    )}
                    <div
                      className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                      id="popSection"
                    >
                      {<HomeContent query={"#popSection"} data={songs} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div id="hiphop">
                    <h2>#HipHop</h2>
                    {isLoading && (
                      <Col xs={12} className="d-flex justify-content-center align-items-center pt-5 ">
                        <Spinner className="" variant="primary"></Spinner>
                      </Col>
                    )}
                    <div
                      className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                      id="hipHopSection"
                    >
                      {<HomeContent query={"#hipHopSection"} data={songs} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      )}
      <Player />
    </>
  );
};

export default Home;
