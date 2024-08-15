import { useState } from "react";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

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
    updateResponsibility(updatedResponsibilities);
  }

  return (
    <div className="work-responsibilities">
      <textarea
        type="text"
        name="responsibilities"
        value={responsibility}
        placeholder="Edit previous entry..."
        onChange={(event) => setResponsibility(event.target.value)}
      />
      <div className="responsibilities-button-container">
        <button onClick={editResponsibility}>Edit</button>
        <button onClick={() => removeResponsibility(index)}>
          <Icon path={mdiTrashCanOutline} size={0.85} />
        </button>
      </div>
    </div>
  );
}

export default TextArea;
