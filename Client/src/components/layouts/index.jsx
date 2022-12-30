import "bootstrap/dist/css/bootstrap.min.css";
import Sidenav from "./components/sidenav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardSearch from "../pages/boards";
import SavedBoards from "../pages/savedBoards";

function Layout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidenav />
        <div className="col">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BoardSearch/>}/>
                <Route path="/boards" element={<BoardSearch/>}/>
                <Route path="/savedBoards" element={<SavedBoards/>}/>
            </Routes>
         </BrowserRouter>
         </div> 
      </div>
    </div>
  );
}

export default Layout;
