import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEventHandler } from "react";
import authService from "../services/auth.service";

function Register() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [error, setError] = useState("");

	const navigate = useNavigate();

	const submitRegister: FormEventHandler = async (e) => {
		e.preventDefault();

		try {
			const email = (emailRef.current as HTMLInputElement).value;
			const password = (passwordRef.current as HTMLInputElement).value;

			const response = await authService.register(email, password);

			if (response.status === 201) navigate("/login");
			else setError("Veuillez remplir tout les champs");
		} catch (error) {
			console.error(error);
			setError("Une erreur est survenue...");
		}
	};

	return (
		<>
			{error && error}
			<form onSubmit={submitRegister}>
				<label htmlFor="email">Email :</label>
				<input type="email" name="email" id="email" ref={emailRef} />

				<label htmlFor="password">Password :</label>
				<input
					type="password"
					name="password"
					id="password"
					ref={passwordRef}
				/>

				<input type="submit" value="S'inscrire" />
			</form>
		</>
	);
}

export default Register;
