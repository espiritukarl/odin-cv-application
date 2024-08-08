import { useState } from "react";
import cvData from "../data/data.json";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";

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

  const isFormValid = Object.values(info).every((value) => value.trim() !== "");

  return (
    <>
      <section className="education">
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
          type="text"
          name="startdate"
          placeholder="Start date"
          value={info.startdate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="enddate"
          placeholder="End date"
          value={info.enddate}
          onChange={handleChange}
        />

        <button type="submit" onClick={handleSubmit} disabled={!isFormValid}>
          Add Education
        </button>
      </section>
    </>
  );
}

export default Education;
