import React, { useState } from "react";
import { Search } from "./Search";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Header({ isAccessWindow }) {
  const [searchResults, setSearchResults] = useState(undefined);

  if (searchResults !== undefined) {
    console.log(Object.keys(searchResults).length);
    console.log(searchResults["users"]);
    console.log(searchResults["projects"]);
  }

  const { jwt, isAuth } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("profileUser"));

  return (
    <header>
      <section className={isAccessWindow ? "access-header" : "main-header"}>
        <div className="header-user">
          <div id="logo"></div>
          <Link to="/">
            <button
              id="logo-home"
              aria-label="Portal de Ideas. Click para ir a inicio."
            ></button>
          </Link>

          {!isAccessWindow && (
            <Search
              onSearch={results => setSearchResults(results)}
              onEmpty={value => {
                if (value === "") {
                  setSearchResults(undefined);
                }
              }}
            />
          )}
        </div>

        {!isAccessWindow && isAuth && (
          <nav role="navigation">
            <ul className="nav-row">
              <li>
                <Link to={`/my-projects/${jwt.userId}`}>
                  <button id="my-projects" title="Ir a mis proyectos">
                    Mis proyectos
                  </button>
                </Link>
              </li>
              <li>
                <p className="separator">|</p>
              </li>
              <li>
                <Link to="/my-profile">
                  <button id="my-profile" title="Ir a mi perfil">
                    Mi perfil
                  </button>
                </Link>
              </li>
              <li>
                <p className="separator">|</p>
              </li>

              <li>
                <button
                  id="logout"
                  title="Click para cerrar sesión"
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                    window.location.href = "/";
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </nav>
        )}
        {!isAccessWindow && !isAuth && (
          <div>
            <Link to="/access">
              <button className="gray" id="access-button" renderAs="button">
                Accede o regístrate
              </button>
            </Link>
          </div>
        )}
      </section>
      {searchResults !== undefined && (
        <section className="search-results">
          {Object.keys(searchResults).length !== 0 && (
            <section>
              <section id="users-results">
                <p>Usuarios</p>
                <ul>
                  {searchResults["users"].map((user, index) => (
                    <li key={index}>
                      <Link to={`/user/${user.user_id}`} key={index}>
                        <button id="search-result">
                          <div id="small-icon" className="profile-photo">
                            <img src={user.avatar_url} alt="" />
                          </div>
                          <p>{user.name}</p>
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
              <section id="projects-results">
                <p>Proyectos</p>
                <ul>
                  {searchResults["projects"].map((project, index) => (
                    <li key={index}>
                      <Link to={`/project/${project.project_id}`} key={index}>
                        <button id="search-result">
                          <div id="small-icon" className="profile-photo">
                            <img src={project.user_avatar_url} alt="" />
                          </div>
                          <p>{project.title}</p>
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </section>
          )}
          {Object.keys(searchResults).length === 0 && (
            <p className="centered-container">
              No se encontró ningún resultado
            </p>
          )}
        </section>
      )}
    </header>
  );
}
