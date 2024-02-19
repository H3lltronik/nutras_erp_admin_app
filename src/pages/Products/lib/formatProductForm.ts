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
  unitId: string;
  presentation: string;
  quantityPerUnit: string;
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
  mold: string;
  ptPresentation: string;

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
  mold?: string;
  ptPresentation?: string;
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
    unitId: productToFormat.unitId,
    isKosher: productToFormat.isKosher,
    allergen: productToFormat.allergen,
    presentation: productToFormat.presentation,
    quantityPerUnit: productToFormat.quantityPerUnit,
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
      mold: productToFormat.mold,
      ptPresentation: productToFormat.ptPresentation,
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
    unitId: productToUnformat.unitId ?? "",
    isKosher: productToUnformat.isKosher ?? false,
    quantityPerUnit: productToUnformat.quantityPerUnit ?? "",
    mold: productToUnformat.productionData?.mold ?? "",
    packaging: productToUnformat.productionData?.packaging ?? "",
    productTypeCategoryId: productToUnformat.productTypeCategoryId ?? "",
    productTypeCategory: productToUnformat.productTypeCategory,
    ppNotes: productToUnformat.ppNotes ?? "",
    presentation:
      productToUnformat.productionData?.ptPresentation ??
      productToUnformat.presentation ??
      "",
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
    // ptPresentation: ,
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
