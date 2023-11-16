interface Provider {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  partidaId: number;
  name: string | null;
  businessName: string | null;
  service: string | null;
  phone: string | null;
  email: string | null;
  paymentEmail: string | null;
  bank: string | null;
  clabeAccount: string | null;
  accountNumber: string | null;
}

type CreateProviderRequest = Omit<Provider, "id">;
type UpdateProviderRequest = Provider;

type GetProviderResponse = Provider;

type GetProvidersResponse = {
  data: Provider[];
  pagination: Pagination;
};

type UpdatedProviderResponse = Provider;

type DeleteProviderResponse = Provider;

type ProviderCreatedResponse = Provider;

// parsed

type ProviderWithStatus = Provider & { status: string };
type ProvidersWithStatus = ProviderWithStatus[];
type GetProvidersResponseWithStatus = {
  data: ProvidersWithStatus;
  pagination: Pagination;
};
