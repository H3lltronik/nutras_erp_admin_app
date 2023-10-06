interface Product {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  partidaId: number;
  productTypeId?: string;
  code: string;
  commonName: string;
  providerId?: string;
  unitId: string;
  isKosher?: boolean;
  unit: Measurement;
  provider: Provider;
  kosherDetails?: KosherDetails;
  purchaseData?: PurchaseData;
  productionData?: ProductionData;
}

type CreateProductRequest = Omit<Product, "id">;
type UpdateProductRequest = Product;

type GetProductResponse = Product;

type GetProductsResponse = {
  data: Product[];
  pagination: Pagination;
};

type UpdatedProductResponse = Product;

type DeleteProductResponse = Product;

type ProductCreatedResponse = Product;

// parsed

type ProductWithStatus = Product & { status: string };
type ProductsWithStatus = ProductWithStatus[];
type GetProductsResponseWithStatus = {
  data: ProductsWithStatus;
  pagination: Pagination;
};

interface KosherDetails {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  agency: string;
  certifiedCompany: string;
  nameOnCertificate: string;
  kidOrUkd: string;
  certificatePageNumber: number;
  certificateValidity: string;
}

interface PurchaseData {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  partidaId: number;
  presentation: string;
  quantityPerUnit: string;
  allergen: string;
  productId: string;
}

interface ProductionData {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  partidaId: number;
  productId: string;
  description: string;
  packaging: string;
  mold: string;
  presentation: string;
  ptPresentation: string;
}

//
//
//

interface ProductType {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  partidaId: number;
  name: string;
}

type GetProductTypesResponse = ProductType[];

type GetProductTypesResponseData = {
  data: GetProductTypesResponse;
};
