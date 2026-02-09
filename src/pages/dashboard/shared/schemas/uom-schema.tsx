import { TextField, Select, MenuItem, Checkbox, FormControlLabel, InputLabel } from "@mui/material";
import { forwardRef } from "react";
import type { IFieldSchema } from "../../../../utils/forms";

export const uomFormSchema: Array<IFieldSchema> = [
    {
        name: 'name',
        label: 'Unit Name',
        component: TextField,
        rules: {
            required: "Unit name is required",
            minLength: {
                value: 2,
                message: 'Unit name must be at least 2 characters'
            }
        },
    },
    {
        name: 'category',
        label: 'Category',
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select label="Category" {...props} ref={ref}>
                    {
                        options.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </Select>
            </>
        )),
        rules: {
            required: "Category is required",
        },
        options: [
            { label: 'Unit', value: 'unit' },
            { label: 'Volume', value: 'volume' },
            { label: 'Weight', value: 'weight' },
        ]
    },
    {
        name: 'isBase',
        label: 'Base Unit',
        component: forwardRef((props: any, ref: any) => (
            <FormControlLabel
                control={<Checkbox checked={props.value} {...props} ref={ref} />}
                label="Base Unit"
            />
        )),
        rules: {},
    },
    {
        name: 'ratioToBase',
        label: 'Ratio to Base Unit',
        component: TextField,
        type: 'number',
        rules: {
            required: "Ratio to base unit is required",
            min: {
                value: 0.001,
                message: 'Ratio must be greater than 0'
            }
        },
    }
];
