import style from "./register.module.scss";
import { FormValidationError as ErrorIcon } from "../../assets/icons/FormValidationError";
import useRegisterForm from "../../hooks/useRegisterForm";
import { useState } from "react";

const Register = () => {
  const { handleClick, handleChange, registerForm, validations, btnDisabled } =
    useRegisterForm();
  const [showTooltip, setShwowTooltip] = useState<string>("");

  return (
    <div className={style.Register}>
      <h1 className={style.Title}>Registrarse</h1>

      <div className={style.Form}>
        <label>
          Nombre de usuario
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
          Correo electronico
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
          Contraseña
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
          onClick={handleClick}
          disabled={btnDisabled}
          style={btnDisabled ? { pointerEvents: "none" } : {}}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Register;
