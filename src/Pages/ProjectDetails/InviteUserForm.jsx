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
import { inviteToProject } from "../../Redux/Project/Action";

// const InviteUserForm = () => {
//   const dispatch = useDispatch();
//   const form = useForm({
//     mode: "onTouched",
//     defaultValues: {
//       email: "",
//     },
//   });

//   const onSubmit = (data) => {
//     // Use `projectId` from props, not `id` from URL
//     dispatch(inviteToProject({ email: data.email, projectId }))
//       .then(() => {
//         console.log("sent invitation", data);
//         toast.success("Invitation sent successfully");
//       })
//       .catch((err) => {
//         console.error("Error sending invite:", err);
//         toast.error("Failed to send invitation");
//       });
//   };

const InviteUserForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const form = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(inviteToProject({ email: data.email, projectId: id }))
      .then(() => {
        toast.success("Invitation sent successfully");
      })
      .catch(() => {
        toast.error("Failed to send invitation");
      });
  };


  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="User Email..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full mt-5">
              Invite User
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default InviteUserForm;
