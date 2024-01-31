interface Product {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  partidaId: number;
  productTypeId: string;
  code: string;
  commonName: string;
  providerId: string;
  unitId: string;
  presentation: string;
  quantityPerUnit: string;
  isKosher: boolean;
  departmentId: string;
  unit: Unit;
  kosherDetails: KosherDetails;
  purchaseData: PurchaseData;
  productionData: ProductionData;
  provider: Provider;
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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: string;
  id: string;
  agency: string;
  certifiedCompany: string;
  nameOnCertificate: string;
  kidOrUkd: string;
  certificatePageNumber: number;
  certificateValidity: Date;
}

interface PurchaseData {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: string;
  id: string;
  partidaId: number;
  allergen: string;
  productId: string;
}

interface ProductionData {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: string;
  id: string;
  partidaId: number;
  productId: string;
  description: string;
  packaging: string;
  mold: string;
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
  description: string;
}

type GetProductTypesResponse = {
  data: ProductType[];
  pagination: Pagination;
};
