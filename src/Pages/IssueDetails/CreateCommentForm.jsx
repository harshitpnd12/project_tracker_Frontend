import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { createComment } from "../../Redux/Comment/Action";

const CreateCommentForm = ({ issueId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const form = useForm({
    mode: "onTouched",
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(createComment({ content: data.content, issueId }));
    form.reset();
    toast.success("Comment added successfully");
    console.log("create project data", data);
  };
  return (
    <div>
      <Form {...form}>
        <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            rules={{
              required: "Comment cannot be empty",
              minLength: {
                value: 2,
                message: "Comment must be at least 2 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <div>
                    <Avatar>
                      <AvatarFallback>
                        {user?.fullName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="w-[20rem]"
                      placeholder="add comment here..."
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            Comment
            <FiSend />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCommentForm;
