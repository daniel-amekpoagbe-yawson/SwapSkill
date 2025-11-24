export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
  register: any;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
  // Add other fields as needed
}

export type FilterState = {
  category: string;
  priceRange: [number, number];
  rating: number;
  level: string;
  location: string;
  isOnline: boolean | null;
};

//=========================SUPABASE TYPE DEFINITIONS=======================//

export type Skill = {
  id: string;
  title: string;
  description: string;
  category: string;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: Date;
  price: number;
  level: string;
  location: string;
  tags: string[];
  exchangeType: string;
  imageUrl: string;
  approved: boolean;
};
