import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { forwardRef } from "react";
import type { IFieldSchema } from "../../../../utils/forms";

export const userFormSchema: Array<IFieldSchema> = [
    {
        name: 'firstName',
        label: 'First Name',
        component: TextField,
        rules: {
            required: "First Name is required",
        },
    },
    {
        name: 'lastName',
        label: 'Last Name',
        component: TextField,
        rules: {
            required: "Last Name is required",
        }
    },
    {
        name: 'email',
        label: 'Email',
        component: TextField,
        rules: {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address"
            }
        }
    },
    {
        name: 'role',
        label: 'Role',
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string; disabled?: boolean }> }, ref) => (
            <>
                <InputLabel id="demo-simple-select-label" > Role </InputLabel>
                <Select label="Role" {...props} ref={ref} >
                    {
                        options.map(option => (
                            <MenuItem key={option.value} value={option.value} disabled={option.disabled} >
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </Select>
            </>
        )),
        rules: {
            required: "Role is required",
        },
        options: [
            { label: 'Root', value: 'root', disabled: true },
            { label: 'User', value: 'user' },
            { label: 'Admin', value: 'admin' },
        ]
    },
    {
        name: "avatarUrl",
        label: "Avatar URL",
        component: TextField,
        rules: {
            pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
                message: "Invalid URL"
            }
        }
    },
    {
        name: "phoneNumber",
        label: "Phone Number",
        component: TextField,
        rules: {
            required: "Phone number is required",
        }
    },
    {
        name: "dateOfBirth",
        label: "Date of birth",
        component: TextField,
        rules: {
            required: "Phone number is required",
        }
    },
    {
        name: "gender",
        label: "Gender",
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="demo-simple-select-label" > Locale </InputLabel>
                <Select label="Role" {...props} ref={ref} >
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
        rules: {
            required: "Locale is required",
        },
        options: [
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
        ]
    },
    {
        name: "locale",
        label: "Locale",
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="demo-simple-select-label" > Locale </InputLabel>
                <Select label="Role" {...props} ref={ref} >
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
        rules: {
            required: "Locale is required",
        },
        options: [
            { label: 'French', value: 'fr' },
            { label: 'English', value: 'en' },
        ]
    },
];