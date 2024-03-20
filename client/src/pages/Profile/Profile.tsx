import style from "./profile.module.scss";
import { useState } from "react";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader/ProfileHeader";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo/ProfileInfo";
import PendingDogs from "../../components/ProfileComponents/PendingDogs/PendingDogs";
import { Route, Routes } from "react-router-dom";

const Profile = () => {
  const [togglePage, setTogglePage] = useState<"MyProfile" | "PendingDogs">(
    "MyProfile",
  );

  return (
    <div className={style.Profile}>
      <ProfileHeader setTogglePage={setTogglePage} togglePage={togglePage} />

      <Routes>
        <Route path="/" element={<ProfileInfo />} />
        <Route path="/pending-dogs" element={<PendingDogs />} />
      </Routes>

      {/* {togglePage === "MyProfile" ? <ProfileInfo/> : <PendingDogs />} */}
    </div>
  );
};

export default Profile;
