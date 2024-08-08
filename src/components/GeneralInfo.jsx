import { useState } from "react";
import cvData from "../data/data.json";
import "../styles/form.css";

function GeneralInfo({ updateCV }) {
  const [info, setInfo] = useState(cvData.generalInfo);

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
      <section className="general-info">
        <input
          type="text"
          id="name"
          name="name"
          value={info.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          name="email"
          value={info.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="tel"
          id="tel"
          name="tel"
          value={info.tel}
          placeholder="Telephone"
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="section-submit roboto-medium"
        >
          Edit
        </button>
      </section>
    </>
  );
}

export default GeneralInfo;
