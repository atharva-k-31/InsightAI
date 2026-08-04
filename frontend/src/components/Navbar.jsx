import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🚀 <span>InsightAI</span>
      </div>

      <ul className="nav-links">
        <li>Dashboard</li>
        <li>Features</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <button className="login-btn">
        Get Started
      </button>

    </nav>
  );
}

export default Navbar;