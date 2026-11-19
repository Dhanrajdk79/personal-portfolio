
const certifications = [
  {
    name: "AWS Cloud Computing",
    provider: "Fortune Cloud, Pune",
    year: "2025",
    description:
      "Training in AWS cloud fundamentals, core AWS services, cloud infrastructure and application deployment.",
    link:
      "https://drive.google.com/file/d/1a4xqlnyaRTCOd1T-KLy2nIcc5IjRhG2w/view?usp=drive_link",
  },
  {
    name: "30-Days SQL Micro Course",
    provider: "Skill Course E-Learning Platform",
    year: "2025",
    description:
      "Completed a 30-day SQL micro course covering SQL fundamentals, database queries and data management concepts.",
    link:
      "https://drive.google.com/file/d/1VYBRiND9JfGcsGyHlcrst1qVEeTPD5Tx/view?usp=sharing",
  },
];

function Certifications() {
  return (
    <section id="certifications" className="section-container">
      <div className="section-heading">
        <span>LEARNING & DEVELOPMENT</span>
        <h2>Certifications & Training</h2>
        <p>Courses and certifications completed.</p>
      </div>

      <div className="timeline-box">
        {certifications.map((item) => (
          <article className="timeline-item" key={item.name}>
            <h3>{item.name}</h3>
            <h4>{item.provider}</h4>
            <small>{item.year}</small>
            <p>{item.description}</p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="certificate-link"
            >
              View Certificate ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
