import style from "./profile.module.scss";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader/ProfileHeader";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo/ProfileInfo";
import PendingDogs from "../../components/ProfileComponents/PendingDogs/PendingDogs";
import { Route, Routes, useNavigate } from "react-router-dom";
import MyDogs from "../../components/ProfileComponents/MyDogs/MyDogs";
import { useUserContext } from "../../hooks/contextHooks";
import { useEffect } from "react";

const Profile = () => {
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && navigate) navigate('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <div className={style.Profile}>
      <ProfileHeader />

      <Routes>
        <Route path="/" element={<ProfileInfo />} />
        <Route path="/pending-dogs" element={<PendingDogs />} />
        <Route path="/my-dogs/*" element={<MyDogs />} />
      </Routes>

    </div>
  );
};

export default Profile;
