export interface UserProfileProps {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  avatar?: string;
}
