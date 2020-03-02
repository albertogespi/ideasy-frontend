import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { createProject } from "../http/projectsService";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Footer } from "../components/Footer";
import { Selects } from "../components/Selects";

export function NewProject() {
  const { jwt } = useAuth();

  const {
    register,
    formState,
    handleSubmit,
    setError,
    setValue,
    errors
  } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();

  const [selectsState, setSelectsState] = useState({
    category: '',
    complexity: '',
  });

  const handleNewProyect = formData => {
    if(selectsState.category === ''){
      setSelectsState({...selectsState,
        ['category']: null})
        return;
    }

    if(selectsState.complexity === ''){
      setSelectsState({...selectsState,
        ['complexity']: null})
        return;
    }

    const fullForm = {...formData, ...selectsState};
    return createProject(fullForm)
      .then(response => {
        history.push(`/my-projects/${jwt.userId}`);
      })
      .catch(error => {
        setValue("password", "");
        setError("password", "credentials", "The credentials are invalid");
      });
  };

  return (
    <section className="container" id="newProject">
      <Header isAccessWindow={false} />
      <main className="home-body">
      <section className="centered-container">
        <form
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
                {errors.title && (
                  <span className="errorMessage">{errors.title.message}</span>
                )}
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
                {errors.description && (
                  <span className="errorMessage">
                    {errors.description.message}
                  </span>
                )}
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
                {errors.details && (
                  <span className="errorMessage">{errors.details.message}</span>
                )}
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <Selects isFilters={false} selectsState={selectsState} setSelectsState={setSelectsState} />
          </fieldset>
          <div id="submit-button-div">
            <button
              className="form"
              type="submit"
              disabled={formState.isSubmitting}
            >
              Crear proyecto
            </button>
          </div>
        </form>
      </section>
      </main>
      <Footer />
    </section>
  );
}
