import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { forwardRef } from "react";
import type { IFieldSchema } from "../../../../utils/forms";

export const invitationFormSchema: Array<IFieldSchema> = [
    {
        name: 'email',
        label: 'Email Address',
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
        component: forwardRef(({ options, ...props }: { options: Array<{ label: string; value: string }> }, ref) => (
            <>
                <InputLabel id="invitation-role-label">Role</InputLabel>
                <Select label="Role" {...props} ref={ref}>
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
        options: [
            { label: 'Admin', value: 'Admin' },
            { label: 'User', value: 'User' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Viewer', value: 'Viewer' },
        ],
        rules: {
            required: "Role is required"
        }
    },
    {
        name: 'expiresAt',
        label: 'Expiration Date',
        component: TextField,
        type: 'date',
        rules: {
            required: "Expiration date is required"
        }
    },
];
