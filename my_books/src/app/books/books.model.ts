export interface Books {
  id: string;
  title: string;
  description: string;
  price: number;
  publishDate?: Date;
  author: {
    id: string,
    completeName
  };
}
