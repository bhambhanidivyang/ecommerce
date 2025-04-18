import { DocumentData } from 'firebase/firestore';

export type AppUser = {
    displayName: string | null,
    email: string | null,
    createdDate?: string | null,
} | DocumentData