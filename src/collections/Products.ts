import { CollectionConfig } from 'payload/types'

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => {
      // Both admin and user roles can read products
      return Boolean(user);
    },
    create: ({ req: { user } }) => {
      // Only admin can create products
      return user?.role === 'admin';
    },
    update: ({ req: { user } }) => {
      // Only admin can update products
      return user?.role === 'admin';
    },
    delete: ({ req: { user } }) => {
      // Only admin can delete products
      return user?.role === 'admin';
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
      min: 0,
    },
  ],
}

export default Products