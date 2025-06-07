import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { deleteIssue } from "../../Redux/Issue/Action";
import UserList from "./UserList";

const IssueCard = ({ item, projectId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIssueDelete = async () => {
    try {
      await dispatch(deleteIssue(item.id));
      toast.success("Issue deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete issue!");
      console.error("Delete error:", error);
    }
  };

  return (
    <Card className="rounded-md py-0.5 pb-0.5">
      <CardHeader className="py-0 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle
            className="cursor-pointer"
            onClick={() => navigate(`/project/${projectId}/issue/${item.id}`)}
          >
            {item.title}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" className="rounded-full">
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>To-Do</DropdownMenuItem>
              <DropdownMenuItem>Done</DropdownMenuItem> */}
              {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
              <DropdownMenuItem onClick={handleIssueDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="py-0">
        <div className="flex items-center justify-between">
          <p>Assigned User  :-</p>
          {/* <p>FBP -{1}</p> */}
          <DropdownMenu className="w-[30rem] border border-red-400">
            <DropdownMenuTrigger>
              <Button
                size="icon"
                className="bg-gray-900 hover:text-black text-white rounded-full"
              >
                <Avatar>
                  <AvatarFallback>
                    <PersonIcon />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <UserList issueDetails={item} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
