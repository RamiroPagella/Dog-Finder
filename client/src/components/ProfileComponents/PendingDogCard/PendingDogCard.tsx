import style from "./pendingDogCard.module.scss";
import { useState } from "react";
import { Dog } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { ApproveIcon, DissaproveIcon } from "../../../assets/icons";
import DisapproveModal from "../DisapproveModal/DisapproveModal";
import { useAppContext } from "../../../hooks/contextHooks";

interface Props {
  approveOrDisapprove: (dogId: Dog["id"], approve: boolean) => void;
  id: Dog["id"];
  img: Dog["img"];
  name: Dog["name"];
  breedGroup: Dog["breedGroup"];
}

const PendingDogCard = ({
  approveOrDisapprove,
  id,
  img,
  name,
  breedGroup,
}: Props) => {
  const { setBackRoute } = useAppContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [hover, setHover] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCardClick = () => {
    setBackRoute(pathname);
    navigate(`/pending-dog/${id}`);
  };

  return (
    <div className={style.Container}>
      <section className={style.managePending}>
        <ApproveIcon onClick={() => approveOrDisapprove(id, true)} />
        <DissaproveIcon
          onClick={() => {
            setModalOpen(true);
          }}
        />
      </section>

      <div className={style.card} onClick={handleCardClick}>
        <section className={hover ? style.content_on : style.content}>
          <div className={style.blurImgContainer}>
            <img src={img} />
          </div>
          <div className={style.imgContainer}>
            <img src={img} alt="Imagen del perro" />
          </div>

          <div className={style.Description}>
            <div>
              <h4>Nombre:</h4>
              <p>{name}</p>
            </div>
            <div>
              <h4>Raza:</h4>
              <p>{breedGroup}</p>
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
      </div>

      {modalOpen && (
        <DisapproveModal
          confirm={() => {
            approveOrDisapprove(id, false);
          }}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
};

export default PendingDogCard;
