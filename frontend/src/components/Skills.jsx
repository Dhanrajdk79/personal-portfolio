
const skillCategories = [
  {
    title: "Frontend Development",
    icon: "💻",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Responsive Design",
    ],
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    skills: [
      "Node.js",
      "Express.js",
      "PHP",
      "Python",
      "REST APIs",
    ],
  },
  {
    title: "Database Management",
    icon: "🗄️",
    skills: [
      "MySQL",
      "MariaDB",
      "Amazon DynamoDB",
      "Google Sheets API",
    ],
  },
  {
    title: "AWS Cloud Computing",
    icon: "☁️",
    skills: [
      "EC2",
      "S3",
      "RDS",
      "VPC",
      "Lambda",
      "IAM",
      "Route 53",
      "CloudFront",
      "CloudWatch",
    ],
  },
  {
    title: "DevOps & Automation",
    icon: "🚀",
    skills: [
      "Git",
      "GitHub",
      "GitLab CI/CD",
      "Jenkins",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Ansible",
      "GitHub Actions",
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="section-container">
      <div className="section-heading">
        <span>MY TECHNICAL EXPERTISE</span>
        <h2>Technical Skills</h2>
        <p>Technologies and tools I work with.</p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category) => (
          <div className="skill-card" key={category.title}>
            <div className="skill-icon">
              {category.icon}
            </div>

            <h3>{category.title}</h3>

            <div className="skill-tags">
              {category.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
