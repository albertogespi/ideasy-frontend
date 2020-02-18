import React from "react";
import { Search } from "./Search";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Header({ isAccessWindow }) {
  const { currentUser, jwt, isAuth } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("profileUser"));

  return (
    <header className={isAccessWindow ? "access-header" : "main-header"}>
      <div>
        <div id="logo"></div>
        <Link to="/">
          <button
            id="logo-home"
            aria-label="Portal de Ideas. Click para ir a inicio."
          ></button>
        </Link>

        {!isAccessWindow && <Search />}
      </div>

      {!isAccessWindow && isAuth && (
        <nav role="navigation">
          <ul className="nav-row">
            <li>
              <Link to={`/my-projects/${jwt.userId}`}>
                <button id="my-projects" title="Ir a mis proyectos">
                  {/* <img
                    id="medium-icon"
                    src="https://img.icons8.com/ios/50/000000/summary-list.png"
                    alt=""
                  />
                  <p>Mis Proyectos</p> */}
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
                  {/* <div id="medium-icon" className="profile-photo ">
                    <img
                      src={
                        storedUser
                          ? storedUser.avatarUrl
                          : currentUser.avatarUrl
                      }
                      alt=""
                      name="profile photo"
                    />
                  </div>
                  <p>Mi perfil</p> */}
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
                {/* <img
                  id="medium-icon"
                  src="https://img.icons8.com/ios/50/000000/export.png"
                  alt=""
                />
                <p>Cerrar sesión</p> */}
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
    </header>
  );
}
