export interface Notification {
  sender: string;
  receiver: string;
  username: string;
  type: 'like' | 'comment' | 'follow';
  post?: string;
  timestamp: Date;
}
