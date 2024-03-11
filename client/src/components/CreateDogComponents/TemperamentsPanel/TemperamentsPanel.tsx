import { useEffect, useState } from "react";
import { useAppContext } from "../../../hooks/contextHooks";
import style from "./temperamentsPanel.module.scss";
import { Checkbox, CheckboxChecked } from "../../../assets/icons";
import toast from "react-hot-toast";
import { Dog } from "../../../types";

interface Props {
  selectedTemps: string[];
  setCreatedDog: React.Dispatch<React.SetStateAction<Omit<Dog, "id">>>;
}

const TemperamentsPanel = ({ selectedTemps, setCreatedDog }: Props) => {
  const { allTemperaments } = useAppContext();
  const [inputValue, setInputValue] = useState<string>("");

  const handleItemClick = (temp: string) => {
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

  return (
    <div className={style.TemperamentsPanel}>
      <h2 className={style.title}>Temperamentos</h2>

      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />

      <section>
        {allTemperaments.map((temp, i) => {
          const item = (
            <div className={style.item} onClick={() => handleItemClick(temp)} key={i}>
              {temp}

              {selectedTemps.includes(temp) ? (
                <CheckboxChecked />
              ) : (
                <Checkbox />
              )}
            </div>
          );
          if (inputValue !== "")
            return temp.toLowerCase().includes(inputValue.toLowerCase())
              ? item
              : undefined;
          else return item;
        })}
      </section>
    </div>
  );
};

export default TemperamentsPanel;
