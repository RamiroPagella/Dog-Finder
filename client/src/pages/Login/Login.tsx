import style from "./login.module.scss";
import { Link } from "react-router-dom";
import { FormValidationError as ErrorIcon } from "../../assets/icons";
import useLoginForm from "../../hooks/useLoginForm";
import { useEffect, useState } from "react";

const Login = () => {
  const { handleSubmit, handleChange, isBtnDisabled, showError, loginForm } =
    useLoginForm();
  const [showToolTip, setShowToolTip] = useState({
    email: false,
    password: false,
  });
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
    <>
      <div className={style.Login}>
        <h1 className={style.Title}>DOG - FINDER</h1>

        <form className={style.Form} onSubmit={handleSubmit}>
          <label>
            <p className={style.InputTitle}>Correo Electronico</p>
            <div className={style.inputContainer}>
              <input
                type="text"
                name="email"
                value={loginForm.email}
                onChange={handleChange}
              />

              {showError.email && (
                <div
                  className={style.iconContainer}
                  onMouseEnter={() => {
                    setShowToolTip({ ...showToolTip, email: true });
                  }}
                  onMouseLeave={() => {
                    setShowToolTip({ ...showToolTip, email: false });
                  }}
                >
                  <ErrorIcon className={style.icon} />
                  {(showToolTip.email || vwLowerThan790) && (
                    <p>Usuario no encontrado</p>
                  )}
                </div>
              )}
            </div>
          </label>

          <label>
            <p className={style.InputTitle}>Contraseña</p>

            <div className={style.inputContainer}>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleChange}
              />
              {showError.password && (
                <div
                  className={style.iconContainer}
                  onMouseEnter={() => {
                    setShowToolTip({ ...showToolTip, password: true });
                  }}
                  onMouseLeave={() => {
                    setShowToolTip({ ...showToolTip, password: false });
                  }}
                >
                  <ErrorIcon className={style.icon} />
                  {(showToolTip.password || vwLowerThan790) && (
                    <p>Contraseña incorrecta</p>
                  )}
                </div>
              )}
            </div>
          </label>

          <button
            disabled={isBtnDisabled}
            className={`${isBtnDisabled ? style.button_disabled : ""}`}
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>

        <div className={style.bottomButtons}>
          <Link to={"/register"}>Registrarse</Link>
          <Link to={"/"}>Volver al inicio</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
