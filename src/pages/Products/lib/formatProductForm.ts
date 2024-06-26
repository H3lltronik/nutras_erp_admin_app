export interface ProductFormResult {
  // From ProductToPost
  isDraft: boolean;
  isPublished: boolean;
  profileId: string;
  id: string;
  productTypeId: string;
  productType: ProductType;
  code: string;
  commonName: string;
  providerId: string;
  providerDescription: string;
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
  departmentId: string;
  productTypeCategoryId: string;
  ppNotes: string;

  // From PurchaseDataToPost
  purchaseDataId: string;
  allergen: boolean;
  purchaseDataProductId: string;

  // From ProductionDataToPost
  productionDataId: string;
  productionDataProductId: string;
  description: string;
  packaging: string;
  packagingPrimary: string;
  packagingSecondary: string;
  mold: string;

  // From KosherDetailsToPost
  kosherDetailsId: string;
  agency: string;
  certifiedCompany: string;
  nameOnCertificate: string;
  kidOrUkd: string;
  certificatePageNumber: number;
  certificateValidity: Date;
  productTypeCategory?: ProductTypeCategory;
}

// Omit kosherDetailsId
export type ProductFormToPopulate = Omit<
  ProductFormResult,
  | "kosherDetailsId"
  | "agency"
  | "certifiedCompany"
  | "nameOnCertificate"
  | "kidOrUkd"
  | "certificatePageNumber"
  | "certificateValidity"
> & { kosherDetails: KosherDetailsToPost };

export interface ProductToPost {
  isDraft?: boolean;
  isPublished?: boolean;
  profileId?: string;
  id?: string;
  productTypeId?: string;
  code?: string;
  commonName?: string;
  providerId?: string;
  providerDescription: string;
  notes?: string;
  unitId?: string;
  presentation?: string;
  quantityPerUnit?: string;
  isKosher?: boolean;
  departmentId?: string;
  kosherDetails: KosherDetailsToPost;
  purchaseData: PurchaseDataToPost;
  productionData: ProductionDataToPost;
}

export interface PurchaseDataToPost {
  id?: string;
  allergen?: boolean;
  productId?: string;
}

export interface ProductionDataToPost {
  id?: string;
  productId?: string;
  description?: string;
  packaging?: string;
  packagingPrimary?: string;
  packagingSecondary?: string;
  mold?: string;
}

export interface KosherDetailsToPost {
  id?: string;
  agency?: string;
  certifiedCompany?: string;
  nameOnCertificate?: string;
  kidOrUkd?: string;
  certificatePageNumber?: number;
  certificateValidity?: string;
}

export const formatProductForm = (productToFormat: ProductFormResult) => {
  console.log("[formatProductForm]", productToFormat);
  const certificateValidity = productToFormat.certificateValidity
    ? new Date(productToFormat.certificateValidity)
    : null;
  const product: ProductToPost = {
    isDraft: productToFormat.isDraft,
    isPublished: productToFormat.isPublished,
    profileId: productToFormat.profileId,
    code: productToFormat.code,
    productTypeId: productToFormat.productTypeId,
    commonName: productToFormat.commonName,
    providerId: productToFormat.providerId,
    providerDescription: productToFormat.providerDescription,
    notes: productToFormat.notes,
    coil: productToFormat.coil,
    client: productToFormat.client,
    isActive: productToFormat.isActive,
    unitId: productToFormat.unitId,
    primaryUnitId: productToFormat.primaryUnitId,
    secondaryUnitId: productToFormat.secondaryUnitId,
    isKosher: productToFormat.isKosher,
    allergen: productToFormat.allergen,
    presentation: productToFormat.presentation,
    variableQuantityPerUnit: productToFormat.variableQuantityPerUnit,
    quantityPerUnit: productToFormat.quantityPerUnit,
    quantityPerUnitPrimary: productToFormat.quantityPerUnitPrimary,
    quantityPerUnitSecondary: productToFormat.quantityPerUnitSecondary,
    departmentId: productToFormat.departmentId,
    productTypeCategoryId: productToFormat.productTypeCategoryId,
    productTypeCategory: productToFormat.productTypeCategory,
    ppNotes: productToFormat.ppNotes,
    purchaseData: {
      allergen: productToFormat.allergen,
    },
    productionData: {
      description: productToFormat.description,
      packaging: productToFormat.packaging,
      packagingPrimary: productToFormat.packagingPrimary,
      packagingSecondary: productToFormat.packagingSecondary,
      mold: productToFormat.mold,
    },
    kosherDetails: {
      id: productToFormat.id,
      agency: productToFormat.agency,
      certifiedCompany: productToFormat.certifiedCompany,
      nameOnCertificate: productToFormat.nameOnCertificate,
      kidOrUkd: productToFormat.kidOrUkd,
      certificatePageNumber: productToFormat.certificatePageNumber,
      certificateValidity: certificateValidity,
    },
  };

  return product;
};

export const unformatProductForm = (
  productToUnformat: Product
): ProductFormToPopulate => {
  console.log("[unformatProductForm]", productToUnformat);
  console.log(
    "[unformatProductForm] kosher agency",
    productToUnformat.kosherDetails?.agency
  );
  const productFormResult: ProductFormToPopulate = {
    isDraft: productToUnformat.isDraft,
    isPublished: productToUnformat.isPublished,
    code: productToUnformat.code,
    description: productToUnformat.productionData?.description ?? "",
    productTypeId: productToUnformat.productTypeId ?? "",
    productType: productToUnformat.productType ?? null,
    commonName: productToUnformat.commonName ?? "",
    providerId: productToUnformat.providerId ?? "",
    providerDescription: productToUnformat.providerDescription ?? "",
    notes: productToUnformat.notes ?? "",
    coil: productToUnformat.coil ?? "",
    client: productToUnformat.client ?? "",
    isActive: productToUnformat.isActive ?? false,
    unitId: productToUnformat.unitId ?? "",
    primaryUnitId: productToUnformat.primaryUnitId ?? "",
    secondaryUnitId: productToUnformat.secondaryUnitId ?? "",
    isKosher: productToUnformat.isKosher ?? false,
    variableQuantityPerUnit: productToUnformat.variableQuantityPerUnit ?? false,
    quantityPerUnit: productToUnformat.quantityPerUnit ?? "",
    quantityPerUnitPrimary: productToUnformat.quantityPerUnitPrimary ?? "",
    quantityPerUnitSecondary: productToUnformat.quantityPerUnitSecondary ?? "",
    mold: productToUnformat.productionData?.mold ?? "",
    packaging: productToUnformat.productionData?.packaging ?? "",
    packagingPrimary: productToUnformat.productionData?.packagingPrimary ?? "",
    packagingSecondary: productToUnformat.productionData?.packagingSecondary ?? "",
    productTypeCategoryId: productToUnformat.productTypeCategoryId ?? "",
    productTypeCategory: productToUnformat.productTypeCategory,
    ppNotes: productToUnformat.ppNotes ?? "",
    presentation: productToUnformat.presentation ?? "",
    // quantityPerUnit: productToUnformat ?? "",
    allergen: productToUnformat.allergen ?? false,
    kosherDetails: {
      ...productToUnformat.kosherDetails,
      certificateValidity: String(
        productToUnformat.kosherDetails?.certificateValidity ?? ""
      ),
    },
    // packaging: ,
    // mold: ,
    // id: ,
    // agency: ,
    // certifiedCompany: ,
    // nameOnCertificate: ,
    // kidOrUkd: ,
    // certificatePageNumber: ,
    // certificateValidity: ,
  };

  return productFormResult;
};
