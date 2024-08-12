function NewButton({ onClick, isFormValid, className, buttonText }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isFormValid}
      className={`roboto-medium ${className}`}
    >
      {buttonText}
    </button>
  );
}

export default NewButton;
