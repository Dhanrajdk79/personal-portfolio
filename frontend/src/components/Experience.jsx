
const experiences = [
  {
    role: "Full Stack Developer Intern",
    company: "ISKCON, Pune",
    duration: "October 2026 – Present",
    description:
      "Working on web development tasks, building responsive user interfaces, and applying HTML, CSS and JavaScript to develop and improve website functionality.",
  },
  {
    role: "Hardware & Networking Intern",
    company: "WIS Technosavvy Pvt. Ltd. · KEM Hospital, Pune",
    duration: "March 2026 – June 2026",
    description:
      "Gained practical exposure to hardware troubleshooting, networking fundamentals and IT support.",
  },
  {
    role: "AWS Trainee",
    company: "Cravita Technologies Pvt. Ltd. · Pune",
    duration: "May 2025 – December 2025",
    description:
      "Practised AWS cloud fundamentals, infrastructure configuration and application deployment.",
  },
];

function Experience() {
  return (
    <section id="experience" className="section-container">
      <div className="section-heading">
        <span>MY PROFESSIONAL JOURNEY</span>
        <h2>Experience</h2>
        <p>My professional experience and practical training.</p>
      </div>

      <div className="timeline-box">
        {experiences.map((item) => (
          <article className="timeline-item" key={item.role}>
            <h3>{item.role}</h3>
            <h4>{item.company}</h4>
            <small>{item.duration}</small>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
