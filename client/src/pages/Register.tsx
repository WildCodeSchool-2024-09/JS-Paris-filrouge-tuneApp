import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEventHandler } from "react";

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateRegister: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: (emailRef.current as HTMLInputElement).value,
          password: (passwordRef.current as HTMLInputElement).value,
        }),
      });

      if (result.status === 201) navigate("/login");
      else setError("Veuillez remplir tout les champs");
    } catch (error) {
      console.error(error);
      setError("Une erreur est survenue...");
    }
  };

  return (
    <>
      {error && error}
      <form onSubmit={validateRegister}>
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
