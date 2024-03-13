import { useEffect } from 'react';
import { useAppContext } from './contextHooks';
import toast from 'react-hot-toast';
import Axios from '../axios';

const useCreateDog = () => {
  const { createdDog, setCreatedDog } = useAppContext();

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    // setSelectedImage(image);
    setCreatedDog((prev) => ({ ...prev, img: file }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("tiene que ser imagen");
        return;
      }
      // setSelectedImage(file);
      setCreatedDog((prev) => ({ ...prev, img: file }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCreatedDog(prev => ({... prev, name: value}))
  }

  useEffect(() => {
    const { img } = createdDog;
    if (img instanceof File) {
      const formData = new FormData();
      formData.append("image", img);

      Axios.post("/aver", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    if (img === null) {
      const input = document.getElementById("image") as HTMLInputElement;
      input.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdDog.img]);

  return {
    handleDrop,
    handleFileChange,
    handleNameChange
  }
}

export default useCreateDog;