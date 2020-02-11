import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { getProfile, updateProfile, uploadAvatar } from "../http/userService";

export function MyProfile() {
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

  const user = getProfile().then(response => {
    return response.data;
  });

  let isOrgProfile = user.role === "org";

  const handleUpdate = formData => {
    return updateProfile(formData)
      .then(response => {
        alert("Perfil actualizado");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUploadAvatar = formData => {
    return uploadAvatar(formData)
      .then(response => {
        alert("Foto de perfil actualizada");
        console.log(`todo bien`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <section className="container, myProfile">
      <Header />
      <section className="centered-container">
        <div className="profile-photo">
          <img src={user.avatar_url} alt="" name="profile photo"></img>
        </div>
        {/* <form onSubmit={handleSubmit(handleUploadAvatar)}>
          <label for="avatar">Cambiar Imagen</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            ref={register}
          ></input>
        </form> */}
        <h1>{user.name}</h1>
      </section>
      <section className="centered-container">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <fieldset>
            <legend>Datos personales</legend>
            <ul>
              <li>
                <label for="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={user.name}
                  ref={register}
                ></input>
              </li>
              {!isOrgProfile && (
                <li>
                  <label for="surname">Apellidos</label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    placeholder={user.surname}
                    ref={register}
                  ></input>
                </li>
              )}
              <li>
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={user.email}
                ></input>
              </li>
              <li>
                <label for="password">Contraseña actual</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Introduzca contraseña actual para modificar su perfil"
                  ref={register({
                    required: "La contraseña es obligatoria"
                  })}
                ></input>
              </li>
              <li>
                <label for="new-password">Nueva contraseña</label>
                <input
                  type="password"
                  id="new-password"
                  name="newPassword"
                  placeholder="Introduzca su nueva contraseña"
                  ref={register({
                    minLength: {
                      message:
                        "La nueva contraseña debe tener como mínimo 6 caracteres",
                      value: 6
                    }
                  })}
                ></input>
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <legend>Datos de contacto</legend>
            <ul>
              <li>
                <label for="contact-email">Correo</label>
                <input
                  type="email"
                  id="contact-email"
                  name="contactEmail"
                  placeholder={user.email}
                  ref={register}
                ></input>
              </li>
              <li>
                <label for="contact-web">Página web</label>
                <input
                  type="url"
                  id="contact-web"
                  name="contactWeb"
                  placeholder="Introduzca su página web, perfil de Linkedin..."
                  ref={register}
                ></input>
              </li>
            </ul>
          </fieldset>
          <button type="submit" disabled={formState.isSubmitting}>
            Modificar mis datos
          </button>
        </form>
      </section>
    </section>
  );
}
