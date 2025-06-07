import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { deleteComment } from "../../Redux/Comment/Action";
import { toast } from "sonner";

const CommentCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(item.id));
    toast.success("Comment deleted successfully");
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>{item.user.fullName[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p>{item.user.fullName}</p>
          <p>{item.content}</p>
        </div>
      </div>
      <Button
        onClick={handleDelete}
        className="rounded-full"
        variant="ghost"
        size="icon"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CommentCard;
