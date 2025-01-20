import { signInWithPopup } from "firebase/auth";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "@/helper/firebase";
import { GoogleLoginApi } from "@/api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignIn } from "@/helper/RouteName";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/features/AuthSlice/authSlice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle the Google login process.
  const handleLogin = async () => {
    try {
      // Trigger Google Sign-In using Firebase Authentication.
      const googleResponse = await signInWithPopup(auth, provider);

      const user = googleResponse.user;

      const bodyData = {
        username: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
      };

      // Call the backend API to complete the login process.
      const response = await GoogleLoginApi(bodyData);

      // Handle successful response.
      if (response.status === 200) {
        toast.success(response?.data?.message);
        dispatch(setUser(response?.data?.data));
        navigate(RouteIndex);
      } else {
        toast.error(response?.data?.message);
        navigate(RouteSignIn);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  // Render the Google Login button.
  return (
    <Button variant="outline" className="w-full text-sm" onClick={handleLogin}>
      <FcGoogle />
      Continue With Google
    </Button>
  );
};

export default GoogleLogin;
