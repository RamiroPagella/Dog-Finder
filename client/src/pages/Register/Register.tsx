import style from "./register.module.scss";
import { FormValidationError as ErrorIcon } from "../../assets/icons";
import useRegisterForm from "../../hooks/useRegisterForm";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  const { handleSubmit, handleChange, registerForm, validations, btnDisabled } =
    useRegisterForm();
  const [showTooltip, setShwowTooltip] = useState<string>("");

  return (
    <div className={style.Register}>
      <h1 className={style.Title}>Registrarse</h1>

      <form className={style.Form} onSubmit={handleSubmit}>
        <label>
          <p>Nombre de usuario</p>
          <input
            type="text"
            name="username"
            value={registerForm.username}
            onChange={handleChange}
          />
          {!validations.username ? (
            <div
              className={style.iconContainer}
              onMouseEnter={() => setShwowTooltip("username")}
              onMouseLeave={() => setShwowTooltip("")}
            >
              <ErrorIcon />
              {showTooltip === "username" ? (
                <p className={style.toolTip}>Ingresa un nombre de usuario</p>
              ) : null}
            </div>
          ) : null}
        </label>
        <label>
          <p>Correo electronico</p>
          <input
            type="text"
            name="email"
            value={registerForm.email}
            onChange={handleChange}
          />
          {!validations.email ? (
            <div
              className={style.iconContainer}
              onMouseEnter={() => setShwowTooltip("email")}
              onMouseLeave={() => setShwowTooltip("")}
            >
              <ErrorIcon />
              {showTooltip === "email" ? (
                <p className={style.toolTip}>
                  Ingresa un correo electronico valido
                </p>
              ) : null}
            </div>
          ) : null}
        </label>
        <label>
          <p>Contraseña</p>
          <input
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleChange}
          />
          {!validations.password ? (
            <div
              className={style.iconContainer}
              onMouseEnter={() => setShwowTooltip("password")}
              onMouseLeave={() => setShwowTooltip("")}
            >
              <ErrorIcon />
              {showTooltip === "password" ? (
                <p className={style.toolTip}>
                  Ingresa una contraseña mayor a 6 caracteres
                </p>
              ) : null}
            </div>
          ) : null}
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
