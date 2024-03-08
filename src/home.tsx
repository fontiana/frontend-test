import React from "react";

// Material UI Components
import Box from "@mui/material/Box";
import { Menu } from "./components/Menu/Menu";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Custom Component
import { PriceTable } from "./components/PriceTable/PriceTable";
import { CustomMenuItem } from "./components/CustomMenuItem/CustomMenuItem";
import { SymbolProvider } from "./providers/SymbolProvider";

const Home = () => {
  return (
    <SymbolProvider>
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
              <CustomMenuItem />
            </Box>
            <Paper square variant="outlined">
              <PriceTable />
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </SymbolProvider>
  );
};

export { Home };
