import React from "react";
import { Link } from "react-router-dom";
import { convertISOtoDate } from "../functions/convertISOtoDate";

export function ProjectList({ projects }) {
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
                        src={
                          project.user_avatar_url ||
                          require("../images/default-avatar.jpg")
                        }
                        alt=""
                        name="profile photo"
                      />
                    </div>
                    <p id="org-name">{project.user_name}</p>
                  </button>
                </a>
                {/* <p className="complexity">
                  {project.complexity === 1
                    ? "Fácil"
                    : project.complexity === 2
                    ? "Medio"
                    : "Díficil"}
                </p> */}
                <p className="creation-date">
                  {convertISOtoDate(project.created_at)}
                </p>
              </div>

              <Link to={`/project/${project.project_id}`}>
                <div id="main-content">
                  <div id="main-content-header">
                    <div id="complexity-category">
                      <div
                        id={
                          project.complexity === 1
                            ? "easy"
                            : project.complexity === 2
                            ? "medium"
                            : "hard"
                        }
                      >
                        <p>
                          {project.complexity === 1
                            ? "F"
                            : project.complexity === 2
                            ? "M"
                            : "D"}
                        </p>
                      </div>
                      <p className="category">{project.category}</p>
                    </div>

                    <p id="followers">
                      {project.number_of_followers}
                      {project.number_of_followers === 1
                        ? " seguidor"
                        : " seguidores"}
                    </p>
                  </div>

                  <div>
                    <div id="project-data">
                      <h2 className="project-title">{project.title}</h2>
                      <p id="project-description">{project.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
              {/* <div id="project-info">
                <ul>
                  <li>
                    <p>Creado el</p>
                    <p>{convertISOtoDate(project.created_at)}</p>
                  </li>
                  <li>
                    <p>
                      {project.number_of_followers}
                      {project.number_of_followers === 1
                        ? " seguidor"
                        : " seguidores"}
                    </p>
                  </li>
                  <li className="complexity">
                    <p>
                      {project.complexity === 1
                        ? "Fácil"
                        : project.complexity === 2
                        ? "Medio"
                        : "Díficil"}
                    </p>
                  </li>
                </ul>
              </div> */}
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
