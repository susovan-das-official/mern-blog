import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { RouteIndex, RouteSignUp } from "@/helper/RouteName";
import { loginApi } from "@/api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      // Login the user
      const response = await loginApi(values);

      if (response.status === 200) {
        toast.success(response.data.message);
        form.reset();
        navigate(RouteIndex);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        toast.error(response.data.message);
        form.reset();
        navigate(RouteSignUp);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      navigate(RouteSignUp);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-[400px] px-5 py-10">
        <h1 className="text-center mb-5 text-2xl font-bold">
          Login Into Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jhon.123example"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
            <div className="mt-5 text-sm flex justify-center items-center gap-2">
              <p>Do&apos;t have account?</p>
              <Link
                to={RouteSignUp}
                className="underline underline-offset-1 text-blue-600"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};
export default SignIn;
