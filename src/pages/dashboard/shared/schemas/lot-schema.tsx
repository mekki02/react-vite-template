import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { forwardRef } from 'react';
import type { IFieldSchema } from '@utils/forms';
import dayjs from 'dayjs';

export const lotFormSchema: Array<IFieldSchema> = [
    {
        name: 'productId',
        label: 'Product',
        component: TextField,
        props: {
            fullWidth: true,
        },
        rules: { required: 'Product is required' },
    },
    {
        name: 'lotNumber',
        label: 'Lot Number',
        component: TextField,
        props: {
            fullWidth: true,
        },
        rules: { required: 'Lot number is required' },
    },
    {
        name: 'manufactureDate',
        label: 'Manufacture Date',
        component: forwardRef(({ value, onChange, ...props }: any, ref) => (
            <DatePicker
                {...props}
                ref={ref}
                value={dayjs(value)}
                onChange={onChange}
                label="Manufacture Date"
                slotProps={{
                    textField: {
                        fullWidth: true,
                    },
                }}
            />
        )),
        rules: {},
    },
    {
        name: 'expirationDate',
        label: 'Expiration Date',
        component: forwardRef(({ value, onChange, ...props }: any, ref) => (
            <DatePicker
                {...props}
                ref={ref}
                value={dayjs(value)}
                onChange={onChange}
                label="Expiration Date"
            />
        )),
        rules: {},
    },
    {
        name: 'status',
        label: 'Status',
        component: forwardRef(({ value, onChange, label, ...props }: any, ref) => (
            <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                    {...props}
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    label="Status"
                >
                    <MenuItem value="released">Released</MenuItem>
                    <MenuItem value="quarantined">Quarantined</MenuItem>
                    <MenuItem value="expired">Expired</MenuItem>
                </Select>
            </FormControl>
        )),
        rules: { required: 'Status is required' },
    },
    {
        name: 'qcState',
        label: 'QC State',
        component: forwardRef(({ value, onChange, label, ...props }: any, ref) => (
            <FormControl fullWidth>
                <InputLabel>QC State</InputLabel>
                <Select
                    {...props}
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    label="QC State"
                >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="passed">Passed</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                </Select>
            </FormControl>
        )),
        rules: { required: 'QC State is required' },
    },
];
