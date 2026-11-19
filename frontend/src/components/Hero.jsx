
function Hero() {
  const resumeLink = "YOUR_GOOGLE_DRIVE_RESUME_LINK";

  return (
    <section id="home" className="hero">
      <div className="hero-container">

        <div className="hero-content">
          <p className="hero-greeting">
            HELLO, I'M
          </p>

          <h1>
            Dhanraj <span>Kshirsagar</span>
          </h1>

          <h2>
            AWS & DevOps Engineer
          </h2>

          <p className="hero-description">
            I build, automate and deploy scalable cloud
            infrastructure and modern web applications.
            Passionate about AWS, DevOps, automation
            and full-stack development.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              Explore My Work
            </a>

            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              View Resume ↗
            </a>
          </div>

          <div className="hero-socials">
            <a
              href="https://github.com/Dhanrajdk79"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="profile-glow">
            <img
              src="/src/assets/profile.png"
              alt="Dhanraj Kshirsagar"
              className="profile-photo"
            />
          </div>

          <p className="profile-caption">
            Building • Learning • Deploying
          </p>
        </div>

      </div>
    </section>
  );
}

export default Hero;
