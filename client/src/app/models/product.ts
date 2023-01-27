export interface Product {
   id: number;
   name: string;
   image: string;
   brand: string;
   type: string;
   price: number;
   quantity: number;
}

export interface StoreProducts {
   products: Product[]
}

export interface ProductFilters {
   productBrands: [],
   productTypes: []
}

export interface ProductParams {
   pageNumber: number
   pageSize: number
   orderBy: string
   searchWord?: string
   productBrands?: string[]
   productTypes?: string[]
}