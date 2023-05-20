import { createContext } from 'react';

interface userContext {
    userName:string
}

export const UserContext = createContext<userContext>({ userName: "" });
