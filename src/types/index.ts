
export interface Link {
  id: string;
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  isRead: boolean;
  createdAt: Date;
  tags?: string[];
}

export interface UserSettings {
  email: string;
  weeklyDigestDay: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  weeklyDigestEnabled: boolean;
}
