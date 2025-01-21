import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { AppContextInterface } from "../types/appContext.type";
import authService from "../services/auth.service";


function Login() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useOutletContext<AppContextInterface>();

  const submitLogin : FormEventHandler = async (event) => {
			event.preventDefault();

			try {
        const email = (emailRef.current as HTMLInputElement).value;
        const password = (passwordRef.current as HTMLInputElement).value;
      
				const response = await authService.login(email, password);
        
        if (response.status === 200) {
          const user = await response.json();
          console.log(user);
          setUser(user);
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
