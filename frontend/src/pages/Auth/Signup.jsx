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
import { RouteSignIn } from "@/helper/RouteName";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "@/api/Api";
import GoogleLogin from "@/components/GoogleLogin";

const Signup = () => {
  const navigate = useNavigate();


  const formSchema = z
    .object({
      username: z.string().min(3, "Username must be at least 3 character long"),
      email: z.string().email(),
      password: z.string().min(8, "Password must be at least 8 character long"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and confirm password must match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await registerApi(values);
      if (response.status === 201) {
        toast.success(response?.data?.message);
        form.reset();
        navigate(RouteSignIn);
      } else {
        toast.error(response?.data?.message);
        form.reset();
        navigate(RouteSignIn);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      navigate(RouteSignIn);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-[400px] px-5 pb-10 pt-5">
        <h1 className="text-center mb-5 text-2xl font-bold">
          Create your Acccount
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john Doe" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
                Sign Up
              </Button>
            </div>

            <div>
              <div className="border my-5 flex justify-center items-center">
                <span className="absolute bg-white text-sm">Or</span>
              </div>
              <GoogleLogin />
            </div>
            <div className="mt-5 text-sm flex justify-center items-center gap-2">
              <p>You already have account?</p>
              <Link
                to={RouteSignIn}
                className="underline underline-offset-1 text-blue-600"
              >
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};
export default Signup;
