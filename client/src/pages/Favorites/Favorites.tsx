import style from "./favorites.module.scss";
import NoSession from "../../components/NoSession/NoSession";
import { useUserContext } from "../../hooks/contextHooks";
import FavCards from "../../components/FavComponents/FavCards/FavCards";
import FavPaginationBar from "../../components/FavComponents/FavPaginationBar/FavPaginationBar";
import Header from "../../components/Header/Header";

const Favorites = () => {
  const {
    isAuthenticated,
  } = useUserContext();
  

  return (
    <div className={style.Favorites}>
      {!isAuthenticated ? (
        <NoSession path="favorites" />
      ) : (
        <>
          <Header path='favorites'/>

          <FavCards/>

          <FavPaginationBar />
        </>
      )}
    </div>
  );
};
export default Favorites;
