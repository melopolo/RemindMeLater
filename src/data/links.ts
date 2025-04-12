
import { Link } from "../types";

// Mock data for the MVP
export const mockLinks: Link[] = [
  {
    id: "1",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Never Gonna Give You Up - Rick Astley",
    description: "Official music video for Rick Astley's hit song.",
    imageUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    isRead: false,
    createdAt: new Date("2023-04-09T10:30:00"),
    tags: ["music", "youtube"]
  },
  {
    id: "2",
    url: "https://www.nytimes.com/2023/01/15/technology/ai-technology-trends.html",
    title: "The Future of AI: What to Expect in the Coming Years",
    description: "Experts weigh in on the technology trends shaping our future.",
    imageUrl: "https://static01.nyt.com/images/2023/01/15/business/15ai-future/15ai-future-jumbo.jpg",
    isRead: true,
    createdAt: new Date("2023-04-07T15:45:00"),
    tags: ["tech", "news", "ai"]
  },
  {
    id: "3",
    url: "https://github.com/facebook/react",
    title: "GitHub - facebook/react: A JavaScript library for building user interfaces",
    description: "The React.js repository on GitHub",
    imageUrl: "https://repository-images.githubusercontent.com/10270250/5b9ad300-9fb8-11e9-8dc1-a66705a3fb9a",
    isRead: false,
    createdAt: new Date("2023-04-08T09:15:00"),
    tags: ["programming", "react"]
  },
  {
    id: "4",
    url: "https://css-tricks.com/responsive-layouts-for-2023/",
    title: "Modern Responsive Layout Techniques for 2023",
    description: "Learn the latest CSS techniques for creating responsive layouts.",
    imageUrl: "https://css-tricks.com/wp-content/uploads/2022/12/responsive-layouts-2023.jpg",
    isRead: false,
    createdAt: new Date("2023-04-10T11:20:00"),
    tags: ["css", "webdev"]
  }
];

// Local storage implementation for MVP
const STORAGE_KEY = "weekly_link_stash";

export const saveLink = (link: Omit<Link, "id" | "createdAt">): Link => {
  const links = getLinks();
  const newLink: Link = {
    ...link,
    id: Date.now().toString(),
    createdAt: new Date()
  };
  
  links.unshift(newLink); // Add to beginning of array
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  return newLink;
};

export const getLinks = (): Link[] => {
  const storedLinks = localStorage.getItem(STORAGE_KEY);
  if (!storedLinks) {
    // Initialize with mock data for demo
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockLinks));
    return mockLinks;
  }
  
  try {
    const parsedLinks = JSON.parse(storedLinks);
    return parsedLinks.map((link: any) => ({
      ...link,
      createdAt: new Date(link.createdAt)
    }));
  } catch (error) {
    console.error("Error parsing links from storage:", error);
    return [];
  }
};

export const updateLink = (updatedLink: Link): void => {
  const links = getLinks();
  const index = links.findIndex(link => link.id === updatedLink.id);
  
  if (index !== -1) {
    links[index] = updatedLink;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }
};

export const deleteLink = (id: string): void => {
  const links = getLinks();
  const filteredLinks = links.filter(link => link.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLinks));
};

export const markLinkAsRead = (id: string, isRead: boolean = true): void => {
  const links = getLinks();
  const index = links.findIndex(link => link.id === id);
  
  if (index !== -1) {
    links[index].isRead = isRead;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }
};
