import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getProfile, updateProfile, uploadAvatar } from "../http/userService";

export function MyProfile() {
  //esta parte gestiona cambiar el avatar

  const [file, setFile] = useState();
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = e => {
    setFile(e.target.files);
    setIsEmpty(false);
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("avatar", file[0]);

    uploadAvatar(data)
      .then(response => {
        setFile(null);
        getProfile().then(response => {
          setUser(response.data);
          localStorage.setItem("profileUser", JSON.stringify(response.data));
          window.location.reload();
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  //a partir de aquí se gestiona cambiar los datos de perfil

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

  const storedUser = JSON.parse(localStorage.getItem("profileUser"));

  const { currentUser, jwt } = useAuth();

  const [user, setUser] = useState(storedUser || currentUser);

  const handleUpdate = formData => {
    return updateProfile(formData)
      .then(response => {
        getProfile().then(response => {
          setUser(response.data);
          localStorage.setItem("profileUser", JSON.stringify(response.data));
          window.location.reload();
        });
      })
      .catch(error => {
        setValue("password", "");
        setError(
          "password",
          "credentials",
          "Contraseña incorrecta o datos enviados no válidos"
        );
      });
  };

  let isOrgProfile = jwt.role === "org";

  return (
    <section className="container" id="myProfile">
      <Header />
      <section id="home-body">
        <section className="centered-container">
          <div className="centered-container" id="myProfile-top">
            <Link className="centered-container" to={`/user/${jwt.userId}`}>
              <div className="profile-photo" id="big-icon">
                <img
                  src={
                    user.avatarUrl || require("../images/default-avatar.jpg")
                  }
                  alt=""
                  name="profile photo"
                ></img>
              </div>
              <h1 className="profile-name">{user.name}</h1>
            </Link>

            <div>
              <label for="input-avatar" id="select-avatar">
                {file ? file[0].name : "Seleccionar foto"}
              </label>
              <input type="file" id="input-avatar" onChange={handleChange} />

              <button
                className="form"
                type="button"
                disabled={isEmpty}
                onClick={handleUpload}
              >
                Cambiar foto
              </button>
            </div>
          </div>
        </section>
        <section className="centered-container" id="profile-form">
          <form
            className="centered-container"
            id="profile"
            onSubmit={handleSubmit(handleUpdate)}
          >
            <fieldset className="profile">
              <div className="form-title">
                <legend>Datos de acceso</legend>
              </div>

              <ul>
                <li>
                  <label for="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user.name}
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
                      defaultValue={user.surname === "NULL" ? "" : user.surname}
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
                    value={user.email}
                    readOnly
                  ></input>
                </li>
                <li>
                  <label for="password">Contraseña actual</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Introduzca contraseña actual"
                    ref={register({
                      required:
                        "La contraseña es obligatoria para modificar sus datos"
                    })}
                  ></input>
                  {errors.password && (
                    <span className="errorMessage">
                      {errors.password.message}
                    </span>
                  )}
                </li>
                <li>
                  <label for="new-password">Nueva contraseña</label>
                  <input
                    type="password"
                    id="new-password"
                    name="newPassword"
                    placeholder="Introduzca nueva contraseña"
                    ref={register({
                      minLength: {
                        message:
                          "La nueva contraseña debe tener como mínimo 6 caracteres",
                        value: 6
                      }
                    })}
                  ></input>
                  {errors.newPassword && (
                    <span className="errorMessage">
                      {errors.newPassword.message}
                    </span>
                  )}
                </li>
              </ul>
            </fieldset>
            <fieldset className="profile">
              <div className="form-title">
                <legend>Datos de contacto</legend>
              </div>
              <ul>
                <li>
                  <label for="contact-email">Correo</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="contactEmail"
                    defaultValue={user.contactEmail || user.email}
                    ref={register}
                  ></input>
                </li>
                <li>
                  <label for="contact-web">Página web</label>
                  <input
                    type="url"
                    id="contact-web"
                    name="contactWeb"
                    defaultValue={
                      user.contactWeb === "NULL" ? "" : user.contactWeb
                    }
                    placeholder="Introduzca su página web, perfil de Linkedin..."
                    ref={register}
                  ></input>
                </li>
              </ul>
            </fieldset>
            <button
              className="form"
              type="submit"
              disabled={formState.isSubmitting}
            >
              Modificar mis datos
            </button>
          </form>
        </section>
      </section>
      <Footer />
    </section>
  );
}
