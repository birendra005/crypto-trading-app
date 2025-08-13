import React from 'react';
import './Textfield.css';

type TextFieldProps = {
  label: string;
  name?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, name, ...rest }, ref) => {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor={name} className="label">
          {label}
        </label>
        <input id={name} name={name} ref={ref} {...rest} className="input" />
      </div>
    );
  }
);

export default TextField;
