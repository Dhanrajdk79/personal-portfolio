
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
      "A food application with backend APIs for managing products, searching items, checking stock availability and performing product operations.",
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
    title: "Serverless Media Upload Hub",
    description:
      "A serverless cloud application for handling media uploads using AWS services, with S3 for storage, Lambda for serverless processing and DynamoDB for data management.",
    category: "AWS Cloud & Serverless",
    technologies: [
      "AWS S3",
      "AWS Lambda",
      "DynamoDB",
      "AWS IAM",
      "Serverless Architecture",
    ],
    github:
      "https://github.com/Dhanrajdk79/Serverless-Media-Upload-Hub-AWS-Lambda-with-S3-and-DynamoDB-",
    featured: true,
  },
  {
    title: "E-Commerce CI/CD Deployment",
    description:
      "A DevOps deployment project focused on automating application delivery using Jenkins pipelines, Docker containers, Terraform infrastructure provisioning and AWS EC2.",
    category: "DevOps & Cloud Engineering",
    technologies: [
      "Docker",
      "Jenkins",
      "Terraform",
      "AWS EC2",
      "Nginx",
      "CI/CD",
    ],
    github:
      "https://github.com/Dhanrajdk79/E-commerce-website-deployment-using-jenkinsCICD-Terraform",
    featured: true,
  },
  {
    title: "Expense Tracker",
    description:
      "An expense tracking application designed to help users record, organize and monitor expenses through a simple and user-friendly interface.",
    category: "Frontend Development",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github:
      "https://github.com/Dhanrajdk79/expense-tracker",
  },
];

function Projects() {
  return (
    <section id="projects" className="section-container">
      <div className="section-heading">
        <span>MY RECENT WORK</span>
        <h2>Featured Projects</h2>
        <p>
          Real-world applications showcasing my experience
          in full-stack development, AWS cloud and DevOps.
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
