
import React, { useState, useEffect } from 'react';
import { getLinks } from '../data/links';
import { Link } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Bookmark, Search, BookmarkCheck, Mail } from 'lucide-react';
import LinkCard from '../components/LinkCard';
import AddLinkForm from '../components/AddLinkForm';
import EmptyState from '../components/EmptyState';
import SettingsDialog from '../components/SettingsDialog';
import { useToast } from '../hooks/use-toast';
import { getUserSettings } from '../data/settings';

const Index = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('all');
  const { toast } = useToast();
  
  // Load links from storage
  const loadLinks = () => {
    const storedLinks = getLinks();
    setLinks(storedLinks);
  };
  
  useEffect(() => {
    loadLinks();
    checkSettings();
  }, []);
  
  // Check if user has set up their email
  const checkSettings = () => {
    const settings = getUserSettings();
    if (settings.weeklyDigestEnabled && !settings.email) {
      setTimeout(() => {
        toast({
          title: "Set up your weekly digest",
          description: "Add your email in settings to receive your weekly link digest",
        });
      }, 1000);
    }
  };
  
  // Filter links based on search and current tab
  const filteredLinks = links.filter(link => {
    const matchesSearch = 
      searchQuery === '' || 
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (link.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (link.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
    if (currentTab === 'all') return matchesSearch;
    if (currentTab === 'unread') return matchesSearch && !link.isRead;
    if (currentTab === 'read') return matchesSearch && link.isRead;
    return matchesSearch;
  });
  
  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };
  
  const handleShowEmailPreview = () => {
    const settings = getUserSettings();
    if (!settings.email) {
      toast({
        title: "Email not set up",
        description: "Please add your email in settings first",
        variant: "destructive",
      });
      return;
    }
    
    const unreadCount = links.filter(link => !link.isRead).length;
    
    toast({
      title: "Weekly Digest Preview",
      description: `Your digest with ${unreadCount} links would be sent to ${settings.email} every ${settings.weeklyDigestDay}.`,
    });
  };
  
  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Weekly Link Stash</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShowEmailPreview}
              className="flex items-center text-muted-foreground hover:text-foreground transition"
            >
              <Mail size={18} />
            </button>
            <SettingsDialog />
          </div>
        </div>
        
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search links..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      
      <Tabs defaultValue="all" value={currentTab} onValueChange={handleTabChange}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              <Bookmark className="h-4 w-4 mr-1" />
              Unread
            </TabsTrigger>
            <TabsTrigger value="read">
              <BookmarkCheck className="h-4 w-4 mr-1" />
              Read
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          {filteredLinks.length > 0 ? (
            filteredLinks.map(link => (
              <LinkCard 
                key={link.id} 
                link={link} 
                onUpdate={loadLinks} 
              />
            ))
          ) : (
            searchQuery ? (
              <div className="text-center py-8 text-muted-foreground">
                No links found matching "{searchQuery}"
              </div>
            ) : (
              <EmptyState onAddClick={handleOpenAddDialog} />
            )
          )}
        </TabsContent>
        
        <TabsContent value="unread" className="space-y-4">
          {filteredLinks.length > 0 ? (
            filteredLinks.map(link => (
              <LinkCard 
                key={link.id} 
                link={link} 
                onUpdate={loadLinks} 
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? (
                <div>No unread links found matching "{searchQuery}"</div>
              ) : (
                <div>No unread links in your stash</div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="read" className="space-y-4">
          {filteredLinks.length > 0 ? (
            filteredLinks.map(link => (
              <LinkCard 
                key={link.id} 
                link={link} 
                onUpdate={loadLinks} 
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? (
                <div>No read links found matching "{searchQuery}"</div>
              ) : (
                <div>No read links in your stash</div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <AddLinkForm onLinkAdded={loadLinks} />
    </div>
  );
};

export default Index;
