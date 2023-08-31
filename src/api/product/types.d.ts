interface Product {
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    id: string;
    isDraft: boolean;
    partidaId: number;
    code: string;
    type: string;
    description: string;
    name: string;

    commonName: string;
    vendorDescription?: string;   // using '?' to denote optional fields
    provider?: string;
    codeAlt?: string;
    presentation?: string;
    quantity?: number;
    unitId?: string;   // this was already there, but I'm keeping it here for clarity
    unit?: Measurement;
    allergen?: string;
    status?: string;
    kosherAgency?: string;
    companyIngredientName?: string;
    certificateName?: string;
    vendor?: string;
    note?: string;
}


type CreateProductRequest = Omit<Product, 'id'>;
type UpdateProductRequest = Product

type GetProductResponse = Product;

type GetProductsResponse = {
    data: Product[];
    pagination: Pagination;
};

type UpdatedProductResponse = Product;

type DeleteProductResponse = Product;

type ProductCreatedResponse = Product

