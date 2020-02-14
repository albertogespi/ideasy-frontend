import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Header } from "../components/Header";
import { getProfile, updateProfile, uploadAvatar } from "../http/userService";

export function MyProfile() {
  //esta parte gestiona cambiar el avatar

  const [file, setFile] = useState();

  const handleChange = e => {
    console.log(e.target.files);
    setFile(e.target.files);
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("avatar", file[0]);
    console.log(file[0]);
    console.log(data);

    uploadAvatar(data)
      .then(response => {
        setFile(null);
        getProfile().then(response => {
          setUser(response.data);
          localStorage.setItem("profileUser", JSON.stringify(response.data));
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
  const [reset, setReset] = useState(false);

  const handleUpdate = formData => {
    return updateProfile(formData)
      .then(response => {
        getProfile().then(response => {
          setUser(response.data);
          setReset(true);
          localStorage.setItem("profileUser", JSON.stringify(response.data));
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  let isOrgProfile = jwt.role === "org";

  return (
    <section className="container, myProfile">
      <Header />
      <section className="centered-container">
        <div className="profile-photo">
          <img src={user.avatarUrl} alt="" name="profile photo"></img>
        </div>
        <h1>{user.name}</h1>

        <div>
          <input type="file" onChange={handleChange} />

          <button type="button" onClick={handleUpload}>
            Cambiar Foto
          </button>
        </div>
      </section>
      <section className="centered-container">
        <form name="form1" onSubmit={handleSubmit(handleUpdate)}>
          <fieldset>
            <div className="form-title">
              <p>Datos personales</p>
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
            <div className="form-title">
              <p>Datos de contacto</p>
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
          <button type="submit" disabled={formState.isSubmitting}>
            Modificar mis datos
          </button>
        </form>
      </section>
    </section>
  );
}
