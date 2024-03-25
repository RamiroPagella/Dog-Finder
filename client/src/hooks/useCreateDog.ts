import React, { useEffect } from "react";
import { useAppContext, useUserContext } from "./contextHooks";
import Axios from "../axios";
import { useState } from "react";
import { Dog } from "../types";
import { AxiosError, AxiosResponse } from "axios";
import { errorToast } from "../toasts";
import toast from "react-hot-toast";

const useCreateDog = () => {
  const { User, setUser } = useUserContext();
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
      errorToast("Debes ingresar un numero");
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
        errorToast("El archivo debe ser una imagen");
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
    if (value.length > 30) {
      errorToast("El nombre debe ser menor a 30 caracteres");
      return;
    }
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
        errorToast("No puedes incluir mas de 15 temperamentos");
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
    });

    setHeight({ min: "", max: "" });
    setWeight({ min: "", max: "" });
    setLifeSpan({ min: "", max: "" });
  };

  const sendDog = () => {
    if (
      createdDog.name === "" ||
      createdDog.height === "" ||
      createdDog.weight === "" ||
      createdDog.temperaments.length === 0 ||
      createdDog.breedGroup === "" ||
      createdDog.lifeSpan === "" ||
      createdDog.img === null
    ) {
      errorToast("Debes completar todos los campos");
      return;
    }

    if (
      height.min !== "" &&
      height.max !== "" &&
      Number(height.min) > Number(height.max)
    ) {
      errorToast("La altura minima no puede ser mayor a la maxima");
      return;
    } else if (
      weight.min !== "" &&
      weight.max !== "" &&
      Number(weight.min) > Number(weight.max)
    ) {
      errorToast("El peso minimo no puede ser mayor al maximo");
      return;
    } else if (
      lifeSpan.min !== "" &&
      lifeSpan.max !== "" &&
      Number(lifeSpan.min) > Number(lifeSpan.max)
    ) {
      errorToast("La esperanza de vida minima no puede ser mayor a la maxima");
      return;
    }

    const newDog = {
      ...createdDog,
      userId: User.id,
      lifeSpan: `${createdDog.lifeSpan} years`,
    };

    const request = async (): Promise<AxiosResponse> => {
      const response = await Axios.post<Dog>("/dog", newDog, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    };

    toast.promise(
      request(),
      {
        loading: "Enviando perro...",
        success: (response) => {
          const newDog: Dog = response.data;
          setUser({ ...User, pendingDogs: [...User.pendingDogs, newDog] });
          restoreDog();
          return "Perro creado con exito";
        },
        error: (err) => {
          console.log(err);
          let errorMsg = "Error";
          if (err instanceof AxiosError) {
            errorMsg = err.message;
            if (err.status === 403) return "No puedes crear mas de 4 perros";
          }
          return errorMsg;
        },
      },
      {
        style: {
          backgroundColor: "var(--color7)",
          color: "var(--color4)",
          userSelect: "none",
        },
      },
    );
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

    const newHeight: string =
      height.min !== height.max
        ? [height.min, height.max].join(
            height.min !== "" && height.max !== "" ? " - " : "",
          )
        : height.min;
    const newWeight: string =
      weight.min !== weight.max
        ? [weight.min, weight.max].join(
            weight.min !== "" && weight.max !== "" ? " - " : "",
          )
        : weight.min;
    const newLifeSpan: string =
      lifeSpan.min !== lifeSpan.max
        ? [lifeSpan.min, lifeSpan.max].join(
            lifeSpan.min !== "" && lifeSpan.max !== "" ? " - " : "",
          )
        : lifeSpan.min;

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
