import { useState, useEffect } from "react";
import "../styles/form.css";
import NewButton from "./NewButton";
import InputField from "./InputField";

function GeneralInfo({ updateCV, cvData }) {
  const [info, setInfo] = useState(cvData);

  useEffect(() => {
    if (cvData) {
      setInfo(cvData);
    }
  }, [cvData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  function handleSubmit() {
    updateCV("generalInfo", info);
  }

  const isFormValid = Object.values(info).every((value) => value.trim() !== "");

  return (
    <section className="general-info poppins-regular">
      <InputField
        label="Name"
        name="name"
        value={info.name}
        placeholder="e.g. John Doe"
        onChange={handleChange}
      />
      <InputField
        label="Email"
        name="email"
        value={info.email}
        placeholder="e.g. john.doe@example.com"
        type="email"
        onChange={handleChange}
      />
      <InputField
        label="Cellphone #"
        name="tel"
        value={info.tel}
        placeholder="e.g. +1234567890"
        type="tel"
        onChange={handleChange}
      />
      <InputField
        label="Address"
        name="loc"
        value={info.loc}
        placeholder="e.g. 118 Dr. Jose Rizal St., Manila"
        onChange={handleChange}
      />
      <InputField
        label="LinkedIn"
        name="linkedin"
        value={info.linkedin}
        placeholder="e.g. linkedin.com/johndoe112"
        onChange={handleChange}
      />
      <InputField
        label="GitHub"
        name="github"
        value={info.github}
        placeholder="e.g. github.com/johndoemas112"
        onChange={handleChange}
      />

      <NewButton
        onClick={handleSubmit}
        isFormValid={isFormValid}
        className="section-submit"
        buttonText="Edit"
      />
    </section>
  );
}

export default GeneralInfo;
