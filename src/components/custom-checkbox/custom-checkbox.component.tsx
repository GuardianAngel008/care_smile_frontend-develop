import React from "react";
import "./custom-checkbox.styles.scss";

import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface CustomProps {
  onChange?: (e: CheckboxChangeEvent) => void;
  className?: string;
  name: string;
  icon?: JSX.Element;
  checked?: boolean;
}

const CustomCheckbox: React.FC<CustomProps> = (props: CustomProps) => {
  const { onChange, className, name, icon, checked } = props;
  const newProps = {
    onChange: onChange,
    name: name,
    icon: icon,
    ...(checked != undefined && { checked: checked }),
  };

  return (
    <div className={className}>
      <div className="custom-checkbox-container">
        <div className="name-icon-container">
          <div className="icon-image-container">{icon}</div>
          <div className="text-container">{name}</div>
        </div>
        {/* <Checkbox checked={checked!=null&&checked} className="custom-checkbox" onChange={onChange} /> */}
        <Checkbox className="custom-checkbox" {...newProps} />
      </div>
    </div>
  );
};

export default CustomCheckbox;
