'use client';

import Image from 'next/image';

export default function PageLoading() {
  return (
    <div className="inset-0 z-50 flex size-full flex-col items-center justify-center gap-8 bg-white backdrop-blur-md transition-opacity duration-300">
      <div className="relative p-2">
        <Image
          src="/logos/pulisync_fav-64.png"
          alt="Profile"
          className="size-12 rounded-full"
          width={48}
          height={48}
        />
        <div className="absolute inset-[-10px] animate-[spin_0.6s_linear_infinite] rounded-full border-4 border-primary-50 border-t-primary-500"></div>
      </div>
      <p className="font-medium">Loading...</p>
    </div>
  );
}
