"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/shared/Logo";
import { Briefcase, GraduationCap, LogOut, ShoppingCart, UserCircle, Printer, History, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ShopStatus } from "@/types"; // Assuming ShopStatus type is defined

interface StudentHeaderProps {
  shopStatus: ShopStatus; // To be fetched or managed globally
  cartItemCount: number; // To be fetched or managed globally
}

export function StudentHeader({ shopStatus, cartItemCount }: StudentHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/student/shop" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
           <Badge variant={shopStatus.isOpen ? "default" : "destructive"} className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm">
            <Store className="h-4 w-4" />
            {shopStatus.isOpen ? "Shop Open" : "Shop Closed"}
          </Badge>
          {shopStatus.message && <span className="text-xs text-muted-foreground hidden lg:block">{shopStatus.message}</span>}

          <nav className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/student/shop" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> Shop
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/student/print-orders" className="flex items-center gap-1">
                <Printer className="h-4 w-4" /> Print Orders
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/student/orders" className="flex items-center gap-1">
                <History className="h-4 w-4" /> My Orders
              </Link>
            </Button>
            <Button variant="ghost" asChild className="relative">
              <Link href="/student/cart" className="flex items-center gap-1">
                <ShoppingCart className="h-4 w-4" /> Cart
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Student Avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>
                    <GraduationCap />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Student User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    student@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/student/shop')}>
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Shop</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/student/print-orders')}>
                <Printer className="mr-2 h-4 w-4" />
                <span>Print Orders</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/student/orders')}>
                <History className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/student/cart')}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Cart</span>
                 {cartItemCount > 0 && <Badge variant="outline" className="ml-auto">{cartItemCount}</Badge>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
       <div className="sm:hidden flex items-center justify-center p-2 border-t bg-card">
         <Badge variant={shopStatus.isOpen ? "default" : "destructive"} className="flex items-center gap-1 px-3 py-1.5 text-sm">
            <Store className="h-4 w-4" />
            {shopStatus.isOpen ? "Shop Open" : "Shop Closed"}
          </Badge>
      </div>
    </header>
  );
}
