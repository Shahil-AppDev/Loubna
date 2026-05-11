'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-encre-50">
        <div className="text-encre-500">Chargement...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
