import TextField from "@mui/material/TextField";

const SearchBar = ({setSearchQuery}: any) => (
    <>
      <TextField
        id="search-bar"
        onInput={(e) => {
          setSearchQuery((e.target as HTMLInputElement).value);
        }}
        variant="outlined"
        placeholder="Search..."
        size="small"
        style={{width: "100%"}}
      />
    </>
  );
  
  export default SearchBar;