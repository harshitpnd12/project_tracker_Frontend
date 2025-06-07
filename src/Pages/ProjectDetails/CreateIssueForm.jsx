import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { DialogClose } from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { createIssue } from "../../Redux/Issue/Action";

const CreateIssueForm = ({ status }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const form = useForm({
    mode: "onTouched",
    defaultValues: {
      issueName: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    data.projectId = id;
    try {
      await dispatch(
        createIssue({
          title: data.issueName,
          description: data.description,
          projectId: id,
          status,
        })
      );
      toast.success("Issue created successfully!");
      console.log("create issue data", data);
    } catch (error) {
      toast.error("Failed to create issue!");
      console.error("Error creating issue:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="issueName"
            rules={{
              required: "Issue title is required",
              minLength: { value: 5, message: "Title must be ≥ 5 characters" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="issueName..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            rules={{
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be ≥ 10 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full mt-5">
              Create Issue
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateIssueForm;
