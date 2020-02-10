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
		setValue,
	} = useForm({
		mode: "onBlur",
	});
	const history = useHistory();
	const { setJwt, setCurrentUser } = useAuth();

	// Handle functions //
	const handleRegister = (formData) => {
		createAccount(formData);
	};

	const handleLogin = (formData) => {
		return login(formData)
			.then((response) => {
				setJwt(jwt_decode(response.data.accessToken));
				setCurrentUser(response.data);
				history.push("/");
			})
			.catch((error) => {
				setValue("password", "");
				setError("password", "credentials", "The credentials are invalid");
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
		<section className='container'>
			<Header isAccessWindow={true} isLoged={false} />
			<main className='accessWindow'>
				<section className='centered-container'>
					<header>
						<h1>{isRegisterWindow ? "REGÍSTRATE" : "ACCEDE"}</h1>
					</header>
					<div className='centered-container'>
						<p>¿{isRegisterWindow ? "Ya" : "No"} tienes una cuenta?</p>
						<button onClick={changeWindow}>
							{isRegisterWindow ? "ACCEDER A MI CUENTA" : "CREAR UNA CUENTA"}
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
							<fieldset id='roles'>
								<legend>Tipo de usuario</legend>
								<ul>
									<li>
										<input
											id='dev'
											type='radio'
											name='role'
											value='dev'
											defaultChecked
											aria-checked={!isOrg}
											onClick={() => setIsOrg(false)}
										></input>
										<label for='dev'>Desarrollador</label>
									</li>
									<li>
										<input
											id='org'
											type='radio'
											name='role'
											value='org'
											aria-checked={isOrg}
											onClick={() => setIsOrg(true)}
										></input>
										<label for='org'>Organización</label>
									</li>
								</ul>
							</fieldset>
						)}
						{isRegisterWindow && (
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
									{!isOrg && (
										<li>
											<label for='surname'>Apellidos</label>
											<input id='surname' type='text' name='surname'></input>
										</li>
									)}
								</ul>
							</fieldset>
						)}
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
								{isRegisterWindow ? "CREAR CUENTA" : "ACCEDER"}
							</button>
						</div>
					</form>
				</section>
			</main>
		</section>
	);
}
