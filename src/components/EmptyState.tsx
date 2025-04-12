
import React from 'react';
import { BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-primary/10 rounded-full p-6 mb-4">
        <BookmarkPlus size={48} className="text-primary pulse-animation" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">Your Link Stash is Empty</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start collecting interesting links from around the web for your weekly digest.
      </p>
      
      <Button onClick={onAddClick}>
        <BookmarkPlus size={18} className="mr-2" />
        Add Your First Link
      </Button>
    </div>
  );
};

export default EmptyState;
