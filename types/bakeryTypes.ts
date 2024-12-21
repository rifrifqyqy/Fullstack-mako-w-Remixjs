export type menuType = {
  averageRating: any;
  price: number;
  id: number;
  title: string;
  thumb: string;
  description: string;
  gallery: string[];
  kategori: string;
};

export type paginateType = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
