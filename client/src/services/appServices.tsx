import Axios from "../axios";
import { AppContextType } from "../context/AppContext";

interface GetTempsAndBreedGroupsParams {
  setAllBreedGroups: AppContextType["setAllBreedGroups"];
  setAllTemperaments: AppContextType["setAllTemperaments"];
}
export const GetTempsAndBreedGroups = ({
  setAllBreedGroups,
  setAllTemperaments,
}: GetTempsAndBreedGroupsParams) => {
  Axios.get("/temps-and-breedgroups").then((res) => {
    setAllBreedGroups(res.data.breedGroups);
    setAllTemperaments(res.data.temperaments);
  }).catch(err => {
    console.log(err);
  })
};
