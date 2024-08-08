import { useState, useEffect } from "react";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";

function Education({ updateCV, educationData, school, index }) {
  const [education, setEducation] = useState(educationData);
  const [info, setInfo] = useState(school);
  const showAddEducation = school === placeholder.education;

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  useEffect(() => {
    setEducation(educationData);
  }, [educationData]);

  function editEntry() {
    let updatedEducation = [...education];
    updatedEducation[index] = info;
    setEducation(updatedEducation);
    updateCV("education", updatedEducation);
  }

  function removeEntry() {
    let updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
    updateCV("education", updatedEducation);
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

        {!showAddEducation && (
          <div className="button-container">
            <button
              type="button"
              onClick={editEntry}
              disabled={!isFormValid}
              className="section-edit roboto-medium"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={removeEntry}
              className="section-remove roboto-medium"
            >
              Remove
            </button>
          </div>
        )}

        {showAddEducation && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="section-submit roboto-medium"
          >
            Add Education
          </button>
        )}
      </section>
    </>
  );
}

export default Education;
