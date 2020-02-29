import React from "react";
import { useForm } from "react-hook-form";
import { updateProject } from "../http/projectService";
import { convertISOtoDate } from "../functions/convertISOtoDate";

export function OrgProject({ project }) {
  const categories = [
    "Blog",
    "e-Commerce",
    "e-Learning",
    "Corporativa",
    "Noticias",
    "Wikis"
  ];

  const complexities = ["Fácil", "Medio", "Difícil"];

  const { register, formState, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const handleUpdateProject = formData => {
    updateProject(formData, project.project_id);
  };

  return (
    <form id="org-view-project" onSubmit={handleSubmit(handleUpdateProject)}>
      <section id="top">
        <fieldset id="visible-info">
          <ul>
            <li>
              <label for="title">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={project.title}
                ref={register({
                  required: "El título es obligatorio"
                })}
              ></input>
            </li>
            <li>
              <label for="description">Resumen</label>
              <textarea
                id="description"
                name="description"
                defaultValue={project.description}
                ref={register({
                  required: "El resumen es obligatorio"
                })}
              ></textarea>
            </li>
          </ul>
        </fieldset>
        <section id="project-info">
          <ul>
            <li>
              <p>Creado el {convertISOtoDate(project.created_at)}</p>
            </li>
            <li>
              <p>
                {project.number_of_followers}
                {project.number_of_followers === 1
                  ? " seguidor"
                  : " seguidores"}
              </p>
            </li>
            <li id="selects">
              <label for="category">Categoría</label>
              <select
                className="select-css"
                name="category"
                id="category"
                ref={register({
                  required: "La categoría es obligatoria"
                })}
              >
                <option>Selecciona...</option>
                {categories.map((category, index) => (
                  <option
                    selected={project.category === category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </li>
            <li id="selects">
              <label for="complexity">Complejidad</label>
              <select
                className="select-css"
                name="complexity"
                id="complexity"
                ref={register({
                  required: "La complejidad es obligatoria"
                })}
              >
                <option>Selecciona...</option>
                {complexities.map((complexity, index) => (
                  <option
                    selected={project.complexity === index + 1}
                    value={index + 1}
                  >
                    {complexity}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </section>
      </section>
      <section id="middle">
        <fieldset>
          <label for="details" id="details-label">
            Descripción detallada
          </label>
          <textarea
            id="details"
            name="details"
            defaultValue={project.details}
            ref={register({
              required: "La descripción es obligatoria"
            })}
          ></textarea>
        </fieldset>
      </section>
      <section id="bottom">
        <button
          className="form"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Guardar cambios
        </button>
      </section>
    </form>
  );
}
