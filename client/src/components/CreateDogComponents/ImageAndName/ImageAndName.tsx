import { useAppContext } from "../../../hooks/contextHooks";
import style from "./imageAndName.module.scss";

interface Props {
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageAndName = ({
  handleNameChange,
  handleFileChange,
  handleDrop,
}: Props) => {
  const { createdDog, setCreatedDog } = useAppContext();

  return (
    <div className={style.ImageAndName}>
      <section>
        <h3>Nombre</h3>
        <div>
          <input onChange={handleNameChange} value={createdDog.name} />
        </div>
      </section>

      <section
        className={style.imageContainer}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleFileChange}
        />

        <p>Selecciona una imagen o arrastra hasta aquí</p>

        {createdDog.img && (
          <>
            <img
              className={style.img}
              src={URL.createObjectURL(createdDog.img)}
            />
            <img
              className={style.blurImg}
              src={URL.createObjectURL(createdDog.img)}
            />
          </>
        )}
      </section>

      {!createdDog.img ? (
        <label className={style.btn} htmlFor="image">
          Seleccionar imagen
        </label>
      ) : (
        <button
          className={style.btn}
          onClick={() => setCreatedDog((prev) => ({ ...prev, img: null }))}
        >
          Eliminar imagen
        </button>
      )}
    </div>
  );
};

export default ImageAndName;
