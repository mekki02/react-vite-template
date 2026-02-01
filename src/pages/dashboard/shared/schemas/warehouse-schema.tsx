import { FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { forwardRef } from "react";
import type { IFieldSchema } from "../../../../utils/forms";
import { countries } from "../../../../constants/countries";

export const warehouseFormSchema: Array<IFieldSchema> = [
    {
        name: 'name',
        label: 'Name',
        component: TextField,
        rules: {
            required: "Name is required",
        },
    },
    {
        name: 'code',
        label: 'Code',
        component: TextField,
        rules: {
            required: "Code is required",
        }
    },
    {
        name: 'isActive',
        label: 'Active',
        component: forwardRef(({ value, onChange, labelPlacement, label, ...props }: any, ref) => (
            <FormControlLabel control={<Switch
                {...props}
                ref={ref}
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
            />} label={label} labelPlacement={labelPlacement}/>
        )),
    },
    {
        name: 'companyId',
        label: 'Company ID',
        component: TextField,
        rules: {
            required: "Company ID is required",
        }
    },
    {
        name: 'address.country',
        label: 'Country',
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="demo-simple-select-label" > Country </InputLabel>
                <Select label="Country" {...props} ref={ref} >
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
        options: countries.map(country => ({ label: country.label, value: country.code })),
        rules: {
            required: "Country is required",
        }
    },
    {
        name: 'address.city',
        label: 'City',
        component: TextField,
        rules: {
            required: "City is required",
        }
    },
    {
        name: 'address.postalCode',
        label: 'Postal Code',
        component: TextField,
        type: 'text',
        rules: {
            required: "Postal Code is required",
        }
    },
    {
        name: 'address.street',
        label: 'Street',
        component: TextField,
        rules: {
            required: "Street is required",
        }
    },
    {
        name: 'address.buildingNumber',
        label: 'Building Number',
        component: TextField,
        type: 'number',
        rules: {
            required: "Building Number is required",
        }
    }
];