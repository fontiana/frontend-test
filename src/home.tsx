import React from "react";

// Material UI Components
import Box from "@mui/material/Box";
import { Menu } from "./components/Menu/Menu";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { PriceTable } from "./components/PriceTable/PriceTable";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Home = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ height: "100%", width: "100%" }}>
        <Grid item>
          <Paper
            square={false}
            elevation={2}
            sx={{ height: "100%", padding: "16px 8px" }}
          >
            <Menu />
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            square={false}
            elevation={2}
            sx={{ height: "100%", padding: "16px 8px" }}
          >
            <Box sx={{ display: "flex" }} pb={"8px"}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label="Age"
                onChange={() => {}}
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
            <Paper square variant="outlined">
              <PriceTable />
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export { Home };
