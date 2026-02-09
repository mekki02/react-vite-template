import type { FC } from "react";

export const withPrivilege = (privilege: string[], component: FC) => {
    if (!privilege.includes('admin')) {
        return null;
    }
    return component;
}   