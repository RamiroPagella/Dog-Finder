import style from "./favorites.module.scss";
import NoSession from "../../components/NoSession/NoSession";
import { useState } from "react";

const Favorites = () => {
 
  return (
    <div className={style.Favorites}>
      <NoSession path={"favorites"} />

      
    </div>
  );
};
export default Favorites;
