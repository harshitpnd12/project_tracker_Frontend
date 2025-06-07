import { PersonIcon } from "@radix-ui/react-icons";
import { FaUniversity } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { logout } from "../../Redux/Auth/Action";
import CreateProjectForm from "../Project/CreateProjectForm";
import { toast } from "sonner";

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    dispatch(logout());
  };

  return (
  <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-xl py-4 px-5 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <FaUniversity className="text-2xl text-blue-400 mr-2" />
      <p 
        onClick={() => navigate("/")} 
        className="cursor-pointer text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
      >
        IET Project Tracker
      </p>
      <Dialog>
        <DialogTrigger>
          <Button 
            variant="ghost" 
            className="ml-4 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-800/95 backdrop-blur-xl text-white border border-slate-600/50 shadow-2xl">
          <DialogHeader className="text-xl font-semibold text-white">Create New Project</DialogHeader>
          <CreateProjectForm />
        </DialogContent>
      </Dialog>
    </div>

    <div className="flex gap-4 items-center">
      <p className="text-slate-200 font-medium hidden sm:block">{auth.user?.fullName}</p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-2 border-slate-600 bg-slate-800/60 hover:bg-slate-700/80 hover:border-blue-400 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <PersonIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 shadow-2xl">
          <DropdownMenuItem 
            onClick={handleLogout}
            className="text-slate-200 hover:bg-slate-700/80 hover:text-white transition-colors cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);
};

export default Navbar;
