import React from 'react';
import './Dropdown.css';
type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  return (
    <select
      className="dropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options?.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
