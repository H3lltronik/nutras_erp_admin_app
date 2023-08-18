interface Role {
    role: string,
    description: string
}

interface AppRole {
    label: string,
    entity: string,
    roles: Role[]
}

export const roles: AppRole[] = [
    {
        entity: 'user',
        label: 'Usuarios',
        roles: [
            {
                role: 'user:read',
                description: 'Read user'
            },
            {
                role: 'user:update',
                description: 'Update user'
            },
            {
                role: 'user:create',
                description: 'Create user'
            },
            {
                role: 'user:delete',
                description: 'Delete user'
            }
        ]
    },
    {
        entity: 'profile',
        label: 'Perfiles',
        roles: [
            {
                role: 'profile:read',
                description: 'Read profile'
            },
            {
                role: 'profile:update',
                description: 'Update profile'
            },
            {
                role: 'profile:create',
                description: 'Create profile'
            },
            {
                role: 'profile:delete',
                description: 'Delete profile'
            }
        ]
    }
]