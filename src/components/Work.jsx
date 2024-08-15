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
import NewButton from "./NewButton";
import TextArea from "./TextArea";
import InputField from "./InputField";
import useHover from "../hooks/useHover";

function Work({ updateCV, workData, exp, index }) {
  const [info, setInfo] = useState(exp);
  const [showWorkContent, setShowWorkContent] = useState(false);
  const [newResponsibility, setNewResponsibility] = useState("");
  const showAddWork = workData.length > index;
  const noEntry =
    JSON.stringify(info.experience) ===
    JSON.stringify(placeholder.experience[0]);
  const [isHovered, handleMouseEnter, handleMouseLeave] = useHover();

  const showForm = () => {
    if (showWorkContent) {
      return (
        <span className="close-form">
          <button onClick={() => setShowWorkContent(!showWorkContent)}>
            <Icon path={mdiWindowClose} size={0.8} />
          </button>
        </span>
      );
    } else {
      return (
        <span className="new-form">
          <button
            className="poppins-regular"
            onClick={() => setShowWorkContent(!showWorkContent)}
          >
            <span>Add New Company</span>
            <Icon path={mdiPlusBox} size={0.85} />
          </button>
        </span>
      );
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  function handleDescription(e) {
    setNewResponsibility(e.target.value);
  }

  function addResponsibility() {
    const updatedResponsibilities = [
      ...info.responsibilities,
      newResponsibility,
    ];
    updateWorkData({ ...info, responsibilities: updatedResponsibilities });
    setNewResponsibility("");
  }

  function updateResponsibility(data) {
    updateWorkData({ ...info, responsibilities: data });
  }

  function removeResponsibility(idx) {
    const updatedExperience = [...workData];
    updatedExperience[index].responsibilities.splice(idx, 1);
    updateCV("experience", updatedExperience);
  }

  function updateWorkData(updatedInfo) {
    const updatedExperience = [...workData];
    updatedExperience[index] = updatedInfo;
    updateCV("experience", updatedExperience);
    setInfo(updatedInfo);
  }

  function removeEntry() {
    const updatedExperience = [...workData];
    updatedExperience.splice(index, 1);
    updateCV("experience", updatedExperience);
  }

  function handleSubmit(action) {
    if (action === "add") {
      updateCV("experience", [...workData, info]);
    } else if (action === "empty") {
      updateCV("experience", [info]);
    }
    setInfo(placeholder.experience[0]);
    setShowWorkContent(false);
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
      {showAddWork
        ? exp.company && (
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
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={removeEntry}
                  path={isHovered ? mdiDeleteEmpty : mdiDelete}
                  size={0.85}
                  className="section-remove"
                />
              </span>
            </div>
          )
        : showForm()}

      {showWorkContent && (
        <section className="work-experience poppins-regular">
          <InputField
            label="Company Name"
            name="company"
            value={info.company}
            placeholder="e.g. Netflix Inc."
            onChange={handleChange}
          />
          <InputField
            label="Job Title"
            name="position"
            value={info.position}
            placeholder="e.g. Junior Web Developer"
            onChange={handleChange}
          />

          <span>Job Responsibilities</span>
          {exp.responsibilities &&
            exp.responsibilities.map((resp, i) => (
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
            placeholder="e.g. Developed and maintained web applications"
            onChange={handleDescription}
          />
          <button className="add-responsibility" onClick={addResponsibility}>
            <Icon path={mdiPlusCircle} size={1} />
          </button>

          <InputField
            label="Start Date"
            name="startdate"
            value={info.startdate}
            placeholder="e.g. September 2021"
            onChange={handleChange}
          />
          <InputField
            label="End Date"
            name="enddate"
            value={info.enddate}
            placeholder="e.g. March 2024"
            onChange={handleChange}
          />
          <InputField
            label="Location"
            name="loc"
            value={info.loc}
            placeholder="e.g. New Delhi, India"
            onChange={handleChange}
          />

          {!showAddWork ? (
            <NewButton
              onClick={() => handleSubmit(noEntry ? "empty" : "add")}
              isFormValid={isFormValid}
              className="section-submit"
              buttonText="Add Work Experience"
            />
          ) : (
            <NewButton
              onClick={() => updateWorkData(info)}
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
