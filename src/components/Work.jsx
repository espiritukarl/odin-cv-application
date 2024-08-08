import { useState, useEffect } from "react";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";

function Work({ updateCV, workData, exp, index }) {
  const [experience, setExperience] = useState(workData);
  const [info, setInfo] = useState(exp);
  const showAddWork = exp === placeholder.experience;

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  useEffect(() => {
    setExperience(workData);
  }, [workData]);

  function editEntry() {
    let updatedExperience = [...experience];
    updatedExperience[index] = info;
    setExperience(updatedExperience);
    updateCV("experience", updatedExperience);
  }

  function removeEntry() {
    let updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
    updateCV("experience", updatedExperience);
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
              disabled={!isFormValid}
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
