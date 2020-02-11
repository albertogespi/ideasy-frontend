import React from "react";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { getUser } from "../http/userService";

export function MyProfile() {
	const { formState, handleSubmit } = useForm({
		mode: "onBlur",
	});

	const user = getUser().then((response) => {
		return response.data;
	});

	let isOrgProfile = user.role === "org";

	const handleUpdate = (formData) => {};

	return (
		<section className='container, myProfile'>
			<Header />
			<section className='centered-container'>
				<div className='profile-photo'>
					<img src={user.avatar_url} alt='' name='profile photo'></img>
				</div>
				<h1>{user.name}</h1>
			</section>
			<section className='centered-container'>
				<form onSubmit={handleSubmit(handleUpdate)}>
					<fieldset>
						<legend>Datos personales</legend>
						<ul>
							<li>
								<label for='name'>Nombre</label>
								<input
									type='text'
									id='name'
									name='name'
									placeholder={user.name}
								></input>
							</li>
							{!isOrgProfile && (
								<li>
									<label for='surname'>Apellidos</label>
									<input
										type='text'
										id='surname'
										name='surname'
										placeholder={user.surname}
									></input>
								</li>
							)}
							<li>
								<label for='email'>Email</label>
								<input
									type='email'
									id='email'
									name='email'
									placeholder={user.email}
								></input>
							</li>
							<li>
								<label for='password'>Contraseña actual</label>
								<input
									type='password'
									id='password'
									name='password'
									placeholder='Introduzca contraseña actual para cambiarla'
								></input>
							</li>
							<li>
								<label for='new-password'>Nueva contraseña</label>
								<input
									type='password'
									id='new-password'
									name='new-password'
									placeholder='Introduzca su nueva contraseña'
								></input>
							</li>
							<li>
								<label for='avatar'>Cambiar Imagen</label>
								<input
									type='file'
									id='avatar'
									name='avatar'
									accept='image/png, image/jpeg, image/jpg'
								></input>
							</li>
						</ul>
					</fieldset>
					<fieldset>
						<legend>Datos de contacto</legend>
						<ul>
							<li>
								<label for='contact-email'>Correo</label>
								<input
									type='email'
									id='contact-email'
									name='contact-email'
									placeholder='Introduzca email de contacto'
								></input>
							</li>
							<li>
								<label for='contact-web'>Página web</label>
								<input
									type='url'
									id='contact-web'
									name='contact-web'
									placeholder='Introduzca su página web, perfil de Linkedin...'
								></input>
							</li>
						</ul>
					</fieldset>
					<button type='submit' disabled={formState.isSubmitting}>
						Cambiar datos de contacto
					</button>
				</form>
			</section>
		</section>
	);
}
