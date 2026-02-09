import { TextField, Checkbox, FormControlLabel, InputLabel, Select, MenuItem } from "@mui/material";
import { forwardRef } from "react";
import type { IFieldSchema } from "../../../../utils/forms";

export const organizationFormSchema: Array<IFieldSchema> = [
    {
        name: 'name',
        label: 'Organization Name',
        component: TextField,
        rules: {
            required: "Organization name is required",
        },
    },
    {
        name: 'plan',
        label: 'Plan',
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="plan-select-label">Plan</InputLabel>
                <Select label="Plan" {...props} ref={ref}>
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
            required: "Plan is required",
        },
        options: [
            { label: 'Basic', value: 'Basic' },
            { label: 'Professional', value: 'Professional' },
            { label: 'Enterprise', value: 'Enterprise' },
        ]
    },
    {
        name: 'isActive',
        label: 'Active',
        component: forwardRef((props: any, ref: any) => (
            <FormControlLabel
                control={<Checkbox {...props} ref={ref} />}
                label="Active"
            />
        )),
        rules: {},
    },
];
