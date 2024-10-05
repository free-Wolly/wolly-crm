import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req: { user } }) => {
      // Admins can read all users, regular users can only read themselves
      if (user?.role === 'admin') return true;
      return {
        id: {
          equals: user?.id
        }
      };
    },
    create: ({ req: { user } }) => {
      // Only admins can create new users
      return user?.role === 'admin';
    },
    update: ({ req: { user } }) => {
      // Admins can update any user, regular users can only update themselves
      if (user?.role === 'admin') return true;
      return {
        id: {
          equals: user?.id
        }
      };
    },
    delete: ({ req: { user } }) => {
      // Only admins can delete users
      return user?.role === 'admin';
    },
  },
  fields: [
    // Email and password are included by default
    // Add custom fields as needed
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
    },
  ],
}

export default Users
