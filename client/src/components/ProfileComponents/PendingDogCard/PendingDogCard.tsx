import style from "./pendingDogCard.module.scss";
import { useState } from "react";
import { Dog } from "../../../types";
import { Link } from "react-router-dom";
import { ApproveIcon, DissaproveIcon } from "../../../assets/icons";

interface Props extends Dog {
  approveOrDisapprove: (dogId: Dog['id'], approve: boolean) => void;
}

const PendingDogCard = (props: Props) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div className={style.Container}>
      <section className={style.managePending}>
        <ApproveIcon onClick={() => props?.approveOrDisapprove(props.id, true)} />
        <DissaproveIcon onClick={() => props?.approveOrDisapprove(props.id, false)} />
      </section>

      <Link className={style.card} to={`/pending-dog/${props.id}`}>
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
