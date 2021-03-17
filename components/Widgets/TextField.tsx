import React, { useState } from "react";
type Props = {
  textColor: string;
  label: string;
  name?: string;
  hint?: string;
  errorText: string;
  initData?: string;
  onChange: any;
  errorCheck: any;
  validate: Function;
  type: string;
  maxlength: number;
};

export default function TextField({
  textColor,
  label,
  name = label,
  hint = "",
  errorText,
  initData,
  onChange = () => {},
  errorCheck = () => {},
  validate,
  type = "text",
  maxlength,
}: Props) {
  function handle(event: React.FormEvent<HTMLInputElement>, type: string) {
    let temp;
    if (type == "number") {
      temp = event.currentTarget.value.substring(0, 2);
    } else {
      temp = event.currentTarget.value;
    }
    const tempErr = validate(event.currentTarget.value);
    setErr(tempErr);
    setTyped(true);
    onChange(temp);
    errorCheck(tempErr);
    // console.log("value: " + event.currentTarget.value);
    // console.log("validate: " + tempErr);
    // console.log("err: " + tempErr);
  }

  function handleTextarea(text: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(text.currentTarget.value);
  }

  const [err, setErr] = useState(true);

  const [typed, setTyped] = useState(false);

  return (
    <div className="w-full mb-5">
      <label style={{ color: textColor }} htmlFor={name}>
        {label}
        <span className="text-sm text-red-500"> {hint}</span>
      </label>
      {type == "textarea" ? (
        <textarea
          value={initData}
          onChange={(v) => handleTextarea(v)}
          className="w-full border border-t-0 border-r-0 border-l-0 border-gray-500 py-3 px-2 outline-none text-lg"
        />
      ) : (
        <input
          className="w-full border border-t-0 border-r-0 border-l-0 border-gray-500 py-3 px-2 outline-none text-lg"
          name={name}
          id={name}
          value={initData}
          onChange={(e) => handle(e, type)}
          type={type}
          maxLength={maxlength}
        />
      )}

      <div className="w-full px-2 text-sm text-red-500">
        {!err && typed ? errorText : ""}
      </div>
    </div>
  );
}
