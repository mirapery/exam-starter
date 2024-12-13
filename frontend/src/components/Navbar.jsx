import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>My Books</h1>
      </Link>
      <div className="links">
        {isAuthenticated && user ? (
          <div>
            <Link to="/books/add-book">Add Book</Link>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
