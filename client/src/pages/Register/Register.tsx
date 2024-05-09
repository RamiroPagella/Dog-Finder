import style from "./register.module.scss";
import { FormValidationError as ErrorIcon } from "../../assets/icons";
import useRegisterForm from "../../hooks/useRegisterForm";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  const { handleSubmit, handleChange, registerForm, validations, btnDisabled } =
    useRegisterForm();
  const [showTooltip, setShowTooltip] = useState<string>("");
  const [vwLowerThan790, setVwLowerThan790] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 790) setVwLowerThan790(true);
      else setVwLowerThan790(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className={style.Register}>
      <h1 className={style.Title}>Registrarse</h1>

      <form className={style.Form} onSubmit={handleSubmit}>
        <label>
          <p>Nombre de usuario</p>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="username"
              value={registerForm.username}
              onChange={handleChange}
            />
            {!validations.username && (
              <div className={style.iconContainer}>
                <ErrorIcon
                  onMouseEnter={() => setShowTooltip("username")}
                  onMouseLeave={() => setShowTooltip("")}
                />
                {(showTooltip === "username" || vwLowerThan790) && (
                  <p>Ingresa un nombre de usuario</p>
                )}
              </div>
            )}
          </div>
        </label>

        <label>
          <p>Correo electronico</p>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="email"
              value={registerForm.email}
              onChange={handleChange}
            />
            {!validations.email && (
              <div className={style.iconContainer}>
                <ErrorIcon
                  onMouseEnter={() => setShowTooltip("email")}
                  onMouseLeave={() => setShowTooltip("")}
                />
                {(showTooltip === "email" || vwLowerThan790) && (
                  <p>Ingresa un correo electronico valido</p>
                )}
              </div>
            )}
          </div>
        </label>
        <label>
          <p>Contraseña</p>
          <div className={style.inputContainer}>
            <input
              type="password"
              name="password"
              value={registerForm.password}
              onChange={handleChange}
            />
            {!validations.password && (
              <div className={style.iconContainer}>
                <ErrorIcon
                  onMouseEnter={() => setShowTooltip("password")}
                  onMouseLeave={() => setShowTooltip("")}
                />
                {(showTooltip === "password" || vwLowerThan790) && (
                  <p>Ingresa una contraseña mayor a 6 caracteres</p>
                )}
              </div>
            )}
          </div>
        </label>

        <button
          type="submit"
          disabled={btnDisabled}
          className={btnDisabled ? style.btnDisabled : ""}
        >
          Confirmar
        </button>
      </form>

      <div className={style.bottomButtons}>
        <NavLink to={"/login"}>Iniciar sesión</NavLink>
        <NavLink to={"/"}>Volver al inicio</NavLink>
      </div>
    </div>
  );
};

export default Register;
