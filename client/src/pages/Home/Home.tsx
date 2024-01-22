import style from "./home.module.scss";
import { useState } from "react";

const Home = () => {


  return (
    <div className={style.Home}>
      <h1>Home</h1>
      <p>
        En esta seccion podras explorar dentro de un universo de caninos con caracteristicas unicas. 
      </p>

      <div className={style.Filters}>

      </div>
      
    </div>
  );
};

export default Home;
