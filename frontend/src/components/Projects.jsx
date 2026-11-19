
const projects = [
  {
    title: "Client & Project Management System",
    description:
      "A full-stack project management platform to manage clients, projects, employees, tasks, comments and project progress. Includes role-based access for administrators, project managers, employees and clients.",
    category: "Full Stack Development",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "JWT",
    ],
    github: "https://github.com/Dhanrajdk79/cpms",
    featured: true,
  },
  {
    title: "FoodHub - Food Ordering Application",
    description:
      "A food ordering application with backend APIs for managing products, searching food items, stock availability and order-related operations.",
    category: "Full Stack Development",
    technologies: [
      "Node.js",
      "Express.js",
      "SQLite",
      "JavaScript",
      "REST API",
    ],
    github: "https://github.com/Dhanrajdk79/FoodHub",
    featured: true,
  },
  {
    title: "Morya Wellness Center",
    description:
      "A responsive business website for a wellness and fitness center, presenting services, wellness programs and business information through a clean user interface.",
    category: "Web Development",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github:
      "https://github.com/Dhanrajdk79/morya-wellness-center",
    featured: true,
  },
  {
    title: "Expense Tracker",
    description:
      "An expense tracking application designed to help users record, organize and monitor their expenses through a simple and user-friendly interface.",
    category: "Frontend Development",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github: "https://github.com/Dhanrajdk79/expense-tracker",
  },
];

function Projects() {
  return (
    <section id="projects" className="section-container">
      <div className="section-heading">
        <span>MY RECENT WORK</span>
        <h2>Featured Projects</h2>
        <p>
          Real-world applications showcasing my skills
          in full-stack development and web technologies.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article
            className="project-card"
            key={project.title}
          >
            <div className="project-number">
              PROJECT {String(index + 1).padStart(2, "0")}
            </div>

            {project.featured && (
              <span className="featured-label">
                Featured Project
              </span>
            )}

            <span className="project-category">
              {project.category}
            </span>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="project-tech">
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
