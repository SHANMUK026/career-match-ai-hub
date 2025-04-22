
export type Theme = 'dark' | 'light' | 'system';

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  title?: string;
  location?: string;
  notifications_email?: boolean;
  notifications_app?: boolean;
  notifications_interviews?: boolean;
  notifications_jobs?: boolean;
  theme?: Theme;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  location: string;
  notificationsEmail: boolean;
  notificationsApp: boolean;
  notificationsInterviews: boolean;
  notificationsJobs: boolean;
  theme: Theme;
}
