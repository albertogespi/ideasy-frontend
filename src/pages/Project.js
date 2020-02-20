import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import {
  getUsersFollowingProject,
  getProject,
  followProject,
  unfollowProject
} from "../http/projectService";
import {
  getDocuments,
  uploadDocument,
  deleteDocument
} from "../http/documentsService";
import { Header } from "../components/Header";
import { OrgProject } from "../components/OrgProject";
import { DevProject } from "../components/DevProject";
import { Link } from "react-router-dom";
import { SimpleRating } from "../components/Rating";

const DEVELOPER_VIEW = 2;
const OWNER_VIEW = 1;
const ONLY_READ_VIEW = 0;

export function Project() {
  const { register, formState, handleSubmit } = useForm({
    mode: "onBlur"
  });
  const { isAuth, jwt } = useAuth();

  const projectId = window.location.href.split("/")[4];

  const [isFollower, setIsFollower] = useState(undefined);
  const [myContributions, setMyContributions] = useState([]);

  const [file, setFile] = useState(undefined);
  const [isCharging, setIsCharging] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [project, setProject] = useState(undefined);
  const [usersFollowing, setUsersFollowing] = useState(undefined);
  const [documents, setDocuments] = useState(undefined);

  const [typeOfProfile, setTypeOfProfile] = useState(undefined);

  useEffect(() => {
    getProject(projectId).then(response => {
      setProject(response.data);
    });
  }, []);

  useEffect(() => {
    if (project !== undefined) {
      if (isAuth) {
        if (jwt.role === "dev") {
          setTypeOfProfile(DEVELOPER_VIEW);
        } else {
          if (jwt.userId === project.user_id) {
            setTypeOfProfile(OWNER_VIEW);
          } else {
            setTypeOfProfile(ONLY_READ_VIEW); // 0 = not registered person or org watching other org projects
          }
        }
      } else {
        setTypeOfProfile(ONLY_READ_VIEW);
      }
    }
  }, [project]);

  useEffect(() => {
    getUsersFollowingProject(projectId).then(response => {
      setUsersFollowing(response.data);
      if (isFollower !== undefined) {
        checkIsFollower(response.data);
      }
    });
  }, [isFollower]);

  useEffect(() => {
    getDocuments(projectId).then(response => {
      setDocuments(response.data);
      if (typeOfProfile === DEVELOPER_VIEW) {
        setMyContributions(devContributions(response.data));
      }
    });
    setIsDeleted(false);
  }, [file, isDeleted, typeOfProfile]);

  const checkIsFollower = users => {
    for (let user of users) {
      if (user.user_id === jwt.userId) {
        setIsFollower(true);
        return;
      }
    }
    setIsFollower(false);
  };
  const handleFollow = () => {
    if (isFollower) {
      unfollowProject(projectId);
      setIsFollower(false);
    } else {
      followProject(projectId);
      setIsFollower(true);
    }
  };

  const devContributions = docs => {
    const result = [];
    docs.map(document => {
      if (document.user_id === jwt.userId) {
        result.push(document);
      }
    });

    return result;
  };

  const handleUpload = formData => {
    const data = new FormData();
    data.append("document", formData.document[0]);
    setIsCharging(true);
    uploadDocument(data, projectId).finally(() => {
      setFile(undefined);
      setIsCharging(false);
    });
  };

  const handleDelete = docId => {
    deleteDocument(docId).finally(() => setIsDeleted(true));
  };

  if (
    project !== undefined &&
    documents !== undefined &&
    usersFollowing !== undefined &&
    myContributions !== undefined &&
    typeOfProfile !== undefined
  ) {
    return (
      <section className="container">
        <Header isAccessWindow={false} />
        <section className="project">
          <ul>
            <Link to={`/user/${project.user_id}`}>
              <li>
                <div id="small-icon" className="profile-photo">
                  <img src={project.user_avatar_url} alt=""></img>
                </div>
                <button id="org-name">{project.user_name}</button>
              </li>
            </Link>
            <li className="top-middle">
              {typeOfProfile === OWNER_VIEW && <OrgProject project={project} />}
              {typeOfProfile !== OWNER_VIEW && <DevProject project={project} />}
            </li>
            <li>
              {typeOfProfile === DEVELOPER_VIEW && (
                <section className="contributions-title">
                  <p className="centered-container">Tus contribuciones</p>
                  <section className="contributions">
                    {myContributions.map((document, index) => (
                      <section id="contrib-row">
                        <a href={document.file_url}>{document.title}</a>
                        <button
                          className="delete-document"
                          onClick={() => handleDelete(document.doc_id)}
                        >
                          eliminar
                        </button>
                      </section>
                    ))}
                  </section>
                  <form id="upload-file" onSubmit={handleSubmit(handleUpload)}>
                    <fieldset id="upload-file">
                      <label for="contributions" id="document">
                        {file ? file.name : "Seleccionar"}
                      </label>
                      <input
                        type="file"
                        id="contributions"
                        name="document"
                        accept="application/pdf"
                        ref={register}
                        onChange={e => {
                          setFile(e.target.files[0]);
                        }}
                      ></input>
                    </fieldset>
                    <button
                      className="form"
                      type="submit"
                      disabled={formState.isSubmitting}
                    >
                      Subir archivo
                    </button>
                    {isCharging && <div id="spinner"></div>}
                  </form>
                </section>
              )}
              {typeOfProfile === OWNER_VIEW && (
                <section className="contributions-title">
                  <p className="centered-container">Contribuciones</p>
                  <section className="contributions">
                    {documents.map((document, index) => (
                      <div id="contrib-row">
                        <Link id="link" to={`/user/${document.user_id}`}>
                          <button>
                            <div id="small-icon" className="profile-photo">
                              <img src={document.user_avatar_url} alt=""></img>
                            </div>
                            <p>{document.user_name}</p>
                          </button>
                        </Link>
                        <a href={document.file_url}>{document.title}</a>
                        <div className="centered-container">
                          <SimpleRating
                            readOnly={false}
                            value={document.rating}
                            docId={document.doc_id}
                            key={document.doc_id}
                            id="stars"
                          />
                        </div>
                      </div>
                    ))}
                  </section>
                </section>
              )}
            </li>
            <li className="followers-title">
              <p className="centered-container">Seguidores de este proyecto</p>
              <section className="followers">
                {usersFollowing.map((user, index) => (
                  <Link to={`/user/${user.user_id}`} key={index}>
                    <button>
                      <div id="small-icon" className="profile-photo">
                        <img src={user.avatar_url} alt="" />
                      </div>
                      <p>{user.name}</p>
                    </button>
                  </Link>
                ))}
              </section>
            </li>
            <li id="bottom">
              {typeOfProfile === DEVELOPER_VIEW && (
                <button className="follow-button" onClick={handleFollow}>
                  {isFollower ? "Dejar de seguir proyecto" : "Seguir proyecto"}
                </button>
              )}
              {typeOfProfile === OWNER_VIEW && (
                <button className="close-project">Cerrar proyecto</button>
              )}
            </li>
          </ul>
        </section>
      </section>
    );
  } else {
    return <p>Cargando proyecto...</p>;
  }
}
