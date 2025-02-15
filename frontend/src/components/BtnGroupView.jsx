import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

export default function BtnGroupView(props) {
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      props.action(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="info"
      value={props.value}
      exclusive
      onChange={handleChange}
      aria-label="Vista"
    >
      <ToggleButton value="cards">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="table">
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
