import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { forwardRef } from "react";
import type { IFieldSchema } from "../../../../utils/forms";
import { timezones } from "../../../../constants/timezones";

export const companyFormSchema: Array<IFieldSchema> = [
    {
        name: 'legalName',
        label: 'Legal Name',
        component: TextField,
        rules: {
            required: "Legal Name is required",
        },
    },
    {
        name: 'brandName',
        label: 'Brand Name',
        component: TextField,
        rules: {
            required: "Brand Name is required",
        }
    },
    {
        name: 'registrationNumber',
        label: 'Registration Number',
        component: TextField,
        rules: {
            required: "Registration Number is required",
        }
    },
    {
        name: 'taxId',
        label: 'Tax ID',
        component: TextField,
        rules: {
            required: "Tax ID is required",
        }
    },
    {
        name: 'vatNumber',
        label: 'VAT Number',
        component: TextField,
        rules: {
            required: "VAT Number is required",
        }
    },
    {
        name: 'currency',
        label: 'Currency',
        component: TextField,
        rules: {
            required: "Currency is required",
        }
    },
    {
        name: 'timezone',
        label: 'Timezone',
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="demo-simple-select-label" > Timezone </InputLabel>
                <Select label="Timezone" {...props} ref={ref} >
                    {
                        options.map(option => (
                            <MenuItem key={option.value} value={option.value} >
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </Select>
            </>
        )),
        options: timezones,
        rules: {
            required: "Timezone is required",
        }
    },
];