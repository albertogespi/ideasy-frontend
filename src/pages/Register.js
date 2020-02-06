import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect, useHistory } from "react-router-dom";
import { createAccount } from "../http/accountService";
import { useAuth } from "../context/authContext";

export function Register() {
  const { register, errors, formState, handleSubmit, setError } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);

  const handleRegister = formData => {
    return createAccount(formData)
      .then(() => {
        setRedirect(true);
        history.push("/");
      })
      .catch(error => {
        if (error.response.status === 409) {
          setError("email", "conflicto", "El email introducido ya existe");
        }
      });
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <main>
      <h3>REGÍSTRATE</h3>
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <div>
          <input type="radio" id="org" name="role"></input>
          <label for="org">Organización</label>
          <input type="radio" id="dev" name="role"></input>
          <label for="dev">Desarrollador</label>
        </div>
        <div>
          <label for="name">Nombre</label>
          <input
            ref={register({
              required: "El nombre es obligatorio"
            })}
            type="text"
            id="name"
            name="name"
          ></input>
          {errors.name && (
            <span className="errorMessage">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label for="surname">Apellidos</label>
          <input type="text" id="surname" name="surname"></input>
        </div>
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
            Crear
          </button>
          <div>
            <Link to="/login">Ya tengo una cuenta, quiero iniciar sesión</Link>
          </div>
        </div>
      </form>
    </main>
  );
}
