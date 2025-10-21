import React from 'react';
import { IconType } from 'react-icons';
import { BiHide, BiShow } from 'react-icons/bi';

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: IconType;
  showToggle?: boolean;
  toggleVisibility?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  showToggle,
  toggleVisibility,
}) => {
  return (
    <div className="relative flex items-center rounded-lg border bg-white p-2 shadow-sm">
      <Icon className="mr-2 text-gray-600" />
      <input
        className="flex-1 bg-transparent outline-none"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showToggle && toggleVisibility && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="text-gray-600"
          aria-label={type === 'password' ? 'Show password' : 'Hide password'}
        >
          {type === 'password' ? <BiShow size={20} /> : <BiHide size={20} />}
        </button>
      )}
    </div>
  );
};
export default InputField;
