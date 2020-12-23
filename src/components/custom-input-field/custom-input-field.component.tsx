import React from "react";
import "./custom-input-field.styles.scss";
import { Input } from "antd";

interface InputProps {
  className?: string;
  type: string;
  prefix?: JSX.Element;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[] | undefined;
}
const CustomInputField: React.FC<InputProps> = (props: InputProps) => {
  const { className, type, prefix, placeholder, onChange, value } = props;

  const newProps = {
    type: type,
    prefix: prefix,
    placeholder: placeholder,
    onChange: onChange,
    ...(value && { value: value }),
    // ...(type === "tel" && { pattern: "[+][0-9]{2}[0-9]{10}" }),
  };

  return (
    <div className={className}>
      <Input
        className="custom-input-field"
        // type={type}
        // prefix={prefix}
        // placeholder={placeholder}
        // onChange={onChange}
        {...newProps}
      />
    </div>
  );
};

export default CustomInputField;
