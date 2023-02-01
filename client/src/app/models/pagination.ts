export interface Metadata {
   currentPage: number
   totalPages: number
   pageSize: number
   totalCount: number
}

// Initialize pagination data 
export class PaginateResponse<GenericType> {
   pageItems: GenericType
   pageInfo: Metadata

   constructor(pageItems: GenericType, pageInfo: Metadata) {
      this.pageItems = pageItems
      this.pageInfo = pageInfo
   }
}

