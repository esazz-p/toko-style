import React from "react";

function Navbar() {
  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 90px;
          padding: 0 50px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          z-index: 1000;
        }

        .navbar-logo {
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -1px;
          color: #f8f7f7;
        }

        .navbar-logo span {
          color: #dd1007;
        }

        .navbar-links {
          display: flex;
          gap: 35px;
        }

        .navbar-links a {
          color: #f8f7f7;
          text-decoration: none;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: 0.3s ease;
        }

        .navbar-links a:hover {
          color: #dd1007;
        }

        .menu-button {
          border: 1px solid #f8f7f7;
          background: transparent;
          color: #f8f7f7;

          padding: 12px 22px;
          border-radius: 30px;

          cursor: pointer;
          transition: 0.3s ease;
        }

        .menu-button:hover {
          background: #dd1007;
          border-color: #dd1007;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 0 20px;
          }

          .navbar-links {
            display: none;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-logo">
          TOKO<span>.</span>
        </div>

        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="menu-button">
          Menu
        </button>
      </nav>
    </>
  );
}

export default Navbar;