import React from "react";

export function DevProject({ project }) {
  return (
    <section>
      <section id="top">
        <section id="visible-info">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </section>
        <section id="dev-project-info">
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
            <li>
              <p>Categoría: {project.category}</p>
            </li>
            <li>
              <p>
                Complejidad:
                {project.complexity === 1
                  ? " Fácil"
                  : project.complexity === 2
                  ? " Medio"
                  : " Difícil"}
              </p>
            </li>
          </ul>
        </section>
      </section>
      <section id="middle">
        <p>{project.details}</p>
      </section>
    </section>
  );
}
