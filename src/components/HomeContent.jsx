import React from "react";
import { setPlay } from "../redux/reducers/player";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setFavouriteSong, setRemoveFavouriteSong } from "../redux/reducers/favorite";

const HomeContent = ({ data }) => {
  const dispatch = useDispatch();
  const favouriteSong = useSelector((state) => state.favourite);

  const handleClick = (el) => {
    dispatch(setPlay(el));
  };

  const handleClickFavourite = (el) => {
    dispatch(setFavouriteSong(el));
  };

  const handleClickRemoveFavourite = (el) => {
    dispatch(setRemoveFavouriteSong(el));
  };

  return (
    <>
      {data.slice(0, 6).map((track) => {
        return (
          <Container key={track.id}>
            <Col className="col text-center ">
              <Container className="position-relative overflow-hidden ">
                <img
                  className="img-fluid "
                  src={track.album.cover_medium}
                  alt={track.title}
                  onClick={() => {
                    handleClick(track);
                  }}
                />
                {!favouriteSong.includes(track.id) ? (
                  <img
                    // src={Hearth}
                    alt="..."
                    className="favourite-btn position-absolute w-25"
                    onClick={() => {
                      handleClickFavourite(track.id);
                    }}
                  />
                ) : (
                  <img
                    //src={HearthBroken}
                    alt="..."
                    className="favourite-btn position-absolute w-25"
                    onClick={() => {
                      handleClickRemoveFavourite(track.id);
                    }}
                  />
                )}
              </Container>
              <Container className="d-flex flex-column pt-1 pb-4">
                <Link className="text-truncate" to={`/album/${track.album.id}`}>
                  {track.album.title}
                </Link>
                <Link to={`/artist/${track.artist.id}`}>{track.artist.name}</Link>
              </Container>
            </Col>
          </Container>
        );
      })}
    </>
  );
};

export default HomeContent;
