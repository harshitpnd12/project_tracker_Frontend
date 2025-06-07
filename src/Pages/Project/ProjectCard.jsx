import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { deleteProject } from "../../Redux/Project/Action";
import { toast } from "sonner";

const ProjectCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProject({ projectId: item.id }))
      .then(() => {
        toast.success("Deleted successfully");
      })
      .catch(() => {
        toast.error("Failed to delete");
      });
  };

  return (
    <Card className="p-5 w-full lg:max-w-3xl shadow-md border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1
                onClick={() => navigate("/project/" + item.id)}
                className="cursor-pointer font-bold text-lg text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
              >
                {item.name}
              </h1>
              <DotFilledIcon className="text-slate-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.category}</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400" variant="ghost" size="icon">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg">
                  <DropdownMenuItem onClick={() => navigate(`/project/update/${item.id}`)}
                    className="hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-300"
                  >Update</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}
                    className="hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-red-500 dark:text-red-400"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
           <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm underline"
          >
            {item.link}
          </a>

        </div>
        <div className="flex flex-wrap gap-2 items-center pt-1">
          {item.tags.map((tag) => (
            <Badge key={item} variant="outline" className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 px-2.5 py-0.5 text-xs font-medium rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
