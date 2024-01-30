import style from "./favorites.module.scss";
import NoSession from "../../components/NoSession/NoSession";
import { useState, useEffect } from 'react'; 
import { Heart } from "../../icons/navBarIcons";

const Favorites = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
 
  
  return (
    <div className={style.Favorites}>
      {/* <NoSession path={"favorites"} /> */}
      
      <div className={style.el1}>el1</div>

      <div className={style.el2}>el2</div>

    </div>
  );
};
export default Favorites;
