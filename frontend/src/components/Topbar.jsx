import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FaSignInAlt } from "react-icons/fa";
import SearchBox from "./SearchBox";

const Topbar = () => {
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
        <Button asChild className="rounded-md">
          <Link to={"/sign-in"}>
            Sign In <FaSignInAlt />
          </Link>
        </Button>
      </div>
    </header>
  );
};
export default Topbar;
