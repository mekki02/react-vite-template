import { InputLabel, MenuItem, Select, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { forwardRef } from "react";
import type { IFieldSchema } from "../../../../utils/forms";

export const productFormSchema: Array<IFieldSchema> = [
    {
        name: 'sku',
        label: 'SKU',
        component: TextField,
        rules: {
            required: "SKU is required",
        },
    },
    {
        name: 'name',
        label: 'Product Name',
        component: TextField,
        rules: {
            required: "Product name is required",
        },
    },
    {
        name: 'description',
        label: 'Description',
        component: TextField,
        rules: {},
    },
    {
        name: 'barcodeMain',
        label: 'Barcode',
        component: TextField,
        rules: {},
    },
    {
        name: 'tracking',
        label: 'Tracking',
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="tracking-select-label">Tracking</InputLabel>
                <Select label="Tracking" {...props} ref={ref}>
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
            required: "Tracking is required",
        },
        options: [
            { label: 'None', value: 'none' },
            { label: 'Lot', value: 'lot' },
            { label: 'Serial', value: 'serial' },
        ]
    },
    {
        name: 'baseUomId',
        label: 'Base UOM',
        component: TextField,
        rules: {
            required: "Base UOM is required",
        },
    },
    {
        name: 'packUomId',
        label: 'Pack UOM',
        component: TextField,
        rules: {},
    },
    {
        name: 'weight',
        label: 'Weight',
        component: TextField,
        rules: {
            pattern: {
                value: /^\d*\.?\d+$/,
                message: "Weight must be a valid number"
            }
        },
    },
    {
        name: 'volume',
        label: 'Volume',
        component: TextField,
        rules: {
            pattern: {
                value: /^\d*\.?\d+$/,
                message: "Volume must be a valid number"
            }
        },
    },
    {
        name: 'abcClass',
        label: 'ABC Class',
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="abc-class-select-label">ABC Class</InputLabel>
                <Select label="ABC Class" {...props} ref={ref}>
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
        rules: {},
        options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
        ]
    },
    {
        name: 'perishable',
        label: 'Perishable',
        component: forwardRef((props: any, ref: any) => (
            <FormControlLabel
                control={<Checkbox {...props} ref={ref} />}
                label="Perishable"
            />
        )),
        rules: {},
    },
    {
        name: 'hazardous',
        label: 'Hazardous',
        component: forwardRef((props: any, ref: any) => (
            <FormControlLabel
                control={<Checkbox {...props} ref={ref} />}
                label="Hazardous"
            />
        )),
        rules: {},
    },
    {
        name: 'leadTimeDays',
        label: 'Lead Time (Days)',
        component: TextField,
        rules: {
            pattern: {
                value: /^\d+$/,
                message: "Lead time must be a whole number"
            }
        },
    },
    {
        name: 'defaultCostMethod',
        label: 'Default Cost Method',
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="cost-method-select-label">Default Cost Method</InputLabel>
                <Select label="Default Cost Method" {...props} ref={ref}>
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
            required: "Default cost method is required",
        },
        options: [
            { label: 'FIFO', value: 'fifo' },
            { label: 'LIFO', value: 'lifo' },
            { label: 'Average', value: 'avg' },
            { label: 'Standard', value: 'standard' },
        ]
    },
    {
        name: 'standardCost',
        label: 'Standard Cost',
        component: TextField,
        rules: {
            required: "Standard cost is required",
            pattern: {
                value: /^\d*\.?\d+$/,
                message: "Standard cost must be a valid number"
            }
        },
    },
    {
        name: 'active',
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
