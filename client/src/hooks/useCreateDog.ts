import React, { useEffect } from "react";
import { useAppContext, useUserContext } from "./contextHooks";
import toast from "react-hot-toast";
import Axios from "../axios";
import { useState } from "react";
import { CreatedDog, Dog } from "../types";

const useCreateDog = () => {
  const { User } = useUserContext();
  const { createdDog, setCreatedDog } = useAppContext();
  const [height, setHeight] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [weight, setWeight] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [lifeSpan, setLifeSpan] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const inputValues = {
    height,
    weight,
    lifeSpan,
  };
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isNaN(Number(value))) {
      toast.error("Debes ingresar un numero", {
        style: {
          backgroundColor: "var(--color7)",
          color: "var(--color4)",
          pointerEvents: "none",
        },
      });
      return;
    }
    const propName = name.includes("min") ? "min" : "max";

    if (name.includes("height")) {
      setHeight({ ...height, [propName]: value });
    } else if (name.includes("weight")) {
      setWeight({ ...weight, [propName]: value });
    } else if (name.includes("lifeSpan")) {
      setLifeSpan({ ...lifeSpan, [propName]: value });
    }
  };

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
        toast.error("El archivo debe ser una imagen", {
          style: {
            backgroundColor: "var(--color7)",
            color: "var(--color4)",
            pointerEvents: "none",
          },
        });
        return;
      }

      setCreatedDog((prev) => ({ ...prev, img: file }));
    }
  };

  const deleteImage = () => {
    setCreatedDog({ ...createdDog, img: null });
    const imageInput = document.getElementById(
      "image-input",
    ) as HTMLInputElement;
    imageInput.value = "";
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCreatedDog((prev) => ({ ...prev, name: value }));
  };

  const handleTempClick = (
    temp: string,
    selectedTemps: Dog["temperaments"],
  ) => {
    if (selectedTemps.includes(temp)) {
      setCreatedDog((prev) => ({
        ...prev,
        temperaments: selectedTemps.filter((tmp) => tmp !== temp),
      }));
    } else {
      if (selectedTemps.length >= 15) {
        toast.error("No puedes incluir mas de 15 temperamentos", {
          style: {
            backgroundColor: "var(--color7)",
            color: "var(--color4)",
            pointerEvents: "none",
          },
        });
        return;
      }
      setCreatedDog((prev) => ({
        ...prev,
        temperaments: selectedTemps.concat([temp]),
      }));
    }
  };

  const deleteTemp = (temp: string, selectedTemps: Dog["temperaments"]) => {
    setCreatedDog((prev) => ({
      ...prev,
      temperaments: selectedTemps.filter((tmp) => tmp !== temp),
    }));
  };

  const handleBgClick = (breedGroup: string) => {
    setCreatedDog((prev) => ({
      ...prev,
      breedGroup: breedGroup,
    }));
  };

  const restoreDog = () => {
    setCreatedDog({
      name: "",
      height: "",
      weight: "",
      temperaments: [],
      breedGroup: "",
      lifeSpan: "",
      img: null,
      userId: User?.id
    });

    setHeight({ min: "", max: "" });
    setWeight({ min: "", max: "" });
    setLifeSpan({ min: "", max: "" });
  };

  const sendDog = () => {
    const { name, height, weight, temperaments, breedGroup, lifeSpan, img } =
      createdDog;
    if (
      name === "" ||
      height === "" ||
      weight === "" ||
      temperaments.length === 0 ||
      breedGroup === "" ||
      lifeSpan === "" ||
      img === null
    ) {
      toast.error("Debes completar todos los campos", {
        style: {
          backgroundColor: "var(--color7)",
          color: "var(--color4)",
          pointerEvents: "none",
        },
      });
      return;
    }

    Axios.post("/dog", createdDog, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res);
        toast.success('Perro creado con exito', {
          style: {
            backgroundColor: 'var(--color7)',
            color: 'var(--color4)',
            pointerEvents: 'none'
          }
        })
        restoreDog();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isFirstRender) {
      const dogHeight = createdDog.height.split(" - ");
      const dogWeight = createdDog.weight.split(" - ");
      const dogLifespan = createdDog.lifeSpan.split(" - ");

      setHeight({ min: dogHeight[0], max: dogHeight[1] ? dogHeight[1] : "" });
      setWeight({ min: dogWeight[0], max: dogWeight[1] ? dogWeight[1] : "" });
      setLifeSpan({
        min: dogLifespan[0],
        max: dogLifespan[1] ? dogLifespan[1] : "",
      });

      setIsFirstRender(false);
      return;
    }

    const newHeight: string = [height.min, height.max].join(
      height.min !== "" && height.max !== "" ? " - " : "",
    );
    const newWeight = [weight.min, weight.max].join(
      weight.min !== "" && weight.max !== "" ? " - " : "",
    );
    const newLifeSpan = [lifeSpan.min, lifeSpan.max].join(
      lifeSpan.min !== "" && lifeSpan.max !== "" ? " - " : " - ",
    );

    setCreatedDog({
      ...createdDog,
      height: newHeight,
      weight: newWeight,
      lifeSpan: newLifeSpan,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, weight, lifeSpan]);

  return {
    handleDrop,
    handleFileChange,
    deleteImage,
    handleNameChange,
    handleInputChange,
    handleTempClick,
    handleBgClick,
    deleteTemp,
    restoreDog,
    sendDog,
    inputValues,
  };
};

export default useCreateDog;
