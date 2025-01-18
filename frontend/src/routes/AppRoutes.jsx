import { RouteIndex, RouteSignIn, RouteSignUp } from "@/helper/RouteName";
import Layout from "@/Layout/Layout";
import SignIn from "@/pages/Auth/SignIn";
import Signup from "@/pages/Auth/Signup";
import Index from "@/pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
        </Route>
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
