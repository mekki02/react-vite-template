import type { FieldErrors, FieldValues } from "react-hook-form";
import { userFormSchema } from "./user-schema";
import { warehouseFormSchema } from "./warehouse-schema";
import { companyFormSchema } from "./company-schema";

export const getSchema = (
    schema: 'user' | 'warehouse' | 'company',
    formControl: any,
    errors?: FieldErrors<FieldValues>
) => {
    switch (schema) {
        case 'user':
            return userFormSchema.map(field => ({
                ...field,
                control: formControl,
                error: errors && Boolean(errors[field.name]),
                helperText: errors && errors[field.name]?.message
            }));
        case 'warehouse':
            return warehouseFormSchema.map(field => ({
                ...field,
                control: formControl,
                error: errors && Boolean(errors[field.name]),
                helperText: errors && errors[field.name]?.message
            }));
        case 'company':
            return companyFormSchema.map(field => ({
                ...field,
                control: formControl,
                error: errors && Boolean(errors[field.name]),
                helperText: errors && errors[field.name]?.message
            }));

        // case 'user-profile':
        //     return userProfileFormSchema.map(field => ({
        //         ...field,
        //         control: formControl,
        //         error: errors && Boolean(errors[field.name]),
        //         helperText: errors && errors[field.name]?.message
        //     }));
        // case 'company':
        //     return companyFormSchema.map(field => ({
        //         ...field,
        //         control: formControl,
        //         error: errors && Boolean(errors[field.name]),
        //         helperText: errors && errors[field.name]?.message
        //     }));
        // case 'invitation':
        //     return invitationFormSchema.map(field => ({
        //         ...field,
        //         control: formControl,
        //         error: errors && Boolean(errors[field.name]),
        //         helperText: errors && errors[field.name]?.message
        //     }));
        // case 'complete-signup':
        //     return completeSignupSchema.map(field => ({
        //         ...field,
        //         control: formControl,
        //         error: errors && Boolean(errors[field.name]),
        //         helperText: errors && errors[field.name]?.message
        //     }));
        default:
            return [];
    }
}