import { useState } from "react";
import cvData from "../data/data.json";
import placeholder from "../data/placeholder.json";

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

  return (
    <>
      <h2>Experience</h2>
      <section>
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
          placeholder="Degree Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="responsibilities"
          value={info.responsibilities}
          placeholder="Degree Name"
          onChange={handleChange}
        />
        <input
          type="date"
          name="startdate"
          value={info.startdate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="enddate"
          value={info.enddate}
          onChange={handleChange}
        />

        <button className="edit">Edit</button>
        <button type="submit" onClick={handleSubmit}>
          Add Experience
        </button>
      </section>
    </>
  );
}

export default Work;
