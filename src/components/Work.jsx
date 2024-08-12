import { useState } from "react";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";
import Icon from "@mdi/react";
import {
  mdiDelete,
  mdiDeleteEmpty,
  mdiWindowMinimize,
  mdiWindowMaximize,
  mdiWindowClose,
  mdiPlusBox,
  mdiPlusCircle,
} from "@mdi/js";
import NewButton from "./FormBtn";
import TextArea from "./TextArea";

function Work({ updateCV, workData, exp, index }) {
  const [info, setInfo] = useState(exp);
  const [isHovered, setIsHovered] = useState(false);
  const [showWorkContent, setShowWorkContent] = useState(false);
  const [newResponsibility, setNewResponsibility] = useState("");
  const showAddWork = exp === placeholder.experience;

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function handleDescription(e) {
    const { value } = e.target;
    setNewResponsibility(value);
  }

  function addResponsibility() {
    const updatedResponsibilities = [
      ...info.responsibilities,
      newResponsibility,
    ];

    setInfo((prevInfo) => ({
      ...prevInfo,
      responsibilities: updatedResponsibilities,
    }));
    responsibilityChanges(workData, updatedResponsibilities);
  }

  function updateResponsibility(data) {
    const updatedResponsibilities = [...data];

    setInfo((prevInfo) => ({
      ...prevInfo,
      responsibilities: updatedResponsibilities,
    }));

    let updatedExperience = [...workData];
    updatedExperience[index] = {
      ...info,
      responsibilities: updatedResponsibilities,
    };
    responsibilityChanges(workData, updatedResponsibilities);
  }

  function removeResponsibility(idx) {
    let updatedExperience = [...workData];
    updatedExperience[index].responsibilities.splice(idx, 1);
    updateCV("experience", updatedExperience);
  }

  function responsibilityChanges(data, updatedData) {
    let updatedExperience = [...data];
    updatedExperience[index] = {
      ...info,
      responsibilities: updatedData,
    };

    updateCV("experience", updatedExperience);
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

  function handleWorkContent() {
    setShowWorkContent(!showWorkContent);
  }

  const isFormValid = [
    "company",
    "position",
    "startdate",
    "enddate",
    "loc",
  ].every((key) => info[key] && info[key].trim() !== "");

  return (
    <>
      {!showAddWork ? (
        <div className="list-header">
          <span className="poppins-regular">{exp.company}</span>
          <span className="list-button-container">
            <Icon
              path={showWorkContent ? mdiWindowMinimize : mdiWindowMaximize}
              size={0.8}
              onClick={handleWorkContent}
              className="section-expand"
            />
            <Icon
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={removeEntry}
              path={isHovered ? mdiDeleteEmpty : mdiDelete}
              size={0.85}
              className="section-remove"
            />
          </span>
        </div>
      ) : !showWorkContent ? (
        <>
          <span className="new-form">
            <button className="poppins-regular" onClick={handleWorkContent}>
              <span>Add New Company</span>
              <Icon path={mdiPlusBox} size={0.85} />
            </button>
          </span>
        </>
      ) : (
        <>
          <span className="close-form">
            <button onClick={handleWorkContent}>
              <Icon path={mdiWindowClose} size={0.8} />
            </button>
          </span>
        </>
      )}

      {showWorkContent && (
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

          {exp.responsibilities.map((resp, i) => (
            <div className="responsibilities" key={`${resp}${i}`}>
              <TextArea
                data={resp}
                workData={exp}
                index={i}
                updateResponsibility={updateResponsibility}
                removeResponsibility={removeResponsibility}
              />
            </div>
          ))}

          <textarea
            type="text"
            name="responsibilities"
            value={newResponsibility}
            placeholder="Main Responsibilities"
            onChange={handleDescription}
          />
          <button className="add-responsibility" onClick={addResponsibility}>
            <Icon path={mdiPlusCircle} size={1} />
          </button>

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
          <input
            type="text"
            name="loc"
            placeholder="Location"
            value={info.loc}
            onChange={handleChange}
          />

          {showAddWork ? (
            <NewButton
              onClick={handleSubmit}
              isFormValid={isFormValid}
              className="section-submit"
              buttonText="Add Work Experience"
            />
          ) : (
            <NewButton
              onClick={editEntry}
              isFormValid={isFormValid}
              className="section-edit"
              buttonText="Edit"
            />
          )}
        </section>
      )}
    </>
  );
}

export default Work;
