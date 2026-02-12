import { FormControl, FormHelperText } from '@mui/material';
import type { JSX } from 'react';
import { Controller, type ControllerProps, type RegisterOptions } from 'react-hook-form';

export interface IFieldSchema extends Omit<ControllerProps, 'render' | 'name'> {
    name: string;
    component: any;
    rules?: RegisterOptions;
    defaultValue?: string | number | boolean | any;
    [key: string]: any;
}

export interface IForm {
    fields: Array<IFieldSchema>;
}

export const generateField = ({ component: Component, rules, defaultValue = '', name, control, error, helperText, ...rest }: IFieldSchema & { error?: boolean; helperText?: string }): JSX.Element => {

    return (
        <FormControl fullWidth margin="dense" key={`form_field_${name}`} sx={{ minWidth: 200 }}>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) => (
                    <>
                        <Component
                            {...field}
                            {...rest}
                            error={error}
                        />
                        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
                    </>
                )}
            />
        </FormControl>
    )
}
