/* eslint-disable no-unused-vars */
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
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/api/Api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useParams } from "react-router-dom";

const EditCategory = () => {
  const { categoryId } = useParams();

  // State for managing category data, loading, and error
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form schema validation using Zod
  const formSchema = z.object({
    name: z.string().min(3, "Category name must be at least 3 character long"),
    slug: z.string().min(3, "Category slug must be at least 3 character long"),
  });

  // React Hook Form setup with resolver and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // Fetch category data when component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/category/${categoryId}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setCategoryData(response.data?.data);
        } else {
          setError(response.data?.message || "Unexpected error occurred.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "An error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  // Auto-generate slug when the category name changes
  useEffect(() => {
    const categoryName = form.watch("name");
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    }
  }, [form.watch("name")]);

  // Populate form values with fetched category data
  useEffect(() => {
    if (categoryData) {
      form.setValue("name", categoryData.name);
      form.setValue("slug", categoryData.slug);
    }
  }, [categoryData, form]);

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      const response = await api.put(`/category/${categoryId}`, values, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success(
          response?.data?.message || "Category updated successfully!"
        );
      } else {
        toast.error(response?.data?.message || "Failed to update category.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <Card className="mt-10 py-6">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default EditCategory;
