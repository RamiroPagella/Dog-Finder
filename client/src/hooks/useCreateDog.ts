import React, { useEffect } from "react";
import { useAppContext } from "./contextHooks";
import toast from "react-hot-toast";
import Axios from "../axios";
import { useState } from "react";
import { Dog } from "../types";

const useCreateDog = () => {
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
    lifeSpan
  }

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
        toast.error("tiene que ser imagen");
        return;
      }
      // setSelectedImage(file);
      setCreatedDog((prev) => ({ ...prev, img: file }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCreatedDog((prev) => ({ ...prev, name: value }));
  };

  const handleTempClick = (temp: string, selectedTemps: Dog['temperaments']) => {
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

  const deleteTemp = (temp: string, selectedTemps: Dog['temperaments']) => {
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

  useEffect(() => {
    const newHeight: string = [
      height.min === "" ? "0" : height.min,
      height.max === "" ? "1000" : height.max,
    ].join(" - ");
    const newWeight = [
      weight.min === "" ? "0" : weight.min,
      weight.max === "" ? "1000" : weight.max,
    ].join(" - ");
    const newLifeSpan = [
      lifeSpan.min === "" ? "0" : lifeSpan.min,
      lifeSpan.max === "" ? "1000" : lifeSpan.max,
    ].join(" - ");

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
    handleNameChange,
    handleInputChange,
    handleTempClick,
    handleBgClick,
    deleteTemp,
    inputValues
  };
};

export default useCreateDog;
