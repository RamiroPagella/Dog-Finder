import style from "./register.module.scss";
import { FormValidationError as ErrorIcon } from "../../icons/FormValidationError";
import useRegisterForm from "../../hooks/useRegisterForm";



const Register = () => {
    const { handleClick, handleChange, registerForm, validations, btnDisabled } = useRegisterForm();

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
            <ErrorIcon
              className={style.Icon}
              data-tooltip-id="username"
              data-tooltip-content={"Ingresa un nombre de usuario"}
            />
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
            <ErrorIcon
              className={style.Icon}
              data-tooltip-id="email"
              data-tooltip-content={"Ingresa un correo electronico valido"}
            />
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
            <ErrorIcon
              className={style.Icon}
              data-tooltip-id="password"
              data-tooltip-content="Ingresa una contraseña mayor a 6 caracteres"
            />
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
