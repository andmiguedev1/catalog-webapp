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