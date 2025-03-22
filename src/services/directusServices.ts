import { createDirectus, authentication, rest } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055')
    .with(authentication())
    .with(rest());



export { directus };