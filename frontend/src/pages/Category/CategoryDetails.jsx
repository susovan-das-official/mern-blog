/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { api } from "@/api/Api";
import { RouteAddCategory } from "@/helper/RouteName";

const CategoryDetails = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await api.get("/category/all-category", {
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
  }, []);

  // Handle category deletion
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;

      const response = await api.delete(`/category/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success(response?.data?.message);
        setCategoryData((prev) => prev.filter((cat) => cat._id !== id));
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred while deleting the category.");
    }
  };

  return (
    <div>
      <Card>
        {/* Header Section */}
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent>
          <Table>
            <TableCaption className="underline-offset-4">
              A list of Categories
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Render category data or fallback if no data */}
              {categoryData && categoryData.length > 0 ? (
                categoryData.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.slug}
                    </TableCell>
                    <TableCell className="flex gap-4">
                      {/* Edit Button */}
                      <Button
                        variant="outline"
                        className="hover:bg-gray-900 hover:text-white"
                        asChild
                      >
                        <Link to={`/category/edit/${category._id}`}>
                          <FaEdit />
                        </Link>
                      </Button>

                      {/* Delete Button */}
                      <Button
                        variant="outline"
                        className="hover:bg-gray-900 hover:text-white"
                        size="icon"
                        onClick={() => handleDelete(category._id)}
                      >
                        <RiDeleteBin6Fill color="red" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No categories found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
