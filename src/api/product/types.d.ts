interface Product {
  [key: string]: any; // Allows to add any other key to the object and access it with bracket notation
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  partidaId: number;
  productTypeId: string;
  productTypeCategoryId?: string;
  productTypeCategory?: ProductTypeCategory;
  productType?: ProductType;
  code: string;
  commonName: string;
  providerId: string;
  description: string;
  providerDescription: string;
  packaging: string;
  packagingPrimary: string;
  packagingSecondary: string;
  mold: string;
  notes: string;
  coil: string;
  client: string;
  isActive: boolean;
  unitId: string;
  primaryUnitId: string;
  secondaryUnitId: string;
  presentation: string;
  variableQuantityPerUnit: boolean;
  quantityPerUnit: string;
  quantityPerUnitPrimary: string;
  quantityPerUnitSecondary: string;
  isKosher: boolean;
  allergen: boolean;
  departmentId: string;
  ppNotes: string;
  unit: Unit;
  unitPrimary: Unit;
  unitSecondary: Unit;
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
  allergen: boolean;
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
  packagingPrimary: string;
  packagingSecondary: string;
  mold: string;
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

interface ProductPresentation {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  partidaId: number;
  name: string;
}

type GetProductPresentationsResponse = {
  data: ProductPresentation[];
  pagination: Pagination;
};

type ProductTypeCategory = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  partidaId: number;
  name: string;
  mask: string;
  prefix: string;
  suffix: string;
};

type GetProductTypeCategoriesResponse = {
  data: ProductTypeCategory[];
  pagination: Pagination;
};
