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

