import {
    createDirectus,
    authentication,
    rest,
    createItem as createItemOperation,
    deleteItem as deleteItemOperation,
    readItems,
    readMe,
    updateItem as updateItemOperation
} from '@directus/sdk';


export interface User {
    id: string;
    email: string;
    password?: string;
    first_name?: string | undefined;
    last_name?: string | undefined;
    avatar?: string | object | undefined;
    role?: string;
}

export interface Item {
    id: string;
    title: string;
    description?: string | undefined;
    // Add more fields as needed
}

const directus = createDirectus<{
    directus_users: User[]; items: Item[];
}>('https://directus.pizza')
    .with(authentication())
    .with(rest());



export {
    createItemOperation as createItem, deleteItemOperation as deleteItem, directus,
    readItems, readMe, updateItemOperation as updateItem
};