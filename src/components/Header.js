import React from "react";
import { Search } from "./Search";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Header({ isAccessWindow }) {
  const { isAuth } = useAuth();

  return (
    <header className="main-header">
      {!isAccessWindow && <Search />}
      <div>
        <h1>
          <a
            href="google.es"
            id="logo-home"
            aria-label="Portal de Ideas. Click para ir a inicio."
          >
            Portal de Ideas
          </a>
        </h1>
      </div>
      {!isAccessWindow && isAuth && (
        <nav role="navigation">
          <ul className="nav-row">
            <li>
              <button id="my-projects" title="Ir a mis proyectos">
                <img
                  src="https://img.icons8.com/ios/50/000000/summary-list.png"
                  alt=""
                />
                Mis Proyectos
              </button>
            </li>
            <li>
              <Link to="/my-profile">
                <button id="my-profile" title="Ir a mi perfil">
                  <div class="profile-photo">
                    <img
                      src="https://res.cloudinary.com/dryaup5lw/image/upload/v1580902958/26e0a06c-1a2f-4590-84b8-387432fad7e4.jpg"
                      alt=""
                      name="profile photo"
                    />
                  </div>
                  <p>Mi perfil</p>
                </button>
              </Link>
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
                <img
                  src="https://img.icons8.com/ios/50/000000/summary-list.png"
                  alt=""
                />
                <p>Cerrar sesión</p>
              </button>
            </li>
          </ul>
        </nav>
      )}
      {!isAccessWindow && !isAuth && (
        <div>
          <Link to="/access">
            <button renderAs="button">ACCEDE O REGÍSTRATE</button>
          </Link>
        </div>
      )}
    </header>
  );
}
