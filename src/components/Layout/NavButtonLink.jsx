import { Link } from "react-router-dom";

const NavButtonLink = (props) => {
  return (
    <Link to={props.to} style={{ textDecoration: "none", color: "white" }}>
      {props.children}
    </Link>
  );
};

export default NavButtonLink;
