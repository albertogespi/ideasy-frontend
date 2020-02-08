import React from "react";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { getUser } from "../http/userService";

export function MyProfile() {
  const user = getUser().then(response => {
    return response.data;
  });

  return (
    <main>
      <Header />
      <section>
        <img src={user.avatar_url} alt="" name="profile photo"></img>
        <p>{user.name}</p>
      </section>
      <section>
        <div>
          <label for="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={user.name}
          ></input>
          <button>Cambiar nombre</button>
        </div>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={user.email}
          ></input>
        </div>
        <div>
          <label for="password">Contraseña actual</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Introduzca contraseña actual para cambiarla"
          ></input>
          <label for="new-password">Nueva contraseña</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            placeholder="Introduzca su nueva contraseña"
          ></input>
          <button>Cambiar contraseña</button>
        </div>
        <div>
          <label for="avatar">Cambiar Imagen</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
          ></input>
        </div>
        <div>
          <h6>Datos de contacto</h6>
          <label for="contact-email">Correo</label>
          <input
            type="email"
            id="contact-email"
            name="contact-email"
            placeholder="Introduzca email de contacto"
          ></input>
          <label for="contact-web">Página web</label>
          <input
            type="url"
            id="contact-web"
            name="contact-web"
            placeholder="Introduzca su página web, perfil de Linkedin..."
          ></input>
          <button>Cambiar datos de contacto</button>
        </div>
      </section>
    </main>
  );
}
