import { useState } from "react";
import { FaEye, FaLowVision } from "react-icons/fa";

const onKeyDown = (event) => {
  if (event.keyCode === 13) {
    //13 is the key code for Enter
    event.preventDefault();
    //Here you can even write the logic to select the value from the drop down or something.
  }
};

export const TextInputModal = ({
  placeholder,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  value,
  required,
  disable,
  min,
  max,
  onInput,
  defaultValue,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && (
        <label className="mt-5" htmlFor={name}>
          {label}
        </label>
      )}

      <input
        onKeyDown={onKeyDown}
        style={{
          border: "1px solid #EBEBEB",
          background: "#EBEBEB",
          borderRadius: "5px",
          // height: "40px",
          fontSize: "14px",
          padding: "10px",
          color: "black",
          fontWeight: "normal",
          outline: "none",
        }}
        type={type}
        id={id}
        name={name}
        ref={ref}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onInput={onInput}
        onChange={onChange}
        value={value}
        required={required}
        min={min}
        max={max}
        disabled={disable}
      />
    </div>
  );
};

export const TextInput = ({
  placeholder,
  label,
  type,
  id,
  autoComplete,
  onChange,
  value,
  required,
  disable,
  onInput,
  defaultValue,
  validationMsg,
  validation,
}) => {
  const numberInputOnWheelPreventChange = (e) => {
    e.target.blur();
  };
  return (
    <>
      <div>
        <form className="grid-container">
          {label && (
            <label className="mt-1 mr-2">
              {label} {required && <span className="ml-1 text-merah">*</span>}
            </label>
          )}

          <span className="mt-1">:</span>

          <div
            className="px-3 md:ml-10 py-2 text-sm text-base font-normal text-gray-700 bg-white "
            style={{
              display: "flex",
              textAlign: "center",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px solid #D1D5DB",
            }}
          >
            <input
              onKeyDown={onKeyDown}
              style={{
                width: "100%",
                padding: "5px",
                outline: "none",
                borderRadius: "4px",
                background: "white",
              }}
              type={type}
              id={id}
              autoComplete={autoComplete}
              onChange={onChange}
              value={value}
              required={required}
              placeholder={placeholder}
              disabled={disable}
              onInput={onInput}
              defaultValue={defaultValue}
              onWheel={numberInputOnWheelPreventChange}
            />
          </div>
        </form>
        {validation == false ? (
          <p className="flex md:justify-end  md:mr-24 mb-1 text-red-400 italic text-xs">
            <span className="ml-1 text-red-400">*</span>
            {validationMsg}
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export const TextInputPassword = ({
  pwd,
  setPwd,
  label,
  onFocus,
  onBlur,
  placeholder,
}) => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <>
      <div>
        <label htmlFor="password" className="flex mt-2 mb-1 form-label">
          {label}
        </label>
        <div
          className="block w-full text-base font-normal text-gray-700 bg-white "
          style={{
            display: "flex",
            textAlign: "center",
            fontSize: "16px",
            borderRadius: "10px",
            background: "#E6E6E6",
          }}
        >
          <input
            onKeyDown={onKeyDown}
            style={{
              width: "100%",
              padding: "10px",
              outline: "none",
              borderRadius: "10px 0px 0px 10px",
              background: "#E6E6E6",
            }}
            type={values.showPassword ? "text" : "password"}
            autoComplete="off"
            onChange={setPwd}
            placeholder={placeholder}
            value={pwd}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <i
            style={{
              width: "50px",
              padding: "12px",
              fontSize: "22px",
              cursor: "pointer",
              color: "gray",
            }}
            onClick={() => handleClickShowPassword()}
          >
            {values.showPassword ? <FaLowVision /> : <FaEye />}
          </i>
        </div>
      </div>
    </>
  );
};

export const TextArea = ({
  index,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  value,
  required,
  rows,
  min,
  max,
  onInput,
}) => {
  return (
    <>
      <div>
        <form className="grid-container">
          {label && (
            <label htmlFor={name}>
              {label} {required && <span className="ml-1 text-merah">*</span>}
            </label>
          )}

          <span>:</span>

          <textarea
            className="w-auto ml-20 px-3 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-merah focus:outline-none"
            type={type}
            id={id}
            name={name}
            ref={ref}
            autoComplete={autoComplete}
            onInput={onInput}
            onChange={onChange}
            value={value}
            required={required}
            min={min}
            max={max}
          />
        </form>
      </div>
    </>
  );
};

export default TextInput;
