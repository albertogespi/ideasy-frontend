import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { getUser } from "../http/userService";

export function User() {
  const userId = window.location.href.split("/")[4];
  console.log(userId);

  const [user, setUser] = useState(undefined);
  useEffect(() => {
    getUser(userId).then(response => {
      setUser(response.data);
    });
  }, []);

  if (user !== undefined) {
    console.log(user);
    return (
      <main>
        <Header isAccessWindow={false} />
        <section className="centered-container">
          <div className="profile-photo">
            <img src={user.avatarUrl} alt="" name="profile photo"></img>
          </div>
          <p>{user.role === "dev" ? "Desarrollador" : "Organización"}</p>
          <h1 className="profile-name">{user.name}</h1>
          <div>
            <h2>Contacto</h2>
            <p>Email: {user.contactEmail || user.email}</p>
            {user.contactWeb && <p>Web: {user.contactWeb}</p>}
          </div>
        </section>
      </main>
    );
  } else {
    return <p>Cargando datos de usuario...</p>;
  }
}
