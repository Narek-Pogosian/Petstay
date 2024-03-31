import {
  RegisterSchemaType,
  registerSchema,
} from "@/lib/validations/auth-validations";
import { DialogHeader } from "../ui/dialog";
import { Mode } from "./auth-content";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@/components/ui/form";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import LoadingButton from "../ui/loading-button";

type Props = {
  setMode: (val: Mode) => void;
  closeDialog: () => void;
};

function RegisterContent({ setMode, closeDialog }: Props) {
  const { signin } = useAuthContext();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: (values: RegisterSchemaType) =>
      axios.post("/api/auth/register", values),
  });

  async function onSubmit(values: RegisterSchemaType) {
    await mutateAsync(values, {
      onSuccess: (res) => {
        if (res.status === 201) {
          signin(res.data.token);
          closeDialog();
        }
      },
    });
  }

  return (
    <>
      <DialogHeader>
        <h2 className="font-bold text-3xl mb-8">Register</h2>
      </DialogHeader>

      <Form.Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Form.FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <Form.FormItem>
                <Form.FormLabel>Name</Form.FormLabel>
                <Form.FormControl>
                  <Input placeholder="Name" {...field} />
                </Form.FormControl>

                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
          <Form.FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <Form.FormItem>
                <Form.FormLabel>Email</Form.FormLabel>
                <Form.FormControl>
                  <Input placeholder="Email" {...field} />
                </Form.FormControl>

                <Form.FormMessage />
              </Form.FormItem>
            )}
          />

          <Form.FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <Form.FormItem>
                <Form.FormLabel>Password</Form.FormLabel>
                <Form.FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </Form.FormControl>

                <Form.FormMessage />
              </Form.FormItem>
            )}
          />

          {isAxiosError(error) && (
            <Alert variant="destructive">
              <AlertDescription>
                {error.response?.data.message ?? "Something went wrong"}
              </AlertDescription>
            </Alert>
          )}

          <LoadingButton isLoading={isLoading}>Register</LoadingButton>
        </form>
      </Form.Form>

      <p className="text-sm font-semibold text-center mt-8">
        Already a member?{" "}
        <button
          onClick={() => setMode("login")}
          className="text-primary hover:underline"
        >
          Login here
        </button>
      </p>
    </>
  );
}

export default RegisterContent;
