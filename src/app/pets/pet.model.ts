export interface Pet {
  id: string;
  name: string;
  type: string;
  age: number;
  gender: string;
  weight?: number;
  breed?: string;
  facility?: string;
  description?: string;
  adopted: boolean;
  imageUrl?: string;
  dateAdded?: string | Date;

}
