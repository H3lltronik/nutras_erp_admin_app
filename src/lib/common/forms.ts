export const defaultRequiredRules = (isDraft: boolean) => [
  {
    required: true && !isDraft,
    message: "Este campo es obligatorio",
  },
];
