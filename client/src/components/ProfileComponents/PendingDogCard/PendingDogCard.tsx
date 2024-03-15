import style from "./pendingDogCard.module.scss";
import { useState } from "react";
import { Dog } from "../../../types";
import { Link } from "react-router-dom";
import { ApproveIcon, DissaproveIcon } from "../../../assets/icons";

const PendingDogCard = (props: Dog) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleApprove = () => {

  }

  return (
    <div className={style.Container}>
      <section className={style.managePending}>
        <ApproveIcon  />
        <DissaproveIcon />
      </section>

      <Link className={style.card} to={`/dog/${props.id}`}>
        <section className={hover ? style.content_on : style.content}>
          <div className={style.blurImgContainer}>
            <img src={props?.img} />
          </div>
          <div className={style.imgContainer}>
            <img src={props?.img} alt="Imagen del perro" />
          </div>

          <div className={style.Description}>
            <div>
              <h4>Nombre:</h4>
              <p>{props?.name}</p>
            </div>
            <div>
              <h4>Raza:</h4>
              <p>{props?.breedGroup}</p>
            </div>
          </div>
        </section>
        <section
          className={style.hoverContent}
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <p className={hover ? style.text_on : style.text}>
            Click para ver mas
          </p>
        </section>
      </Link>
    </div>
  );
};

export default PendingDogCard;
