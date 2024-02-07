import style from "./fullSizeImage.module.scss";
import { createPortal } from "react-dom";
import { CloseButton } from "../../../icons/OtherIcons";

interface Props {
  img: string | undefined;
  setIsImageOpen: (boolean: boolean) => void;
}

const FullSizeImage = ({ img, setIsImageOpen }: Props) => {
  const rootElement: Element = document.querySelector("#root") as Element;

  return createPortal(
    <div className={style.container}>
      <div className={style.button}>
        <CloseButton
          className={style.buttonIcon}
          onClick={() => {
            setIsImageOpen(false);
          }}
        />
      </div>

      <div className={style.imageContainer}>
        <img src={img} />
      </div>
    </div>,
    rootElement,
  );
};

export default FullSizeImage;
