import React from "react";
type Props = {
  label: string;
  name?: string;
  checked: boolean;
  onChange: any;
  textColor: string;
};

export default function CheckBox({
  label,
  name = label,
  checked,
  onChange = () => {},
  textColor,
}: Props) {
  function handle() {
    onChange(!checked);
  }

  return (
    <div className="w-full flex flex-no-wrap justify-center align-bottom">
      <input
        className="m-1 h-4"
        name={name}
        id={name}
        onChange={handle}
        type="checkbox"
        checked={checked}
      />
      <label htmlFor={name} style={{ color: textColor }}>
        {label}
      </label>
    </div>
  );
}
