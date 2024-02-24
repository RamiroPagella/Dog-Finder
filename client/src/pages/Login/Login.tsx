import style from "./login.module.scss";
import { Link } from "react-router-dom";
import { FormValidationError as ErrorIcon } from "../../assets/icons";
import useLoginForm from "../../hooks/useLoginForm";
import { useState } from "react";

const Login = () => {
  const { handleClick, handleChange, btnDisabled, showError, loginForm } =
    useLoginForm();
  const [showToolTip, setShowToolTip] = useState({
    email: false,
    password: false,
  });

  return (
    <>
      <div className={style.Login}>
        <h1 className={style.Title}>DOG - FINDER</h1>

        <div className={style.Form}>
          <label>
            <p className={style.InputTitle}>Correo Electronico</p>
            <input
              type="text"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
            />

            {showError.email ? (
              <div
                className={style.IconContainer}
                onMouseEnter={() => {
                  setShowToolTip({ ...showToolTip, email: true });
                }}
                onMouseLeave={() => {
                  setShowToolTip({ ...showToolTip, email: false });
                }}
              >
                <ErrorIcon className={style.icon} />
                {showToolTip.email ? <p>No existe ese usuario</p> : null}
              </div>
            ) : null}
          </label>

          <label>
            <p className={style.InputTitle}>Contraseña</p>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
            />
            {showError.password ? (
              <div
                className={style.IconContainer}
                onMouseEnter={() => {
                  setShowToolTip({ ...showToolTip, password: true });
                }}
                onMouseLeave={() => {
                  setShowToolTip({ ...showToolTip, password: false });
                }}
              >
                <ErrorIcon className={style.icon} />
                {showToolTip.password ? <p>Contraseña incorrecta</p> : null}
              </div>
            ) : null}
          </label>

          <button
            disabled={btnDisabled}
            onClick={handleClick}
            className={`${style.button} ${btnDisabled ? style.button_disabled : ""}`}
          >
            Iniciar sesión
          </button>
        </div>

        <div className={style.bottomButtons}>
          <Link to={"/register"} className={style.bottomButton}>
            Registrarse
          </Link>
          <Link to={"/"} className={style.bottomButton}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
