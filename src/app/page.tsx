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
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleStudentLogin = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    console.log("Student Login:", studentEmail, studentPassword);
    router.push("/student/shop");
  };

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    console.log("Admin Login:", adminEmail, adminPassword);
    router.push("/admin/inventory");
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
                  <Label htmlFor="student-email">Email</Label>
                  <Input 
                    id="student-email" 
                    type="email" 
                    placeholder="student@example.com" 
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
                  <Label htmlFor="admin-email">Email</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    placeholder="admin@example.com" 
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
      <p className="mt-8 text-sm text-muted-foreground">
        Campus Hub &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
