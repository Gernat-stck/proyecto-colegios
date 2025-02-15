"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/UserType.d";
import { toast } from "sonner";

const API_URL = "/api/users"; // Replace with your actual API URL

const UsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentUser) {
        // Update existing user
        const response = await fetch(`${API_URL}/${currentUser.user_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to update user");
        const updatedUser = await response.json();
        setUsers(
          users.map((user) =>
            user.user_id === updatedUser.user_id ? updatedUser : user
          )
        );
        toast.success("Usuario Actualizado Correctamente");
      } else {
        // Add new user
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to create user");
        const newUser = await response.json();
        setUsers([...users, newUser]);
        toast.success("Usuario Creado Correctamente");
      }
      setCurrentUser(null);
      setFormData({
        user_id: "",
        name: "",
        email: "",
        password: "",
        avatar: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ha ocurrido un error"
      );
    }
  };
  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setFormData({
      ...user,
      password: "",
      avatar: user.avatar || "", // Asegúrate de que avatar siempre sea un string
    });
  };
  const handleDelete = async (user_id: string) => {
    try {
      const response = await fetch(`${API_URL}/${user_id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((user) => user.user_id !== user_id));
      toast.success("Usuario Eliminado Correctamente");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ha ocurrido un error"
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            placeholder="User ID"
            required
          />
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required={!currentUser}
          />
          <Input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleInputChange}
            placeholder="Avatar URL"
          />
        </div>
        <Button type="submit" className="w-full">
          {currentUser ? "Update User" : "Add User"}
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell>{user.user_id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.avatar ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user.user_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersAdmin;
