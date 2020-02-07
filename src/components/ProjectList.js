import React from "react";

export function ProjectList({ projects, selectedIndex, onSelectProject }) {
  return (
    <section>
      <ul>
        {projects.map((project, index) => (
          <li key={project.project_id}>
            <div>
              onClick={() => onSelectProject(index)}
              classname=
              {`project-item ${selectedIndex === index && "selected"}`}
              <h5>{project.title}</h5>
              <p>{project.created_at}</p>
              <p>{project.category}</p>
              <p>{project.description}</p>
              <p>{project.complexity}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
