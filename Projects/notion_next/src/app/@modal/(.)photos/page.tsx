'use client';

import PhotoCard from '@/components/features/photo/PhotoCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PhotoPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Photo Card Dialog</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center p-8">
          <PhotoCard id={id} modal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
