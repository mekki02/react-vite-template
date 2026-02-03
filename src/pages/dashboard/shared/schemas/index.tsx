import type { FieldErrors, FieldValues } from "react-hook-form";
import { userFormSchema } from "./user-schema";
import { warehouseFormSchema } from "./warehouse-schema";
import { companyFormSchema } from "./company-schema";
import { productFormSchema } from "./product-schema";
import { lotFormSchema } from "./lot-schema";
import { invitationFormSchema } from "./invitation-schema";
import { uomFormSchema } from "./uom-schema";

export const getSchema = (
    schema: 'user' | 'warehouse' | 'company' | 'product' | 'lot' | 'invitation' | 'uom',
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
        case 'product':
            return productFormSchema.map(field => ({
                ...field,
                control: formControl,
                error: errors && Boolean(errors[field.name]),
                helperText: errors && errors[field.name]?.message
            }));
        case 'lot':
            return lotFormSchema.map(field => ({
                ...field,
                control: formControl,
                error: errors && Boolean(errors[field.name]),
                helperText: errors && errors[field.name]?.message
            }));
        case 'invitation':
            return invitationFormSchema.map(field => ({
                ...field,
                control: formControl,
                error: errors && Boolean(errors[field.name]),
                helperText: errors && errors[field.name]?.message
            }));
        case 'uom':
            return uomFormSchema.map(field => ({
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