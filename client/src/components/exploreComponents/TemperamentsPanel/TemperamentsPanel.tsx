import { Checkbox, CheckboxChecked } from "../../../assets/icons";
import { useAppContext } from "../../../hooks/contextHooks";
import { Filters } from "../../../types";
import style from "./temperamentsPanel.module.scss";

interface Props {
  setOpenTemperamentsPanel: (boolean: boolean) => void;
  setSearchAndFiltersLocal: React.Dispatch<React.SetStateAction<Filters>>;
  temperaments: Filters["temperaments"];
}

export const TemperamentsPanel = ({
  setOpenTemperamentsPanel,
  setSearchAndFiltersLocal,
  temperaments,
}: Props) => {
  const { allTemperaments } = useAppContext();

  const handleCheckbox = (temp: string) => {
    setSearchAndFiltersLocal((prev) => {
      const { temperaments } = prev;
      return {
        ...prev,
        temperaments: temperaments.includes(temp)
          ? temperaments.filter((temp) => temp !== temp)
          : [...temperaments, temp],
      };
    });
  };

  return (
    <div className={style.Temperaments}>
      <h1>Temperamentos</h1>

      <button
        onClick={() => {
          setOpenTemperamentsPanel(false);
        }}
      >
        Volver
      </button>

      <section className={style.list}>
        {allTemperaments.map((temp) => (
          <div
            className={style.item}
            onClick={() => {
              handleCheckbox(temp);
            }}
          >
            {temperaments.includes(temp) ? (
              <CheckboxChecked className={style.checkbox} />
            ) : (
              <Checkbox className={style.checkbox} />
            )}

            <p>{temp}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TemperamentsPanel;
