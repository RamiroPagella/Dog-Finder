import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearcAndfiltersContext } from "./contextHooks";
import { Filters } from "../types";

const useFilters = () => {
  const { searchAndFilters, setSearchAndFilters } = useSearcAndfiltersContext();

  const [searchAndFiltersLocal, setSearchAndFiltersLocal] =
    useState<Filters>({
      search: "",
      height: "0 - 1000",
      weight: "0 - 1000",
      temperaments: [],
      breedGroups: [],
      lifeSpan: "0 - 1000",
    });
    
  //estados locales conectados con los inputs:
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

  const cleanFilters = () => {
    setSearchAndFiltersLocal({
      search: "",
      height: "0 - 1000",
      weight: "0 - 1000",
      temperaments: [],
      breedGroups: [],
      lifeSpan: "0 - 1000",
    });
    setHeight({
      min: '',
      max: ''
    })
    setWeight({
      min: '',
      max: ''
    })
    setLifeSpan({
      min: '',
      max: ''
    })
  };

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

    setSearchAndFiltersLocal({
      ...searchAndFiltersLocal,
      height: newHeight,
      weight: newWeight,
      lifeSpan: newLifeSpan,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, weight, lifeSpan]);

  //en el renderizado, se recuperan los valores de los filtros establecidos para mostrar en los inputs.
  useEffect(() => {
    setSearchAndFiltersLocal({ ...searchAndFilters });
    const appliedMinAndMaxHeight = searchAndFilters.height.split(" - ");
    const appliedMinAndMaxWeight = searchAndFilters.weight.split(" - ");
    const appliedMinAndMaxLifeSpan = searchAndFilters.lifeSpan.split(" - ");
    setHeight({
      min: appliedMinAndMaxHeight[0] === "0" ? "" : appliedMinAndMaxHeight[0],
      max:
        appliedMinAndMaxHeight[1] === "1000" ? "" : appliedMinAndMaxHeight[1],
    });
    setWeight({
      min: appliedMinAndMaxWeight[0] === "0" ? "" : appliedMinAndMaxWeight[0],
      max:
        appliedMinAndMaxWeight[1] === "1000" ? "" : appliedMinAndMaxWeight[1],
    });
    setLifeSpan({
      min:
        appliedMinAndMaxLifeSpan[0] === "0" ? "" : appliedMinAndMaxLifeSpan[0],
      max:
        appliedMinAndMaxLifeSpan[1] === "1000"
          ? ""
          : appliedMinAndMaxLifeSpan[1],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    searchAndFiltersLocal,
    setSearchAndFiltersLocal,
    setSearchAndFilters,
    height,
    weight,
    lifeSpan,
    handleInputChange,
    cleanFilters
  }
}

export default useFilters;