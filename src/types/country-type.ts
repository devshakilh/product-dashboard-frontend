export interface Country {
  id: string;
  name: string;
  isoCode: string;
  currency?: string;
  phoneCode?: string;
  flagUrl?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdById?: string | null;
  updatedById: string | null;
}
