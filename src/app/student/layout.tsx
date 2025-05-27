"use client"; // This layout uses client-side state for mock data

import { StudentHeader } from "@/components/student/StudentHeader";
import { useState, useEffect } from "react";
import type { ShopStatus } from "@/types";

// Mock function to simulate fetching shop status
async function fetchShopStatus(): Promise<ShopStatus> {
  // In a real app, this would be an API call
  return new Promise(resolve => setTimeout(() => resolve({ isOpen: true, message: "Exams approaching! Get your supplies." }), 500));
}

// Mock function to simulate fetching cart item count
async function fetchCartItemCount(): Promise<number> {
  return new Promise(resolve => setTimeout(() => resolve(3), 500)); // Example: 3 items in cart
}


export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shopStatus, setShopStatus] = useState<ShopStatus>({ isOpen: true });
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      const [status, count] = await Promise.all([fetchShopStatus(), fetchCartItemCount()]);
      setShopStatus(status);
      setCartItemCount(count);
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  // A simple loading state can be shown here if needed
  if (isLoading) {
     return (
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              {/* Placeholder Logo */}
               <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
               <div className="flex items-center gap-4">
                <div className="h-8 w-24 bg-muted rounded animate-pulse hidden sm:block"></div>
                <div className="h-9 w-9 bg-muted rounded-full animate-pulse"></div>
               </div>
            </div>
          </header>
          <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
             <div className="w-full h-64 bg-muted rounded animate-pulse"></div>
          </main>
          <footer className="py-6 text-center text-sm text-muted-foreground border-t">
            Campus Hub &copy; {new Date().getFullYear()}
          </footer>
        </div>
     )
  }


  return (
    <div className="flex flex-col min-h-screen">
      <StudentHeader shopStatus={shopStatus} cartItemCount={cartItemCount} />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t bg-card">
        Campus Hub &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
