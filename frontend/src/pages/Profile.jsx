import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { FaCamera } from "react-icons/fa";

import { api } from "@/api/Api";
import { setUser } from "@/app/features/AuthSlice/authSlice";
import Loader from "@/components/Loader";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [userProfile, setUserProfile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${user?._id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserProfile(response.data.user);
        }
      } catch (error) {
        toast.error("Failed to fetch user data.", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  // Form validation schema
  const formSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    bio: z.string().min(10, "Bio must be at least 10 characters long"),
  });

  // Form initialization
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
    },
  });

  // Populate form fields with fetched user data
  useEffect(() => {
    if (userProfile) {
      form.reset({
        username: userProfile.username || "",
        email: userProfile.email || "",
        bio: userProfile.bio || "",
      });
    }
  }, [userProfile, form]);

  // Handle form submission
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("bio", values.bio);

      const response = await api.put(`/user/${user._id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar file upload
  const handleFileUpload = (files) => {
    const file = files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Show loader while loading
  if (loading) return <Loader />;

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        {/* Avatar Upload Section */}
        <div className="flex items-center justify-center mt-10">
          <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="relative group">
                <input {...getInputProps()} />
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={avatarPreview || userProfile?.avatar}
                    alt="Avatar"
                  />
                  <div className="absolute inset-0  items-center justify-center bg-black bg-opacity-25 rounded-full cursor-pointer hidden group-hover:flex">
                    <FaCamera className="text-white" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>

        {/* Profile Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader /> : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Profile;
