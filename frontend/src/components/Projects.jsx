
const projects = [
  {
    title: "Client & Project Management System",
    description:
      "Full-stack project management application for managing clients, projects, employees, tasks, comments and project progress.",
    category: "Full Stack Development",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "JWT",
    ],
    github: "",
    featured: true,
  },
  {
    title: "Morya Wellness Center Website",
    description:
      "Responsive website for a wellness and fitness center with service information and business-focused design.",
    category: "Web Development",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github:
      "https://github.com/Dhanrajdk79/morya_wellness-center",
  },
  {
    title: "Clothing E-Commerce Website",
    description:
      "Responsive clothing website deployed using a three-tier architecture with AWS EC2, RDS and VPC.",
    category: "AWS Cloud",
    technologies: [
      "AWS EC2",
      "RDS",
      "VPC",
      "Web Development",
    ],
    github:
      "https://github.com/Dhanrajdk79/clothing-website-using-3-tier-architecture-",
  },
  {
    title: "Serverless Media Upload Hub",
    description:
      "Serverless media upload application using AWS S3, Lambda and DynamoDB.",
    category: "Serverless",
    technologies: [
      "AWS S3",
      "Lambda",
      "DynamoDB",
    ],
    github:
      "https://github.com/Dhanrajdk79/Serverless-Media-Upload-Hub-AWS-Lambda-with-S3-and-DynamoDB-",
  },
  {
    title: "Three-Tier E-Commerce Infrastructure",
    description:
      "AWS infrastructure provisioned using Terraform, including VPC, subnets, EC2, ALB, Auto Scaling and RDS.",
    category: "Infrastructure as Code",
    technologies: [
      "AWS",
      "Terraform",
      "EC2",
      "RDS",
      "ALB",
    ],
    github:
      "https://github.com/Dhanrajdk79/3Tier_Ecommerce_Terraform",
  },
  {
    title: "E-Commerce CI/CD Deployment",
    description:
      "Automated application deployment using Jenkins CI/CD, Terraform, Docker, AWS EC2 and Nginx.",
    category: "DevOps",
    technologies: [
      "Jenkins",
      "Terraform",
      "Docker",
      "AWS EC2",
      "Nginx",
    ],
    github:
      "https://github.com/Dhanrajdk79/E-commerce-website-deployment-using-jenkinsCICD-Terraform",
  },
];

function Projects() {
  return (
    <section id="projects" className="section-container">
      <div className="section-heading">
        <span>MY RECENT WORK</span>
        <h2>Featured Projects</h2>
        <p>Some projects I have built and worked on.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article
            className="project-card"
            key={project.title}
          >
            <div className="project-number">
              PROJECT 0{index + 1}
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
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub ↗
                </a>
              ) : (
                <span className="project-link-pending">
                  GitHub link to be added
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
