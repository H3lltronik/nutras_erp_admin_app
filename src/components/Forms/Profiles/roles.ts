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

function defineRoles<T extends RolesObject>(obj: T): T {
  return obj;
}

export const roles = defineRoles({
  Product: {
    entity: "product",
    label: "Productos",
    roles: {
      read: {
        role: "product:read",
        action: "read",
        description: "Leer producto",
      },
      update: {
        role: "product:update",
        action: "update",
        description: "Actualizar producto",
      },
      create: {
        role: "product:create",
        action: "create",
        description: "Crear producto",
      },
      delete: {
        role: "product:delete",
        action: "delete",
        description: "Eliminar producto",
      },
      comprasForm: {
        role: "product:comprasForm",
        action: "comprasForm",
        description: "Acceso al formulario de compras",
      },
      produccionForm: {
        role: "product:produccionForm",
        action: "produccionForm",
        description: "Acceso al formulario de producción",
      },
    },
  },
  Profile: {
    entity: "profile",
    label: "Perfiles",
    roles: {
      read: {
        role: "profile:read",
        action: "read",
        description: "Leer perfil",
      },
      update: {
        role: "profile:update",
        action: "update",
        description: "Actualizar perfil",
      },
      create: {
        role: "profile:create",
        action: "create",
        description: "Crear perfil",
      },
      delete: {
        role: "profile:delete",
        action: "delete",
        description: "Eliminar perfil",
      },
    },
  },
  User: {
    entity: "user",
    label: "Usuarios",
    roles: {
      read: {
        role: "user:read",
        action: "read",
        description: "Leer usuario",
      },
      update: {
        role: "user:update",
        action: "update",
        description: "Actualizar usuario",
      },
      create: {
        role: "user:create",
        action: "create",
        description: "Crear usuario",
      },
      delete: {
        role: "user:delete",
        action: "delete",
        description: "Eliminar usuario",
      },
    },
  },
  Provider: {
    entity: "provider",
    label: "Proveedores",
    roles: {
      read: {
        role: "provider:read",
        action: "read",
        description: "Leer proveedor",
      },
      update: {
        role: "provider:update",
        action: "update",
        description: "Actualizar proveedor",
      },
      create: {
        role: "provider:create",
        action: "create",
        description: "Crear proveedor",
      },
      delete: {
        role: "provider:delete",
        action: "delete",
        description: "Eliminar proveedor",
      },
    },
  },
  Inventory: {
    entity: "inventory",
    label: "Inventario",
    roles: {
      read: {
        role: "inventory:read",
        action: "read",
        description: "Leer inventario",
      },
      update: {
        role: "inventory:update",
        action: "update",
        description: "Actualizar inventario",
      },
      create: {
        role: "inventory:create",
        action: "create",
        description: "Crear inventario",
      },
      delete: {
        role: "inventory:delete",
        action: "delete",
        description: "Eliminar inventario",
      },
    },
  },
  Notification: {
    entity: "notification",
    label: "Notificaciones",
    roles: {
      read: {
        role: "notification:read",
        action: "read",
        description: "Leer notificación",
      },
      update: {
        role: "notification:update",
        action: "update",
        description: "Actualizar notificación",
      },
      create: {
        role: "notification:create",
        action: "create",
        description: "Crear notificación",
      },
      delete: {
        role: "notification:delete",
        action: "delete",
        description: "Eliminar notificación",
      },
    },
  },
  PurchaseOrders: {
    entity: "purchaseOrder",
    label: "Ordenes de compra",
    roles: {
      read: {
        role: "purchaseOrder:read",
        action: "read",
        description: "Leer orden de compra",
      },
      update: {
        role: "purchaseOrder:update",
        action: "update",
        description: "Actualizar orden de compra",
      },
      create: {
        role: "purchaseOrder:create",
        action: "create",
        description: "Crear orden de compra",
      },
      delete: {
        role: "purchaseOrder:delete",
        action: "delete",
        description: "Eliminar orden de compra",
      },
    },
  },
  WorkRequests: {
    entity: "workRequest",
    label: "Solicitud de trabajo",
    roles: {
      read: {
        role: "workRequest:read",
        action: "read",
        description: "Leer solicitud de trabajo",
      },
      update: {
        role: "workRequest:update",
        action: "update",
        description: "Actualizar solicitud de trabajo",
      },
      create: {
        role: "workRequest:create",
        action: "create",
        description: "Crear solicitud de trabajo",
      },
      delete: {
        role: "workRequest:delete",
        action: "delete",
        description: "Eliminar solicitud de trabajo",
      },
    },
  },
  WorkOrders: {
    entity: "workOrders",
    label: "Ordenes de compra",
    roles: {
      read: {
        role: "workOrders:read",
        action: "read",
        description: "Leer workOrders",
      },
      update: {
        role: "workOrders:update",
        action: "update",
        description: "Actualizar workOrders",
      },
      create: {
        role: "workOrders:create",
        action: "create",
        description: "Crear workOrders",
      },
      delete: {
        role: "workOrders:delete",
        action: "delete",
        description: "Eliminar workOrders",
      },
    },
  },
  PurchaseRequisition: {
    entity: "purchaseRequisition",
    label: "Requisicion de compra",
    roles: {
      read: {
        role: "purchaseRequisition:read",
        action: "read",
        description: "Leer purchaseRequisition",
      },
      update: {
        role: "purchaseRequisition:update",
        action: "update",
        description: "Actualizar purchaseRequisition",
      },
      create: {
        role: "purchaseRequisition:create",
        action: "create",
        description: "Crear purchaseRequisition",
      },
      delete: {
        role: "purchaseRequisition:delete",
        action: "delete",
        description: "Eliminar purchaseRequisition",
      },
    },
  },
  Tagging: {
    entity: "tagging",
    label: "Etiquetacion",
    roles: {
      read: {
        role: "tagging:read",
        action: "read",
        description: "Leer tagging",
      },
      update: {
        role: "tagging:update",
        action: "update",
        description: "Actualizar tagging",
      },
      create: {
        role: "tagging:create",
        action: "create",
        description: "Crear tagging",
      },
      delete: {
        role: "tagging:delete",
        action: "delete",
        description: "Eliminar tagging",
      },
    },
  },
  Quality: {
    entity: "provider",
    label: "Proveedores",
    roles: {
      read: {
        role: "provider:read",
        action: "read",
        description: "Leer provider",
      },
      update: {
        role: "provider:update",
        action: "update",
        description: "Actualizar provider",
      },
      create: {
        role: "provider:create",
        action: "create",
        description: "Crear provider",
      },
      delete: {
        role: "provider:delete",
        action: "delete",
        description: "Eliminar provider",
      },
    },
  },
  Administration: {
    entity: "administration",
    label: "Administración",
    roles: {
      superAdmin: {
        role: "*",
        action: "superAdmin",
        description: "Super usuario",
      },
    },
  },
});
