import { createClient } from '@sanity/client';

import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'fylfxub0',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-10-21',
    token: 'skCEwOuZi8Qcl3UqgUP2NawDumX9PaV5Rud9BoIcr3s6pLxAXxldqoYrLWbZ6ohH51WOyiNjsZooXKYXXBjK3TTjZrsHn4cXUand0fqyUXfvDc64fZNAr3eHm6hdVbHXUtcKUJ9z2B31D0ynSlDGLxr4qPCLjbGsdncwOFsMiMOqzgKOQBIA'
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// RUN THIS to add exception for CORS policy
// $ sanity cors add http://localhost:3000

export default client;