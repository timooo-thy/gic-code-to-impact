'use client';

import Navbar from '@/components/Navbar';
import { Skeleton } from '@/components/ui/skeleton';
import TradeDashboard from '@/components/TradeDashboard';
import { Role } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const role = localStorage.getItem('role');
    if (!token || !role) {
      router.push('/sign-in');
      return;
    }
    setRole(role as Role);
  }, [router]);

  if (role === Role.Admin || role === Role.Trader) {
    return <TradeDashboard />;
  } else {
    return (
      <main className='flex min-h-screen w-4/5 flex-col m-auto'>
        <Navbar />
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5'>
            {Array.from({ length: 10 }).map((_, id) => (
              <Skeleton className='h-40' key={id} />
            ))}
          </div>
          <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 max-h-[500px]'>
            <Skeleton className='h-[500px] col-span-full' />
          </div>
        </main>
      </main>
    );
  }
}
