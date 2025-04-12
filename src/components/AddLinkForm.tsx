
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';
import { saveLink } from '../data/links';
import { useToast } from '../hooks/use-toast';

interface AddLinkFormProps {
  onLinkAdded: () => void;
}

const AddLinkForm: React.FC<AddLinkFormProps> = ({ onLinkAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic URL validation
    if (!url || !url.trim().startsWith('http')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Process tags
    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    try {
      saveLink({
        url: url.trim(),
        title: title.trim() || url.trim(), // Use URL as title if not provided
        description: description.trim(),
        isRead: false,
        tags: tags.length > 0 ? tags : undefined,
      });
      
      toast({
        title: "Link saved!",
        description: "Your link has been added to your stash",
      });
      
      // Reset form
      setUrl('');
      setTitle('');
      setDescription('');
      setTagsInput('');
      setIsOpen(false);
      
      // Notify parent component
      onLinkAdded();
    } catch (error) {
      console.error("Error saving link:", error);
      toast({
        title: "Error",
        description: "Failed to save link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tryExtractMetadata = async () => {
    if (!url || !url.trim().startsWith('http')) return;
    
    // In a real app, you'd call a backend service to fetch the URL metadata
    // For the MVP, we're simulating this with a timeout
    
    toast({
      title: "Fetching link details...",
      duration: 2000,
    });
    
    // Simulate network request
    setTimeout(() => {
      // This is just a dummy implementation - in a real app,
      // you'd parse the actual page metadata
      if (url.includes('youtube.com')) {
        setTitle("YouTube Video");
        setDescription("A video from YouTube");
        setTagsInput("video,youtube");
      } else if (url.includes('twitter.com')) {
        setTitle("Twitter Post");
        setDescription("A tweet from Twitter");
        setTagsInput("social,twitter");
      } else {
        setTitle("Interesting Link");
        setDescription("Content from the web");
        setTagsInput("web");
      }
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg">
          <Plus size={24} />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={tryExtractMetadata}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter a description (optional)"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="e.g. tech, news, important (comma separated)"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Link"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkForm;
