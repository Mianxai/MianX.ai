export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <a href="#" className="logo">
            <span className="logo-icon" aria-hidden="true">M</span>
            <span className="logo-text">Mianx.ai</span>
          </a>
          <p>
            The AI-native Business Operating System, AI Workforce platform, and Autonomous
            Product Factory — a human-led autonomous enterprise creation platform.
          </p>
        </div>
        <nav className="footer-links" aria-label="Platform">
          <h4>Platform</h4>
          <ul>
            <li><a href="#platform">The Platform, In Order</a></li>
            <li><a href="#capabilities">Capabilities</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
          </ul>
        </nav>
        <nav className="footer-links" aria-label="Company">
          <h4>Company</h4>
          <ul>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/admin/login">Admin</a></li>
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mianx.ai. All rights reserved.</p>
      </div>
    </footer>
  );
}
