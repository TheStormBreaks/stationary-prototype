"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { ShopStatus } from "@/types";
import { useState, useEffect } from "react";
import { Power, Edit, Save } from "lucide-react";

// Mock function to simulate fetching/saving shop status
async function getShopStatus(): Promise<ShopStatus> {
  // In a real app, fetch from backend
  const storedStatus = localStorage.getItem("shopStatus");
  if (storedStatus) return JSON.parse(storedStatus);
  return { isOpen: true, message: "Welcome! We are open." };
}

async function saveShopStatus(status: ShopStatus): Promise<void> {
  // In a real app, save to backend
  localStorage.setItem("shopStatus", JSON.stringify(status));
  console.log("Shop status saved:", status);
}


export default function ShopStatusPage() {
  const { toast } = useToast();
  const [shopStatus, setShopStatus] = useState<ShopStatus>({ isOpen: true, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStatus() {
      setIsLoading(true);
      const status = await getShopStatus();
      setShopStatus(status);
      setIsLoading(false);
    }
    loadStatus();
  }, []);

  const handleStatusChange = (isOpen: boolean) => {
    setShopStatus(prev => ({ ...prev, isOpen }));
  };

  const handleMessageChange = (message: string) => {
    setShopStatus(prev => ({ ...prev, message }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    await saveShopStatus(shopStatus);
    setIsLoading(false);
    toast({
      title: "Shop Status Updated",
      description: `The shop is now ${shopStatus.isOpen ? "Open" : "Closed"}. Message: "${shopStatus.message || 'N/A'}"`,
      variant: "default",
    });
  };

  if (isLoading && !shopStatus.message) { // Added check for message to prevent flicker on initial load
    return (
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <Power className="h-8 w-8 text-primary" /> Shop Status Control
            </CardTitle>
            <CardDescription>Manage whether the shop is displayed as open or closed to students.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="max-w-md mx-auto shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="h-10 bg-muted rounded animate-pulse"></div>
            <div className="h-24 bg-muted rounded animate-pulse"></div>
            <div className="h-10 bg-muted rounded animate-pulse w-1/2 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Power className="h-8 w-8 text-primary" /> Shop Status Control
          </CardTitle>
          <CardDescription>Manage whether the shop is displayed as open or closed to students.</CardDescription>
        </CardHeader>
      </Card>

      <Card className="max-w-md mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Current Status: 
            <span className={`ml-2 font-semibold ${shopStatus.isOpen ? 'text-green-600' : 'text-red-600'}`}>
              {shopStatus.isOpen ? "Open" : "Closed"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg shadow-sm bg-background">
            <Label htmlFor="shop-open-switch" className="text-lg font-medium">
              Shop is Open
            </Label>
            <Switch
              id="shop-open-switch"
              checked={shopStatus.isOpen}
              onCheckedChange={handleStatusChange}
              aria-label="Toggle shop open status"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status-message" className="font-medium">Status Message (Optional)</Label>
            <Textarea
              id="status-message"
              placeholder={shopStatus.isOpen ? "e.g., Special discounts today!" : "e.g., Closed for maintenance until 2 PM."}
              value={shopStatus.message || ""}
              onChange={(e) => handleMessageChange(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">This message will be displayed to students along with the status.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges} className="w-full" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" /> {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
