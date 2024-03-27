import { AxiosError } from "axios";
import Axios from "../../axios";
import {
  useAppContext,
  usePagingContext,
  useSearcAndfiltersContext,
  useUserContext,
} from "../../hooks/contextHooks";
import { errorToast } from "../../toasts";
import { Dog } from "../../types";
import style from "./deleteDogModal.module.scss";
import { createPortal } from "react-dom";
import { getDogs } from "../../services/dogsServices";
import { GetUserInfo } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

interface Props {
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  id: Dog["id"];
  isDogPending: boolean;
  isInDogDetail: boolean;
}

const DeleteDogModal = ({ setOpenDelete, id, isDogPending, isInDogDetail }: Props) => {
  const rootElement = document.getElementById("root") as Element;
  const navigate = useNavigate();
  const { setDogs } = useAppContext();
  const { setIsAuthenticated, setUser } = useUserContext();
  const { currentPage, setTotalPages } = usePagingContext();
  const { searchAndFilters } = useSearcAndfiltersContext();

  const handleDelete = async () => {
    try {
      const url = !isDogPending ? `/dog?id=${id}` : `/pending-dog?id=${id}`;
      await Axios.delete(url);
      const dogsData = await getDogs(currentPage, searchAndFilters);
      await GetUserInfo({ setIsAuthenticated, setUser });
      setDogs(dogsData.dogs);
      setTotalPages(dogsData.totalPages);
      isInDogDetail && navigate(-1);
    } catch (error) {
      console.log(error);
      errorToast(error instanceof AxiosError ? error.message : "Error");
    }
    setOpenDelete(false);
  };

  return createPortal(
    <div className={style.Container}>
      <div className={style.modal}>
        <h3>¿Eliminar Perro?</h3>

        <div>
          <button onClick={handleDelete}>Si</button>
          <button onClick={() => setOpenDelete(false)}>No</button>
        </div>
      </div>
    </div>,
    rootElement,
  );
};

export default DeleteDogModal;
