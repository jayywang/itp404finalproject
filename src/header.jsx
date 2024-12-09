import { Link } from "react-router-dom";

const Header = () => {
  const headerStyle = {
    backgroundColor: "#4E5E9F",
    padding: "15px",
    width: "100%",
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center mb-4"
      style={headerStyle}
    >
      <Link to="/" className="text-white text-decoration-none">
        <h1>Travel Tracker</h1>
      </Link>
      <div>
        <Link to="/map" className="btn btn-light me-2">
          Bookmarks
        </Link>

        <Link to="/states" className="btn btn-light me-2">
          State List
        </Link>
      </div>
    </div>
  );
};

export default Header;
