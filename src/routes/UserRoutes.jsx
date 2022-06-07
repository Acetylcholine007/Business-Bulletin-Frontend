import { AccountBoxSharp, BusinessSharp } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";

import NotFoundPage from "../shared/pages/NotFoundPage";
import BusinessPage from "../views/businessView/pages/BusinessPage";
import BusinessEditor from "../views/profileView/pages/BusinessEditor";
import ProfilePage from "../views/profileView/pages/ProfilePage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BusinessPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/businesses/new" element={<BusinessEditor />} />
      <Route
        path="/profile/businesses/:businessId/edit"
        element={<BusinessEditor />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserRoutes;

export const userRoutes = [
  {
    title: "Business",
    icon: <BusinessSharp />,
    path: "/",
  },
  {
    title: "Profile",
    icon: <AccountBoxSharp />,
    path: "/profile",
  },
];
