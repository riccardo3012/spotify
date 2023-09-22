import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/Error";
import Album from "./components/Album";
import Artist from "./components/Artist";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/:albumId" element={<Album />} />
          <Route path="/artist/:artistId" element={<Artist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
