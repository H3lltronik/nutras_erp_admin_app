export type ProductFormResult = {
  isDraft: boolean;
  isPublished: boolean;
  profileId: string;
  code: string;
  productTypeId: string;
  commonName: string;
  providerId: string;
  unitId: string;
  isKosher: boolean;
  allergen: string;
  productDescription: string;
  packaging: string;
  mold: string;
  presentation: string;
  quantityPerUnit: string;
  PTPresentation: string;
  kosherDetails: {
    agency: string;
    certifiedCompany: string;
    nameOnCertificate: string;
    kidOrUkd: string;
    certificatePageNumber: string;
    certificateValidity: string;
  };
};

export interface ProductToPost {
  isDraft: boolean;
  isPublished: boolean;
  profileId: string;
  code: string;
  productTypeId: string;
  commonName: string;
  providerId: string;
  unitId: string;
  isKosher: boolean;
  presentation: string;
  purchaseData: PurchaseDataToPost;
  productionData: ProductionDataToPost;
  kosherDetails: KosherDetailsToPost;
  quantityPerUnit: string;
}

export interface PurchaseDataToPost {
  allergen: string;
}

export interface ProductionDataToPost {
  productDescription: string;
  packaging: string;
  mold: string;
  PTPresentation: string;
}

export interface KosherDetailsToPost {
  agency: string;
  certifiedCompany: string;
  nameOnCertificate: string;
  kidOrUkd: string;
  certificatePageNumber: string;
  certificateValidity: string;
}

export const formatProductForm = (productToFormat: ProductFormResult) => {
  const product: ProductToPost = {
    isDraft: productToFormat.isDraft,
    isPublished: productToFormat.isPublished,
    profileId: productToFormat.profileId,
    code: productToFormat.code,
    productTypeId: productToFormat.productTypeId,
    commonName: productToFormat.commonName,
    providerId: productToFormat.providerId,
    unitId: productToFormat.unitId,
    isKosher: productToFormat.isKosher,
    presentation: productToFormat.presentation,
    quantityPerUnit: productToFormat.quantityPerUnit,
    purchaseData: {
      allergen: productToFormat.allergen,
    },
    productionData: {
      productDescription: productToFormat.productDescription,
      packaging: productToFormat.packaging,
      mold: productToFormat.mold,
      PTPresentation: productToFormat.PTPresentation,
    },
    kosherDetails: productToFormat.kosherDetails,
  };

  return product;
};

export const unformatProductForm = (
  productToUnformat: ProductToPost
): ProductFormResult => {
  const productFormResult: ProductFormResult = {
    isDraft: productToUnformat.isDraft,
    isPublished: productToUnformat.isPublished,
    profileId: productToUnformat.profileId,
    code: productToUnformat.code,
    productTypeId: productToUnformat.productTypeId,
    commonName: productToUnformat.commonName,
    providerId: productToUnformat.providerId,
    unitId: productToUnformat.unitId,
    isKosher: productToUnformat.isKosher,
    presentation: productToUnformat.presentation,
    quantityPerUnit: productToUnformat.quantityPerUnit,
    allergen: productToUnformat.purchaseData.allergen,
    productDescription: productToUnformat.productionData.productDescription,
    packaging: productToUnformat.productionData.packaging,
    mold: productToUnformat.productionData.mold,
    PTPresentation: productToUnformat.productionData.PTPresentation,
    kosherDetails: productToUnformat.kosherDetails,
  };

  return productFormResult;
};
