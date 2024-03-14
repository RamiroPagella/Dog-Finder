import { useUserContext } from "../../../hooks/contextHooks";
import style from "./profileHeader.module.scss";

interface Props {
  setTogglePage: React.Dispatch<
    React.SetStateAction<"MyProfile" | "PendingDogs">
  >;
  togglePage: "MyProfile" | "PendingDogs";
}

const ProfileHeader = ({ setTogglePage, togglePage }: Props) => {
  const { User } = useUserContext();

  return (
    <div className={style.ProfileHeader}>
      <h1>Mi cuenta</h1>

      {User?.admin ? (
        <div className={style.buttons}>
          <button
            onClick={() => {
              setTogglePage("MyProfile");
            }}
            className={togglePage === "MyProfile" ? style.btnSelected : ""}
          >
            Mi perfil
          </button>
          <button
            onClick={() => {
              setTogglePage("PendingDogs");
            }}
            className={togglePage === "PendingDogs" ? style.btnSelected : ""}
          >
            Perros pendientes
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileHeader;
