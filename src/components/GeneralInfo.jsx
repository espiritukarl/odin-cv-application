import { useState } from "react";
import "../styles/form.css";

function GeneralInfo({ updateCV, cvData }) {
  const [info, setInfo] = useState(cvData.generalInfo);
  if (cvData.generalInfo !== info) {
    setInfo(cvData.generalInfo);
  }
  const showGeneralInfo = info.name === "";

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function handleSubmit() {
    updateCV("generalInfo", info);
  }

  return (
    <>
      <section className="general-info poppins-regular">
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={info.name}
            placeholder="e.g. John Doe"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={info.email}
            placeholder="e.g. john.doe@example.com"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="tel">
          Cellphone #
          <input
            type="tel"
            id="tel"
            name="tel"
            value={info.tel}
            placeholder="e.g. +1234567890"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="loc">
          Address
          <input
            type="text"
            id="loc"
            name="loc"
            value={info.loc}
            placeholder="e.g. 118 Dr. Jose Rizal St., Manila"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="linkedin">
          LinkedIn
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={info.linkedin}
            placeholder="e.g. linkedin.com/johndoe112"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="github">
          GitHub
          <input
            type="text"
            id="github"
            name="github"
            value={info.github}
            placeholder="e.g. github.com/johndoemas112"
            onChange={handleChange}
          />
        </label>

        <button
          type="button"
          onClick={handleSubmit}
          className="section-submit roboto-medium"
          disabled={showGeneralInfo}
        >
          Edit
        </button>
      </section>
    </>
  );
}

export default GeneralInfo;
