interface Role {
  role: string;
  action: string;
  description: string;
}

interface AppRole {
  label: string;
  entity: string;
  roles: {
    [key: string]: Role;
  };
}

type RolesObject = {
  [key: string]: AppRole;
};

export const roles: RolesObject = {
  Product: {
    entity: "product",
    label: "Productos",
    roles: {
      read: {
        role: "product:read",
        action: "read",
        description: "Read product",
      },
      update: {
        role: "product:update",
        action: "update",
        description: "Update product",
      },
      create: {
        role: "product:create",
        action: "create",
        description: "Create product",
      },
      delete: {
        role: "product:delete",
        action: "delete",
        description: "Delete product",
      },
      comprasForm: {
        role: "product:comprasForm",
        action: "comprasForm",
        description: "Access to compras form",
      },
      produccionForm: {
        role: "product:produccionForm",
        action: "produccionForm",
        description: "Access to production form",
      },
    },
  },
  Profile: {
    entity: "Profile",
    label: "Perfiles",
    roles: {
      read: {
        role: "profile:read",
        action: "read",
        description: "Read profile",
      },
      update: {
        role: "profile:update",
        action: "update",
        description: "Update profile",
      },
      create: {
        role: "profile:create",
        action: "create",
        description: "Create profile",
      },
      delete: {
        role: "profile:delete",
        action: "delete",
        description: "Delete profile",
      },
    },
  },
  User: {
    entity: "User",
    label: "Usuarios",
    roles: {
      read: {
        role: "user:read",
        action: "read",
        description: "Read user",
      },
      update: {
        role: "user:update",
        action: "update",
        description: "Update user",
      },
      create: {
        role: "user:create",
        action: "create",
        description: "Create user",
      },
      delete: {
        role: "user:delete",
        action: "delete",
        description: "Delete user",
      },
    },
  },
};
