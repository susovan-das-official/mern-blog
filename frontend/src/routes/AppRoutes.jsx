import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "@/Layout/Layout";
import SignIn from "@/pages/Auth/SignIn";
import Signup from "@/pages/Auth/Signup";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import AddCategory from "@/pages/Category/AddCategory";
import CategoryDetails from "@/pages/Category/CategoryDetails";
import EditCategory from "@/pages/Category/EditCategory";

import {
  RouteAddCategory,
  RouteCategoryDetails,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
} from "@/helper/RouteName";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes under the main Layout */}
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path="/category/edit/:categoryId" element={<EditCategory />} />
        </Route>

        {/* Authentication Routes */}
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
