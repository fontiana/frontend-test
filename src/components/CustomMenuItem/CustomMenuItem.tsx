// MUI components
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const CustomMenuItem = () => {
  return (
    <Box sx={{ display: "flex" }} pb={"8px"}>
      <Select
        labelId="list-select-label"
        id="list-select"
        value={10}
        label="Lista"
        onChange={(e) => {}}
        fullWidth
        size="small"
      >
        <MenuItem value={10}>Valor 1</MenuItem>
        <MenuItem value={20}>Valor 2</MenuItem>
        <MenuItem value={30}>Valos 3</MenuItem>
      </Select>
      <IconButton>
        <AddBoxIcon color="primary" />
      </IconButton>
    </Box>
  );
};
