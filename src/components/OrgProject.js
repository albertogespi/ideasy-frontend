import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateProject } from "../http/projectService";
import { convertISOtoDate } from "../functions/convertISOtoDate";
import { Selects } from "./Selects";
import CircularProgress from '@material-ui/core/CircularProgress';

export function OrgProject({ project }) {
  const { register, formState, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const [selectsState, setSelectsState] = useState({
    category: project.category,
    complexity: project.complexity
  });
  const [isCharging, setIsCharging] = useState(undefined);

  const handleUpdateProject = formData => {
    const fullForm = {...formData, ...selectsState};
    setIsCharging(true);
    updateProject(fullForm, project.project_id).finally(() => setIsCharging(false));
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
                maxLength="45"
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
                maxLength="255"
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
            <li>
              <Selects
                isFilters={false}
                selectsState={selectsState}
                setSelectsState={setSelectsState}
              />
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
        {isCharging && <div id="spinner"><CircularProgress size={'2rem'}/></div>}
        {isCharging === false && <p>¡Cambios guardados!</p>}
      </section>
    </form>
  );
}
