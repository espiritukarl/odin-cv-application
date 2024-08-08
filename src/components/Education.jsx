import { useState } from "react";
import cvData from "../data/data.json";
import placeholder from "../data/placeholder.json";

function Education({ updateCV }) {
  const [education, setEducation] = useState(cvData.education || []);
  const [info, setInfo] = useState(placeholder.education);

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function handleSubmit() {
    const updatedEducation = [...education, info];
    setEducation(updatedEducation);
    updateCV("education", updatedEducation);

    setInfo(placeholder.education);
  }

  return (
    <>
      <h2>Education</h2>
      <section>
        <input
          type="text"
          name="school"
          value={info.school}
          placeholder="Institution Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={info.title}
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
          Add Education
        </button>
      </section>
    </>
  );
}

export default Education;
