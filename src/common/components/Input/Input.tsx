import { FC } from "react";
import classes from "./input.module.scss";
import { useRolesStore } from "@/stores/rolesStore";

type TProps = {
  inputType: "outline" | "contain";
};

const Input: FC<TProps & React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  const { setUniqueRole } = useRolesStore();

  const onChange = (event) => {
    console.log(event.target.value);
    
    if (event.target.value.toLowerCase() === "сейчас или вообще?") {
      setUniqueRole(1);
    }
    if (event.target.value.toLowerCase() === "у пожилого") {
      setUniqueRole(2);
    }

    props.onChange(event);
  };

  return (
    <>
      <input
        className={`${classes.input} ${classes[props.inputType]}`}
        {...props}
        onChange={onChange}
      />
    </>
  );
};

export { Input };
