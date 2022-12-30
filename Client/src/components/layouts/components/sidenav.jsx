import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowRight, DoorOpen, House, Save, Search } from "react-bootstrap-icons";
import { useContext } from "react";
import { AppContext } from "../../../App";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Boards",
    icon: <ArrowRight />,
    link: "/boards",
  },
  {
    title: "Saved Boards",
    icon: <Save/>,
    link: "/savedBoards",
  },
];

const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

function SideNavItem(props) {
  return (
    <li className="nav-item mt-3 ">
      <a href={props.link} className="nav-link mb-2 text-light">
        <div className="row mt-4">
          <div className="col-auto">{props.icon}</div>
          <div className="col-auto">{props.title}</div>
        </div>
      </a>

    </li>
  );
}

function Sidenav() {
  const { user } = useContext(AppContext);
  return (
    <div className="col-auto min-vh-100 bg-dark" style={{ width: "12.5vw" }}>
      <div className="justify-content-center align-items-center mt-5 mb-5">
        <h1 className="text-light">Monday</h1>
        <p className="text-light text-center"><em>Welcome {user.firstName}</em></p>
      </div>
      <ul className="mt-5 mb-5">
        {items.map((item) => {
          return <SideNavItem title={item.title} key={item.title} icon={item.icon} link={item.link} />;
        })}
      </ul>
      <hr />
      <ul className="mt-5 pt-5">
        <li className="nav-item">
          <a className="nav-link text-light" href="#">
            <button className="btn btn-danger" onClick={handleLogout}>
              <span>
                <DoorOpen/> &nbsp;
                Logout</span>
            </button>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidenav;
