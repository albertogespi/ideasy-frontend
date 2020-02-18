import React, { useState, useEffect } from "react";

import { Header } from "../components/Header";
import { getAvgRatings } from "../http/projectsService";
import { getContributedProjects } from "../http/projectsService";
import { getUser } from "../http/userService";
import { SimpleRating } from "../components/Rating";

export function User() {
  const userId = window.location.href.split("/")[4];

  const [user, setUser] = useState(undefined);
  const [rating, setRating] = useState(undefined);

  useEffect(() => {
    getUser(userId).then(response => {
      setUser(response.data);
    });
    getAvgRatings(userId).then(response => {
      setRating(response.data);
    });
  }, []);

  if (user !== undefined && rating !== undefined) {
    console.log(user);
    return (
      <main>
        <Header isAccessWindow={false} />
        <div className="centered-container">
          <section className="centered-container" id="user-container">
            <div className="profile-photo">
              <img src={user.avatarUrl} alt="" name="profile photo"></img>
            </div>
            <h1>{user.name}</h1>
            <p>{user.role === "dev" ? "Desarrollador" : "Organización"}</p>
            <div className="centered-container" id="rating">
              {user.role === "dev" && (
                <div className="centered-container">
                  <SimpleRating readOnly={true} id="stars" />
                  <p>Puntuación media</p>
                  {rating
                    ? `${rating} estrellas`
                    : "Este usuario aún no ha recibido puntuaciones."}
                </div>
              )}
            </div>
            <div className="centered-container" id="contact">
              <h2>Contacto</h2>
              <p>{user.contactEmail || user.email}</p>
              {user.contactWeb !== "NULL" && (
                <a href={user.contactWeb}>Enlace web</a>
              )}
            </div>
          </section>
        </div>
      </main>
    );
  } else {
    return <p>Cargando datos de usuario...</p>;
  }
}
