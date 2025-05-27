"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDashboardPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/student/shop');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <p className="text-muted-foreground">Redirecting to your dashboard...</p>
    </div>
  );
}
