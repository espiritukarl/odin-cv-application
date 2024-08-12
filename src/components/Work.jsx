import { useState } from "react";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";

function Work({ updateCV, workData, exp, index }) {
  const [info, setInfo] = useState(exp);
  const showAddWork = exp === placeholder.experience;

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function editEntry() {
    let updatedExperience = [...workData];
    updatedExperience[index] = info;
    updateCV("experience", updatedExperience);
  }

  function removeEntry() {
    let updatedExperience = [...workData];
    updatedExperience.splice(index, 1);
    updateCV("experience", updatedExperience);
  }

  function handleSubmit() {
    const updatedExperience = [...workData, info];
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
          value={info.company}
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

        {!showAddWork && (
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

        {showAddWork && (
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

export default Work;
