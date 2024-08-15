function InputField({ label, name, value, placeholder, onChange }) {
  return (
    <label htmlFor={name}>
      {label}
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
}

export default InputField;
