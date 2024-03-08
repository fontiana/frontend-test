import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { CheckboxList } from "../CheckBoxList/CheckBoxList";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { InputAdornment, Stack } from "@mui/material";

export const Menu = () => {
  return (
    <Box alignItems="center">
      <Stack spacing={1} pb="8px" sx={{ flexGrow: "1" }}>
        <TextField
          size="small"
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Paper square variant="outlined" sx={{ overflow: "auto" }}>
          <CheckboxList />
        </Paper>
      </Stack>

      <Button fullWidth variant="contained">
        {"Add to List"}
      </Button>
    </Box>
  );
};
