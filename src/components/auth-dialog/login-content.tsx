import {
  LoginSchemaType,
  loginSchema,
} from "@/lib/validations/auth-validations";
import { DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Mode } from "./auth-content";
import * as Form from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import LoadingButton from "../ui/loading-button";

type Props = {
  setMode: (val: Mode) => void;
  closeDialog: () => void;
};

function LoginContent({ setMode, closeDialog }: Props) {
  const { signin } = useAuthContext();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: (values: LoginSchemaType) =>
      axios.post("/api/auth/login", values),
  });

  async function onSubmit(values: LoginSchemaType) {
    await mutateAsync(values, {
      onSuccess: (res) => {
        if (res.status === 200) {
          signin(res.data.token);
          closeDialog();
        }
      },
    });
  }

  return (
    <>
      <DialogHeader>
        <h2 className="font-bold text-3xl mb-8">Sign in</h2>
      </DialogHeader>

      <Form.Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
          <LoadingButton isLoading={isLoading}>Sign in</LoadingButton>
        </form>
      </Form.Form>

      <p className="text-sm font-semibold text-center mt-8">
        Not a member?{" "}
        <button
          onClick={() => setMode("register")}
          className="text-primary hover:underline"
        >
          Register here
        </button>
      </p>
    </>
  );
}

export default LoginContent;
