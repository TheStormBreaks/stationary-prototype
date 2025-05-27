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
import { Building, LogOut, UserCog, Printer, Archive, Power } from "lucide-react";

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/admin/inventory" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/admin/inventory" className="flex items-center gap-1">
                <Archive className="h-4 w-4" /> Inventory
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/admin/print-orders" className="flex items-center gap-1">
                <Printer className="h-4 w-4" /> Print Queue
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/admin/shop-status" className="flex items-center gap-1">
                <Power className="h-4 w-4" /> Shop Status
              </Link>
            </Button>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Admin Avatar" data-ai-hint="admin avatar" />
                  <AvatarFallback>
                    <UserCog />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@campushub.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
               <DropdownMenuItem onClick={() => router.push('/admin/inventory')}>
                <Archive className="mr-2 h-4 w-4" />
                <span>Inventory</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/admin/print-orders')}>
                <Printer className="mr-2 h-4 w-4" />
                <span>Print Queue</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/admin/shop-status')}>
                <Power className="mr-2 h-4 w-4" />
                <span>Shop Status</span>
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
    </header>
  );
}
