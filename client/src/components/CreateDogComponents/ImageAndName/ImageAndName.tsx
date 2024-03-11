import { useEffect, useState } from "react";
import style from "./imageAndName.module.scss";
import Axios from "../../../axios";

const ImageAndName = () => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  );

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();

    const image = e.dataTransfer.files[0];
    setSelectedImage(image);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(e.target.files);
    if (files && files.length > 0) setSelectedImage(files[0]);
  };

  useEffect(() => {
    if (selectedImage instanceof File) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      Axios.post('/aver', formData, {
        headers: {"Content-Type": 'multipart/form-data'}
      })
    }
  }, [selectedImage])

  return (
    <div className={style.ImageAndName}>
      <section>
        <h3>Nombre</h3>
        <div>
          <input />
        </div>
      </section>

      <section
        className={style.imageContainer}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input type="file" name="image" onChange={handleFileChange} />
        {selectedImage && (
          <img
            style={{ height: "150px", border: "solid blue 1px" }}
            src={URL.createObjectURL(selectedImage)}
          />
        )}
      </section>

      <button onClick={() => setSelectedImage(undefined)}>borrar imagen</button>
      <button>Seleccionar imagen</button>
    </div>
  );
};

export default ImageAndName;
