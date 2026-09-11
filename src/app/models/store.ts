export interface StoreItem {
  id: string;
  name: string;
  description: string;
  currency: 'money' | 'research';
  cost: number;
  repeatable: boolean;
}