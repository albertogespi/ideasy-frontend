import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../http/accountService";
import jwt_decode from "jwt-decode";
import { useAuth } from "../context/authContext";

export function Login() {
  const {
    handleSubmit,
    register,
    errors,
    formState,
    setError,
    setValue
  } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();
  const { setJwt, setCurrentUser } = useAuth();

  const handleLogin = formData => {
    return login(formData)
      .then(response => {
        //setJwt(jwt_decode(response.data.accessToken));
        //setCurrentUser(response.data);
        history.push("/");
      })
      .catch(error => {
        setValue("password", "");
        setError("password", "credentials", "The credentials are invalid");
      });
  };

  return (
    <main>
      <h3>Inicia Sesión</h3>
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <div>
          <label for="email">Email</label>
          <input
            ref={register({
              required: "El email es obligatorio",
              pattern: {
                message: "Email no válido",
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              }
            })}
            id="email"
            name="email"
            type="email"
          ></input>
          {errors.email && (
            <span className="errorMessage">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input
            ref={register({
              required: "La contraseña es obligatoria",
              minLength: {
                message: "La contraseña debe tener como mínimo 6 caracteres",
                value: 6
              }
            })}
            id="password"
            name="password"
            type="password"
          ></input>
          {errors.password && (
            <span className="errorMessage">{errors.password.message}</span>
          )}
        </div>
        <div>
          <button type="submit" disabled={formState.isSubmitting}>
            Acceder
          </button>
          <div>
            <Link to="/register">Aún no tengo una cuenta</Link>
          </div>
        </div>
      </form>
    </main>
  );
}
