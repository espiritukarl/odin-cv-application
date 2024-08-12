import { useState } from "react";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";

function Education({ updateCV, educationData, school, index }) {
  const [info, setInfo] = useState(school);
  const showAddEducation = school === placeholder.education;

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function editEntry() {
    let updatedEducation = [...educationData];
    updatedEducation[index] = info;
    updateCV("education", updatedEducation);
  }

  function removeEntry() {
    let updatedEducation = [...educationData];
    updatedEducation.splice(index, 1);
    updateCV("education", updatedEducation);
  }

  function handleSubmit() {
    const updatedEducation = [...educationData, info];
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
        <input
          type="text"
          name="loc"
          placeholder="Location"
          value={info.loc}
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
