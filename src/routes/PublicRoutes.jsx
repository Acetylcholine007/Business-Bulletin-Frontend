import { BusinessSharp } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";

import NotFoundPage from "../shared/pages/NotFoundPage";
import RegisterPage from "../views/authView/pages/RegisterPage";
import SigninPage from "../views/authView/pages/SigninPage";
import BusinessPage from "../views/businessView/pages/BusinessPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BusinessPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PublicRoutes;

export const publicRoutes = [
  {
    title: "Business",
    icon: <BusinessSharp />,
    path: "/",
  },
];
