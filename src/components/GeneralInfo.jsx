import { useState } from "react";
import "../styles/GeneralInfo.css";
import placeholder from "../data/placeholder.json";

function GeneralInfo({ updateCV }) {
  const [info, setInfo] = useState(placeholder.generalInfo);

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function handleSubmit() {
    updateCV("generalInfo", info); // Update the 'generalInfo' section
  }

  return (
    <>
      <h2>General Information</h2>
      <section>
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

        <button className="edit">Edit</button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </section>
    </>
  );
}

export default GeneralInfo;
