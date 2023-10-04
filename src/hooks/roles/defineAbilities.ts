import { AbilityBuilder, PureAbility } from "@casl/ability";
import { roles as rolesConfig } from "../../components/Forms/Profiles/roles";

export type AppAbility = PureAbility<[string, string]>;

export function defineAbilitiesFor(roles: string[]): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

  if (roles.includes("post:read")) {
    can("read", "Profile");
  }

  // product:comprasForm
  if (roles.includes("product:comprasForm")) {
    can(
      rolesConfig.Product.roles.comprasForm.action,
      rolesConfig.Product.entity
    );
  }

  // Add more roles and their corresponding abilities here
  return build();
}
