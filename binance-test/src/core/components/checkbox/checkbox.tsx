import { FormGroup, FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { CheckboxProps } from "../../models/ICheckboxProps";

const CheckboxComponent = ({id, label, checkedSetter, listChecked}: CheckboxProps) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: any) => {
        var updatedList = [...listChecked];
        if (event.target.checked) {
          updatedList = [...listChecked, label];
        } else {
          updatedList.splice(listChecked.indexOf(label), 1);
        }
        checkedSetter(updatedList);
        setChecked(event.target.checked);
    };

    useEffect(() =>{
      const foundItem = listChecked.find((item) => item === label);
      setChecked(!!foundItem);
    }, [listChecked, label]);
    
    return (
        <FormGroup>
            <FormControlLabel 
                control={<Checkbox id={id} checked={checked} onChange={handleChange} />}
                label={label}
            />
        </FormGroup>
    );
  };
  
  export default CheckboxComponent;