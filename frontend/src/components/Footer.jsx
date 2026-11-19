
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <a href="#home" className="footer-logo">
          DK<span>.</span>
        </a>

        <p>
          Building • Learning • Deploying
        </p>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/Dhanrajdk79"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/dhanraj-kshirsagar-dk"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Dhanraj Kshirsagar.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
