import { TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';

export default function Input(props) {
    const { control, name, label, defaultValue, onKeyUp, size, rules, error, ...other } = props;
    return (
        <Controller
            key={`${name}-controller`}
            name={name}
            control={control}
            defaultValue={defaultValue || ""}
            rules={rules || ""}
            as={(
                <TextField
                    variant="outlined"
                    label={label}
                    size={size || 'small'}
                    error={error || false}
                    onKeyUp={onKeyUp}
                    {...other}
                />
            )}
        // render={({ onChange, onBlur, value, name }) => (
        //     <TextField
        //         key={`${name}-textfield`}
        //         name={name}
        //         variant="outlined"
        //         label={label}
        //         size={size || 'small'}
        //         error={error || false}
        //         onBlur={onBlur}
        //         onChange={value => onChange(value)}
        //         value={value}
        //         {...other}
        //     />
        // )}
        />
        // <Controller
        //     key={`${name}-controller`}
        //     as={TextField}
        //     variant="outlined"
        //     name={name}
        //     control={control}
        //     label={label}
        //     defaultValue={defaultValue || ""}
        //     size={size}
        //     rules={rules}
        //     error={error}
        //     {...other}
        // />
    )
}
