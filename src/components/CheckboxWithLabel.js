import { Checkbox, FormControlLabel } from "@material-ui/core";

const CheckboxWithLabel = (props) => {
  const { name, ...rest } = props;

  return (
    <FormControlLabel 
      label={name}
      control={<Checkbox onClick={(evt)=>{evt.preventDefault()}} {...rest}/>}
    />
  );
}

export default CheckboxWithLabel;

  