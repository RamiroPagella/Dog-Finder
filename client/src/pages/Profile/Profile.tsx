import { useState } from "react";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader/ProfileHeader";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo/ProfileInfo";
import style from "./profile.module.scss";
import PendingDogs from "../../components/ProfileComponents/PendingDogs/PendingDogs";

const Profile = () => {
  const [togglePage, setTogglePage] = useState<"MyProfile" | "PendingDogs">(
    "MyProfile",
  );

  return (
    <div className={style.Profile}>
      <ProfileHeader setTogglePage={setTogglePage} togglePage={togglePage} />

      {togglePage === "MyProfile" ? <ProfileInfo /> : <PendingDogs />}
    </div>
  );
};

export default Profile;
