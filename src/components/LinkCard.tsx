
import React from 'react';
import { Link } from '../types';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bookmark, Check, TrashIcon } from 'lucide-react';
import { markLinkAsRead, deleteLink } from '../data/links';
import { useToast } from '../hooks/use-toast';

interface LinkCardProps {
  link: Link;
  onUpdate: () => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onUpdate }) => {
  const { toast } = useToast();
  
  const handleToggleRead = () => {
    markLinkAsRead(link.id, !link.isRead);
    toast({
      title: link.isRead ? "Marked as unread" : "Marked as read",
      duration: 2000,
    });
    onUpdate();
  };
  
  const handleDelete = () => {
    deleteLink(link.id);
    toast({
      title: "Link deleted",
      duration: 2000,
    });
    onUpdate();
  };
  
  const handleOpenLink = () => {
    window.open(link.url, '_blank');
  };

  // Extract domain from URL for display
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch (e) {
      return url;
    }
  };

  return (
    <Card className={`link-card ${link.isRead ? 'opacity-70' : ''}`}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          {link.imageUrl && (
            <div className="w-full h-40 overflow-hidden rounded-md mb-2">
              <img 
                src={link.imageUrl} 
                alt={link.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <h3 className={`font-medium text-lg line-clamp-2 ${link.isRead ? 'text-muted-foreground' : ''}`}>
            {link.title}
          </h3>
          
          {link.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {link.description}
            </p>
          )}
          
          <div className="flex items-center text-sm text-muted-foreground">
            <ExternalLink size={14} className="mr-1" />
            <span>{getDomain(link.url)}</span>
          </div>
          
          {link.tags && link.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {link.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleOpenLink}>
          <ExternalLink size={16} className="mr-1" /> Open
        </Button>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleToggleRead}
            title={link.isRead ? "Mark as unread" : "Mark as read"}
          >
            {link.isRead ? <Bookmark size={16} /> : <Check size={16} />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDelete}
            title="Delete link"
          >
            <TrashIcon size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LinkCard;
