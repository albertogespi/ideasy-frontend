import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { login, createAccount } from "../http/accountService";
import { Header } from "../components/Header";
import { useAuth } from "../context/authContext";
import jwt_decode from "jwt-decode";

export function AccessWindow() {
  // Variables //

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
  const history = useHistory();
  const { setIsAuth, setJwt, setCurrentUser } = useAuth();

  // Handle functions //
  const handleRegister = formData => {
    return createAccount(formData)
      .then(response => {
        const { email, password } = formData;
        handleLogin({ email, password });
      })
      .catch(error => {
        if (error.response.status === 409) {
          setError("email", "conflicto", "El email introducido ya existe");
        }
      });
  };

  const handleLogin = formData => {
    return login(formData)
      .then(response => {
        setIsAuth(true);
        setJwt(jwt_decode(response.data.accessToken));
        setCurrentUser(response.data);
        localStorage.removeItem("profileUser");
        history.push("/");
      })
      .catch(error => {
        setValue("password", "");
        setError(
          "password",
          "credentials",
          "El email o la contraseña no son correctos"
        );
      });
  };

  // Change login to register window hook //
  const [isRegisterWindow, setIsRegisterWindow] = useState(false);

  const changeWindow = () => {
    setIsRegisterWindow(!isRegisterWindow);
  };

  // Change dev to org register profile hook //
  const [isOrg, setIsOrg] = useState(false);

  return (
    <section className="container" id="total-screen">
      <Header isAccessWindow={true} />
      <main className="accessWindow">
        <section className="centered-container" id="access-form">
          <header>
            <h1>{isRegisterWindow ? "REGÍSTRATE" : "ACCEDE"}</h1>
          </header>
          <div className="centered-container" id="access">
            <p>¿{isRegisterWindow ? "Ya" : "No"} tienes una cuenta?</p>
            <button className="gray" onClick={changeWindow}>
              {isRegisterWindow ? "ACCEDER A MI CUENTA" : "REGISTRARME"}
            </button>
          </div>
          <form
            onSubmit={
              isRegisterWindow
                ? handleSubmit(handleRegister)
                : handleSubmit(handleLogin)
            }
            noValidate
          >
            {isRegisterWindow && (
              <fieldset id="roles">
                <legend>Selecciona tu rol</legend>
                <ul>
                  <li>
                    <input
                      id="dev"
                      type="radio"
                      value="dev"
                      defaultChecked
                      name="role"
                      onClick={() => setIsOrg(false)}
                      ref={register}
                    ></input>
                    <label for="dev">Desarrollador</label>
                  </li>
                  <li>
                    <input
                      id="org"
                      type="radio"
                      value="org"
                      name="role"
                      onClick={() => setIsOrg(true)}
                      ref={register}
                    ></input>
                    <label for="org">Organización</label>
                  </li>
                </ul>
              </fieldset>
            )}
            {isRegisterWindow && (
              <fieldset id="user-data">
                <legend>Identificación</legend>
                <ul>
                  <li>
                    <input
                      id="name"
                      type="text"
                      placeholder={
                        isOrg ? "Nombre de la organización" : "Nombre"
                      }
                      ref={register({ required: "El nombre es obligatorio" })}
                      name="name"
                      aria-required="true"
                    ></input>
                    {errors.name && (
                      <span className="errorMessage">
                        {errors.name.message}
                      </span>
                    )}
                  </li>
                  {!isOrg && (
                    <li>
                      <input
                        id="surname"
                        type="text"
                        placeholder="Apellidos"
                        name="surname"
                        ref={register}
                      ></input>
                    </li>
                  )}
                </ul>
              </fieldset>
            )}
            <fieldset>
              <legend>Datos de acceso</legend>
              <ul>
                <li>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    ref={register({
                      required: "El email es obligatorio",
                      pattern: {
                        message: "Email no válido",
                        value: /^(([^ <>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      }
                    })}
                    name="email"
                    aria-required="true"
                  ></input>
                  {errors.email && (
                    <span className="errorMessage">{errors.email.message}</span>
                  )}
                </li>
                <li>
                  <input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    ref={register({
                      required: "La contraseña es obligatoria",
                      minLength: {
                        message:
                          "La contraseña debe tener como mínimo 3 caracteres",
                        value: 3
                      }
                    })}
                    name="password"
                    aria-required="true"
                  ></input>
                  {errors.password && (
                    <span className="errorMessage">
                      {errors.password.message}
                    </span>
                  )}
                </li>
              </ul>
            </fieldset>
            <div>
              <button
                className="form"
                type="submit"
                disabled={formState.isSubmitting}
              >
                {isRegisterWindow ? "CREAR CUENTA" : "ACCEDER"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </section>
  );
}
