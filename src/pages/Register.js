import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect, useHistory } from "react-router-dom";
import { createAccount } from "../http/accountService";
import { Header } from "../components/Header";

export function Register() {
	const { register, errors, formState, handleSubmit, setError } = useForm({
		mode: "onBlur",
	});
	const history = useHistory();
	const [redirect, setRedirect] = useState(false);

	const handleRegister = (formData) => {
		return createAccount(formData)
			.then(() => {
				setRedirect(true);
				history.push("/");
			})
			.catch((error) => {
				if (error.response.status === 409) {
					setError("email", "conflicto", "El email introducido ya existe");
				}
			});
	};

	if (redirect) {
		return <Redirect to='/login' />;
	}

	return (
		<body className='register'>
			<Header />
			<main>
				<section className='centered-container'>
					<header>
						<h1>REGÍSTRATE</h1>
					</header>
					<form onSubmit={handleSubmit(handleRegister)} noValidate>
						<fieldset id='roles'>
							<legend>Tipo de usuario</legend>
							<ul>
								<li>
									<input
										id='dev'
										type='radio'
										name='role'
										value='Desarrollador'
										checked
										aria-checked='true'
									></input>
									<label for='dev'>Desarrollador</label>
								</li>
								<li>
									<input
										id='org'
										type='radio'
										name='role'
										value='Organización'
										aria-checked='false'
									></input>
									<label for='org'>Organización</label>
								</li>
							</ul>
						</fieldset>
						<fieldset>
							<legend>Datos personales</legend>
							<ul>
								<li>
									<label for='name'>Nombre</label>
									<input
										id='name'
										type='text'
										ref={register({ required: "El nombre es obligatorio" })}
										name='name'
										aria-required='true'
									></input>
									{errors.name && (
										<span className='errorMessage'>{errors.name.message}</span>
									)}
								</li>
								<li>
									<label for='surname'>Apellidos</label>
									<input id='surname' type='text' name='surname'></input>
								</li>
							</ul>
						</fieldset>
						<fieldset>
							<legend>Datos de acceso</legend>
							<ul>
								<li>
									<label for='email'>Email</label>
									<input
										id='email'
										type='email'
										ref={register({
											required: "El email es obligatorio",
											pattern: {
												message: "Email no válido",
												value: /^(([^ <>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											},
										})}
										name='email'
										aria-required='true'
									></input>
									{errors.email && (
										<span className='errorMessage'>{errors.email.message}</span>
									)}
								</li>
								<li>
									<label for='password'>Contraseña</label>
									<input
										id='password'
										type='password'
										ref={register({
											required: "La contraseña es obligatoria",
											minLength: {
												message: "La contraseña debe tener como mínimo 6 caracteres",
												value: 6,
											},
										})}
										name='password'
										aria-required='true'
									></input>
									{errors.password && (
										<span className='errorMessage'>{errors.password.message}</span>
									)}
								</li>
							</ul>
						</fieldset>
						<div>
							<button type='submit' disabled={formState.isSubmitting}>
								Crear
							</button>
						</div>
					</form>
				</section>
			</main>
		</body>
	);
}
