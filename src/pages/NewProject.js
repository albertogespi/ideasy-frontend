import React from "react";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { createProject } from "../http/projectsService";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function NewProject() {
  const { jwt } = useAuth();

  const { register, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();

  const handleNewProyect = formData => {
    console.log(formData);
    return createProject(formData)
      .then(response => {
        history.push(`/my-projects/${jwt.userId}`);
        console.log(response.data);
      })
      .catch(error => {
        setValue("password", "");
        setError("password", "credentials", "The credentials are invalid");
      });
  };

  return (
    <section className="container">
      <Header isAccessWindow={false} />
      <main className="centered-container" id="background">
        <form
          className="newProject"
          onSubmit={handleSubmit(data => handleNewProyect(data))}
        >
          <h1>Nuevo Proyecto</h1>
          <fieldset>
            <ul>
              <li>
                <label for="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  maxLength="45"
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
                  ref={register({
                    required: "El resumen es obligatorio"
                  })}
                ></textarea>
              </li>
              <li>
                <label for="details">Detalles</label>
                <textarea
                  id="details"
                  name="details"
                  ref={register({
                    required: "La descripción es obligatoria"
                  })}
                ></textarea>
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <ul>
              <li>
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
                  <option value="Blog">Blog</option>
                  <option value="e-Commerce">e-Commerce</option>
                  <option value="e-Learning">e-Learning</option>
                  <option value="Corporativa">Corporativa</option>
                  <option value="Noticias">Noticias</option>
                  <option value="Wikis">Wikis</option>
                </select>
              </li>
              <li>
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
                  <option value="1">Fácil</option>
                  <option value="2">Medio</option>
                  <option value="3">Difícil</option>
                </select>
              </li>
            </ul>
          </fieldset>
          <div>
            <button
              className="form"
              type="submit"
              disabled={formState.isSubmitting}
            >
              Crear proyecto
            </button>
          </div>
        </form>
      </main>
    </section>
  );
}
