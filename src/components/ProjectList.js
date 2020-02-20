import React from "react";
import { Link, useHistory } from "react-router-dom";

export function ProjectList({ projects }) {
  const history = useHistory();
  return (
    <section className="projectList">
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <section className="project-miniature">
              <div>
                <a href={`/user/${project.user_id}`}>
                  <button id="profile" title="Ir al perfil de la asociación">
                    <div className="profile-photo" id="medium-icon">
                      <img
                        src={project.user_avatar_url}
                        alt=""
                        name="profile photo"
                      />
                    </div>
                    <p id="org-name">{project.user_name}</p>
                  </button>
                </a>
              </div>
              <div id="main-content">
                <p className="category">{project.category}</p>
                <Link to={`/project/${project.project_id}`}>
                  <div>
                    <div id="project-data">
                      <h2 className="project-title">{project.title}</h2>
                      <p id="project-description">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div id="project-info">
                <ul>
                  <li>
                    <img
                      src="https://img.icons8.com/android/24/000000/sun.png"
                      alt=""
                      id="supersmall-icon"
                    />
                    <p>{project.created_at.split("T")[0]}</p>
                  </li>
                  <li>
                    <img
                      src="https://img.icons8.com/material-outlined/24/000000/user--v1.png"
                      alt=""
                      id="supersmall-icon"
                    />
                    <p>
                      {project.number_of_followers}
                      {project.number_of_followers === 1
                        ? " seguidor"
                        : " seguidores"}
                    </p>
                  </li>
                  <li className="complexity">
                    {project.complexity === 1
                      ? "Fácil"
                      : project.complexity === 2
                      ? "Medio"
                      : "Díficil"}
                  </li>
                </ul>
              </div>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
