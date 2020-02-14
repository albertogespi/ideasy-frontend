import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { getUsersFollowingProject, getProject } from "../http/projectService";
import { getDocuments } from "../http/documentsService";
import { Header } from "../components/Header";

export function Project() {
  const {
    register,
    errors,
    formState,
    handleSubmit,
    setError,
    setValue
  } = useForm({
    mode: "onBlur"
  });

  const { currentUser, jwt } = useAuth();

  const projectId = window.location.href.split("/")[4];

  console.log(projectId);

  let isOrgProfile = jwt.role === "org";

  const [isFollower, setIsFollower] = useState();

  const [usersFollowing, setUsersFollowing] = useState([]);
  const [project, setProject] = useState(undefined);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getUsersFollowingProject(projectId).then(response => {
      setUsersFollowing(response.data);
    });

    getProject(projectId).then(response => setProject(response.data));
    getDocuments(projectId).then(response => setDocuments(response.data));
  }, []);

  console.log(usersFollowing);
  console.log({ project });

  if (project === undefined) {
    return <p>Internet va lento, espere</p>;
  }
  if (project === null) {
    return <p>Nada para ver, no existe, no se</p>;
  }

  return (
    <section className="container">
      <Header isAccessWindow={false} />
      <section className="project">
        <ul>
          <li>
            <button id="org-name">{project.user_name}</button>
          </li>
          <li>
            <form>
              <section id="top">
                <fieldset>
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
                        disabled={!isOrgProfile}
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
                        disabled={!isOrgProfile}
                      ></textarea>
                    </li>
                  </ul>
                </fieldset>
                <fieldset id="project-info">
                  <ul>
                    <li>
                      <img
                        src="https://img.icons8.com/android/24/000000/sun.png"
                        alt=""
                        id="icon"
                      />
                      <p>{project.created_at.split("T")[0]}</p>
                    </li>
                    <li>
                      <img
                        src="https://img.icons8.com/material-outlined/24/000000/user--v1.png"
                        alt=""
                        id="icon"
                      />
                      <p>
                        {project.number_of_followers}
                        {project.number_of_followers === 1
                          ? " seguidor"
                          : " seguidores"}
                      </p>
                    </li>
                    <li>
                      <label for="category">Categoría</label>
                      <select
                        name="category"
                        id="category"
                        ref={register({
                          required: "La categoría es obligatoria"
                        })}
                        disabled={!isOrgProfile}
                      >
                        <option>Selecciona...</option>
                        <option value="Blogs">Blogs</option>
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
                        name="complexity"
                        id="complexity"
                        ref={register({
                          required: "La complejidad es obligatoria"
                        })}
                        disabled={!isOrgProfile}
                      >
                        <option>Selecciona...</option>
                        <option value="1">Fácil</option>
                        <option value="2">Medio</option>
                        <option value="3">Difícil</option>
                      </select>
                    </li>
                  </ul>
                </fieldset>
              </section>
              <section id="middle">
                <fieldset>
                  <label for="details">Descripción detallada</label>
                  <textarea
                    id="details"
                    name="details"
                    defaultValue={project.details}
                    ref={register({
                      required: "La descripción es obligatoria"
                    })}
                    disabled={!isOrgProfile}
                  ></textarea>
                </fieldset>
              </section>
            </form>
          </li>
          <li>
            {!isOrgProfile && (
              <form>
                <fieldset className="contributions">
                  <legend>Tus contribuciones</legend>
                  <section id="contrib-row">
                    <p>nombre del archivo</p>
                    <button>eliminar</button>
                  </section>
                  <label for="contributions">Sube una propuesta</label>
                  <input
                    type="file"
                    id="contributions"
                    name="contributions"
                    accept="pdf"
                    ref={register}
                  ></input>
                </fieldset>
              </form>
            )}
            {isOrgProfile && (
              <section>
                <p>Contribuciones</p>
                <section className="contributions">
                  "documents.map(
                  <div id="contrib-row">
                    <button>
                      <img></img>
                      <p>nombre</p>
                    </button>
                    <a href="google.es">nombre del archivo</a>
                    <div>estrellas</div>
                  </div>
                  )"
                </section>
              </section>
            )}
          </li>
          <li>
            <p>Seguidores de este proyecto</p>
            <section className="followers">
              {usersFollowing.map((user, index) => (
                <button>
                  <img src={user.avatarUrl} alt="" />
                  <p>user.name</p>
                </button>
              ))}
            </section>
          </li>
          <li>
            {!isOrgProfile && (
              <button>
                {isFollower ? "Dejar de seguir proyecto" : "Seguir proyecto"}
              </button>
            )}
            {isOrgProfile && <button>cerrar proyecto</button>}
          </li>
        </ul>
      </section>
    </section>
  );
}
