
const education = [
  {
    degree: "Master of Cloud Architecture",
    institution: "Fortune Cloud, Shivaji Nagar, Pune",
    duration: "May 2025 – November 2025",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Savitribai Phule Pune University, Pune",
    duration: "August 2022 – May 2025",
    result: "CGPA: 6.59/10",
  },
];

function Education() {
  return (
    <section id="education" className="section-container">
      <div className="section-heading">
        <span>ACADEMIC BACKGROUND</span>
        <h2>Education</h2>
        <p>My academic qualifications.</p>
      </div>

      <div className="timeline-box">
        {education.map((item) => (
          <article className="timeline-item" key={item.degree}>
            <h3>{item.degree}</h3>
            <h4>{item.institution}</h4>
            <small>{item.duration}</small>

            {item.result && <p>{item.result}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Education;
