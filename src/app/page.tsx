"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/shared/Logo";
import { Building, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [studentEmail, setStudentEmail] = useState("student");
  const [studentPassword, setStudentPassword] = useState("student");
  const [adminEmail, setAdminEmail] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin");

  const handleStudentLogin = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    console.log("Student Login:", studentEmail, studentPassword);
    if (studentEmail === "student" && studentPassword === "student") {
      router.push("/student/shop");
    } else {
      alert("Invalid student credentials. Please use 'student' for both email and password for testing.");
    }
  };

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    console.log("Admin Login:", adminEmail, adminPassword);
     if (adminEmail === "admin" && adminPassword === "admin") {
      router.push("/admin/inventory");
    } else {
      alert("Invalid admin credentials. Please use 'admin' for both email and password for testing.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Tabs defaultValue="student" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student" className="gap-2">
            <GraduationCap className="h-4 w-4" /> Student
          </TabsTrigger>
          <TabsTrigger value="admin" className="gap-2">
            <Building className="h-4 w-4" /> Admin
          </TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Student Login</CardTitle>
              <CardDescription>Access your campus stationery account.</CardDescription>
            </CardHeader>
            <form onSubmit={handleStudentLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Username</Label>
                  <Input 
                    id="student-email" 
                    type="text" 
                    placeholder="student" 
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input 
                    id="student-password" 
                    type="password" 
                    placeholder="••••••••"
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Login as Student
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Manage your campus store.</CardDescription>
            </CardHeader>
            <form onSubmit={handleAdminLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Username</Label>
                  <Input 
                    id="admin-email" 
                    type="text" 
                    placeholder="admin" 
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input 
                    id="admin-password" 
                    type="password" 
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Login as Admin
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>Campus Hub &copy; {new Date().getFullYear()}</p>
        <div className="mt-2 space-y-1">
          <p><strong>Test Student:</strong> student / student</p>
          <p><strong>Test Admin:</strong> admin / admin</p>
        </div>
      </div>
    </div>
  );
}
