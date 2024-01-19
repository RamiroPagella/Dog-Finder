import style from "./landing.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../axios";
import { Tooltip } from "react-tooltip";
import { FormValidationError as ErrorIcon } from "../../icons/FormValidationError";

interface LoginForm {
  email: "";
  password: "";
}

const Landing = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [showToolTip, setShowToolTip] = useState({
    email: false,
    password: false,
  });
  const btnDisabled: boolean = !(
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(loginForm.email) &&
    loginForm.password.length >= 6
  );
  //a diferencia del componente Register, los errores se muestran solo en caso de contraseña incorrecta o usuario inexistente, no por validaciones

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleClick = () => {
    setShowToolTip({
      email: false,
      password: false,
    });
    const { email, password } = loginForm;
    if (!email || !password) return;

    axiosInstance
      .post("/login", { email, password })
      .then(({ data }) => {
        if (!data.authenticated) {
          throw new Error(data.message);
        }
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          if (err.response.status === 404)
            setShowToolTip({ email: true, password: false });
          if (err.response.status === 401)
            setShowToolTip({ email: false, password: true });
        }
      });
  };

  return (
    <div className={style.Landing}>
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

export default Landing;
