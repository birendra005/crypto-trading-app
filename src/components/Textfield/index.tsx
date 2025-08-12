
import React from 'react';

type TextFieldProps = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, name, ...rest }, ref) => {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor={name} style={{ display: 'block', marginBottom: '0.5rem' }}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          ref={ref}
          {...rest}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
    );
  }
);

export default TextField;
