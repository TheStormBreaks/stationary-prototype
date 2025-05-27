"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/inventory');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <p className="text-muted-foreground">Redirecting to admin dashboard...</p>
    </div>
  );
}
