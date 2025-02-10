import { useContext, useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Auth from "../context/auth";
import type { authContextType } from '../context/auth';


function Login() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useContext(Auth) as authContextType;

  const submitLogin : FormEventHandler = async (event) => {
			event.preventDefault();

			try {
        const email = (emailRef.current as HTMLInputElement).value;
        const password = (passwordRef.current as HTMLInputElement).value;
      
				const response = await authService.login(email, password);
        
        if (response.status === 200) {
          const user = await response.json();
          console.log(user);
          auth?.setUser(user);
          navigate("/dashboard"); 
        }
        else setError("Veuillez remplir tout les champs.");
			} catch (error) {
				console.error(error);
				setError("Une erreur est survenue..");
			}
		}

	return (
		<>
			{error && error}
			<form onSubmit={submitLogin}>
				<label htmlFor="email">Email : </label>
				<input type="email" id="email" name="email" ref={emailRef} />
				<label htmlFor="password">Password : </label>
				<input
					type="password"
					id="password"
					name="password"
					ref={passwordRef}
				/>
				<input type="submit" value="Se connecter" />
			</form>
		</>
	);
}

export default Login;
