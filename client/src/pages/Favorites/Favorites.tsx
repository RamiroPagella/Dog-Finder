import style from "./favorites.module.scss";
import NoSession from "../../components/NoSession/NoSession";


const Favorites = () => {


  return (
    <div className={style.Favorites}>
      <NoSession path={"favorites"} />

      
    </div>
  );
};
export default Favorites;
