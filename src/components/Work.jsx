import { useState } from "react";
import cvData from "../data/data.json";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";

function Work({ updateCV }) {
  const [experience, setExperience] = useState(cvData.experience || []);
  const [info, setInfo] = useState(placeholder.experience);

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function handleSubmit() {
    const updatedExperience = [...experience, info];
    setExperience(updatedExperience);
    updateCV("experience", updatedExperience);

    setInfo(placeholder.experience);
  }

  const isFormValid = Object.values(info).every((value) => value.trim() !== "");

  return (
    <>
      <section className="work-experience">
        <input
          type="text"
          name="company"
          value={info.school}
          placeholder="Company Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="position"
          value={info.position}
          placeholder="Job Position"
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="responsibilities"
          value={info.responsibilities}
          placeholder="Main Responsibilities"
          onChange={handleChange}
        />
        <input
          type="text"
          name="startdate"
          value={info.startdate}
          placeholder="Start date"
          onChange={handleChange}
        />
        <input
          type="text"
          name="enddate"
          value={info.enddate}
          placeholder="End date"
          onChange={handleChange}
        />

        <button type="submit" onClick={handleSubmit} disabled={!isFormValid}>
          Add Experience
        </button>
      </section>
    </>
  );
}

export default Work;
