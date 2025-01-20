import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FaSignInAlt } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutApi } from "@/api/Api";

import { removeUser } from "@/app/features/AuthSlice/authSlice";
import { toast } from "react-toastify";

import { RouteIndex, RouteProfile } from "@/helper/RouteName";

const Topbar = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const response = await LogoutApi();
    if (response?.status === 200) {
      toast.success(response?.data?.message);
      dispatch(removeUser());
      navigate(RouteIndex);
    } else {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="flex justify-between h-16 fixed w-full z-20 bg-white px-5 border-b items-center">
      <div className="w-20 h-20">
        <img
          className="w-full h-full object-cover"
          src="https://i.pinimg.com/736x/ff/86/3d/ff863dd39bdc2b43fc90325fb7b5455c.jpg"
          alt="Logo"
        />
      </div>
      <div className="w-[200px] md:w-[500px]">
        <SearchBox />
      </div>
      <div>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user?.username}</p>
                <p className="text-xs">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to={RouteProfile}>
                  <FaUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to="/blog/create">
                  <FaPlus />
                  Create Post
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer" asChild>
                <Button
                  variant="ghost"
                  className="w-full text-left"
                  onClick={handleLogout}
                >
                  <MdLogout color="red" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild className="rounded-md">
            <Link to={"/sign-in"}>
              Sign In <FaSignInAlt />
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};
export default Topbar;
