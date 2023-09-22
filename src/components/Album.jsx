import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFavouriteSong, setRemoveFavouriteSong } from "../redux/reducers/favorite";

import Player from "../redux/reducers/player";

const Album = () => {
  const params = useParams();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const favourite = useSelector((state) => state.favourite);

  const fetchAlbumContent = async (albumId) => {
    setIsLoading(true);
    try {
      let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${params.albumId}`);

      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setAlbum(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbumContent();
  });

  const handleClickFavourite = (el) => {
    dispatch(setFavouriteSong(el));
  };

  const handleClickRemoveFavourite = (el) => {
    dispatch(setRemoveFavouriteSong(el));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-12 col-md-9 offset-md-3 mainPage">
            <Topbar />

            {}
            {isLoading && (
              <div className="d-flex justify-content-center align-items-center pt-5 mt-5">
                <Spinner className="" variant="primary"></Spinner>
              </div>
            )}
            {!isLoading && (
              <div className="row">
                <div className="col-md-3 pt-5 text-center" id="img-container">
                  {album && (
                    <>
                      <img src={album.cover_big} className="card-img" alt="album-cover" />
                      <div className="mt-4 text-center">
                        <p className="album-title">{album.title}</p>
                      </div>
                      <div className="text-center">
                        <p className="artist-name">{album.artist.name}</p>
                      </div>
                    </>
                  )}
                </div>
                {}
                <div className="col-md-8 p-5">
                  <div className="row">
                    <div className="col-md-10 mb-5" id="trackList">
                      {album &&
                        album.tracks.data.map((track) => {
                          return (
                            <Container className="py-3 trackHover" key={track.id}>
                              <Row>
                                {console.log(favourite)}
                                {!favourite.includes(track.id) ? (
                                  <Col>
                                    <img
                                      //src={like}
                                      alt="..."
                                      className="favourite-btn"
                                      style={{ width: "2rem" }}
                                      onClick={() => {
                                        handleClickFavourite(track.id);
                                      }}
                                    />
                                  </Col>
                                ) : (
                                  <Col>
                                    <img
                                      // src={like}
                                      alt="..."
                                      className="favourite-btn"
                                      style={{ width: "2rem" }}
                                      onClick={() => {
                                        handleClickRemoveFavourite(track.id);
                                      }}
                                    />
                                  </Col>
                                )}

                                <Col xs={6} className="text-truncate">
                                  <a href="#/" className="card-title trackHover px-3 " style={{ color: "white" }}>
                                    {track.title}
                                  </a>
                                </Col>
                                <Col>
                                  <small className="duration" style={{ color: "white" }}>
                                    {new Date(track.duration * 1000).toLocaleTimeString([], {
                                      minute: "2-digit",
                                      second: "2-digit",
                                    })}{" "}
                                  </small>
                                </Col>
                              </Row>
                            </Container>
                          );
                        })}
                      ;
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Player />
    </>
  );
};

export default Album;
