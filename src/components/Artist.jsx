import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Player from "../redux/reducers/player";
import Topbar from "./Topbar";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";

const Artist = () => {
  const [artist, setArtist] = useState(null);
  const params = useParams();
  const [trackList, setTrackList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtistContent = async () => {
    setIsLoading(true);
    try {
      let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${params.artistId}`);

      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setArtist(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrackListContent = async (trackList) => {
    setIsLoading(true);
    try {
      let response = await fetch(trackList);

      if (response.ok) {
        let data = await response.json();
        console.log("data:", data);
        setTrackList(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistContent();
  });

  useEffect(() => {
    if (artist) {
      fetchTrackListContent(artist.tracklist);
    }
  }, [artist]);
  console.log("track:", trackList);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-12 col-md-9 offset-md-3 mainPage">
            <Topbar />

            {isLoading && (
              <div className="d-flex justify-content-center align-items-center pt-5 mt-5">
                <Spinner className="" variant="primary"></Spinner>
              </div>
            )}
            {!isLoading && (
              <>
                <div className="row">
                  <div className="col-12 col-md-10 col-lg-10 mt-5">
                    {artist && (
                      <>
                        <img className="mx-auto mb-3" src={artist.picture_big} alt={artist.name} />
                        <h2 className="titleMain">{artist.name}</h2>
                        <div id="followers">Followers: {artist.nb_fan}</div>
                      </>
                    )}
                    <div className="d-flex justify-content-center" id="button-container">
                      <button className="btn btn-success mr-2 mainButton d-none" id="playButton">
                        PLAY
                      </button>
                      <button className="btn btn-outline-light mainButton d-none" id="followButton">
                        FOLLOW
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-10 offset-1 col-md-10 col-lg-10 p-0">
                    <div className="mt-4 d-flex justify-content-start">
                      <h2 className="text-white font-weight-bold">Tracks</h2>
                    </div>
                    <div className="pt-5 mb-5">
                      <div className="row" id="apiLoaded">
                        {trackList && (
                          <>
                            {trackList.data.map((song) => {
                              return (
                                <>
                                  <Container fluid>
                                    <Row className="col-sm-auto col-md-auto  mb-5 align-items-center">
                                      <img className="img-fluid" src={song.album.cover_big} alt="img-cover" />

                                      <Row className="pl-1">
                                        <Col>
                                          <Link to={`/album/${song.album}`}>Album: {song.album.title}</Link>
                                        </Col>

                                        <Col xs={12}>
                                          <Link>Track: {song.title}</Link>
                                        </Col>
                                      </Row>
                                    </Row>
                                  </Container>
                                </>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Player />
    </>
  );
};

export default Artist;
