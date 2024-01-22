import style from "./login.module.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { FormValidationError as ErrorIcon } from "../../icons/FormValidationError";
import useLoginForm from "../../hooks/useLoginForm";

const Login = () => {
  const {handleClick, handleChange, btnDisabled, showToolTip, loginForm} = useLoginForm();

  return (
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
          <Tooltip id="email" />
          {showToolTip.email ? (
            <ErrorIcon
              className={style.Icon}
              data-tooltip-id="email"
              data-tooltip-content={"No existe tal usuario."}
            />
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
          <Tooltip id="password" />
          {showToolTip.password ? (
            <ErrorIcon
              className={style.Icon}
              data-tooltip-id="password"
              data-tooltip-content={"Contraseña incorrecta."}
            />
          ) : null}
        </label>

        <button
          disabled={btnDisabled}
          onClick={handleClick}
          style={btnDisabled ? { pointerEvents: "none" } : {}}
        >
          Iniciar sesión
        </button>
      </div>

      <Link to={"/register"} className={style.Register}>
        Registrarse
      </Link>
    </div>
  );
};

export default Login;
