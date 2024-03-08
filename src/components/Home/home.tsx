// Material UI Components
import { Menu } from "../Menu/Menu";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Custom Component
import { PriceTable } from "../PriceTable/PriceTable";
import { CustomMenuItem } from "../CustomMenuItem/CustomMenuItem";
import { SymbolProvider } from "../../providers/SymbolProvider";

const Home = () => {
  return (
    <SymbolProvider>
      <Grid container spacing={2} sx={{ height: "100%", width: "100%" }}>
        <Grid item>
          <Paper
            square={false}
            elevation={2}
            sx={{ padding: "16px 8px", overflow: "auto" }}
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
            <CustomMenuItem />
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
