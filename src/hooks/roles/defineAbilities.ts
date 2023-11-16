import { AbilityBuilder, PureAbility } from "@casl/ability";
import { roles as rolesConfig } from "../../components/Forms/Profiles/roles";

export type AppAbility = PureAbility<[string, string]>;

export function defineAbilitiesFor(roles: string[]): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

  if (roles.includes("*")) {
    for (const entityKey in rolesConfig) {
      const entity = rolesConfig[entityKey as keyof typeof rolesConfig];

      for (const roleKey in entity.roles) {
        const role = entity.roles[roleKey];

        can(role.action, entity.entity);
      }
    }
  }

  // Loop through all the entities in rolesConfig
  for (const entityKey in rolesConfig) {
    const entity = rolesConfig[entityKey as keyof typeof rolesConfig];

    // Loop through all the roles for the entity
    for (const roleKey in entity.roles) {
      const role = entity.roles[roleKey];

      // Check if the user has the current role
      if (roles.includes(role.role)) {
        can(role.action, entity.entity);
      }
    }
  }

  // product:comprasForm
  if (roles.includes("product:comprasForm")) {
    can(
      rolesConfig.Product.roles.comprasForm.action,
      rolesConfig.Product.entity
    );
  }

  if (roles.includes("product:produccionForm")) {
    can(
      rolesConfig.Product.roles.produccionForm.action,
      rolesConfig.Product.entity
    );
  }

  // Add more roles and their corresponding abilities here
  return build();
}
