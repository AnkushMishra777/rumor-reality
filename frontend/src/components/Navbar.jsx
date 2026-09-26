import { ShieldCheck } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="brand">

        <div className="brand-icon">
          <ShieldCheck size={22} />
        </div>

        <div>
          <div className="brand-name">
            RUMOR <span>VS</span> REALITY
          </div>

          <div className="brand-subtitle">
            Market Intelligence
          </div>
        </div>

      </div>

      <div className="navbar-right">
        <span className="live-indicator">
          <span></span>
          Intelligence Engine
        </span>

        <button className="about-button">
          About
        </button>
      </div>

    </nav>
  );
}

export default Navbar;