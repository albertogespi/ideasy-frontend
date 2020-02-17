import React, { useState } from "react";
import { getUser } from "../http/userService";

export function User(userId) {
  const [user, setUser] = useState();
  getUser(userId).then(response => {
    setUser(response.data);
  });

  return (
    <main>
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
}
