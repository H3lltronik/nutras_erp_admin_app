import { useEffect, useState } from "react";

type FormModeCheckerProps = {
  formMode?: FormMode;
};

export const useFormModeChecker = (props: FormModeCheckerProps) => {
  const formMode = props.formMode || "edit";
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (formMode === "view") {
      setDisabled(true);
    }
  }, [formMode]);

  return {
    disabled,
  };
};
