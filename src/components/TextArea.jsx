import { useState } from "react";

function TextArea({
  data,
  workData,
  index,
  updateResponsibility,
  removeResponsibility,
}) {
  const [responsibility, setResponsibility] = useState(data);

  function editResponsibility() {
    let updatedResponsibilities = [...workData.responsibilities];
    updatedResponsibilities[index] = responsibility;
    updateResponsibility(updatedResponsibilities, index);
  }

  return (
    <>
      <textarea
        type="text"
        name="responsibilities"
        value={responsibility}
        placeholder="Main Responsibilities"
        onChange={(event) => setResponsibility(event.target.value)}
      />
      <button onClick={editResponsibility}>Edit</button>
      <button onClick={() => removeResponsibility(index)}>Remove</button>
    </>
  );
}

export default TextArea;
