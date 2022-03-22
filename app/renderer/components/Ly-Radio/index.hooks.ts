import { useContext, useEffect, useState } from 'react';
import RadioGroupContext from './context';
import { IRadioProps } from './index.type';
export default function useRadio(props: IRadioProps) {
  const [checked, setChecked] = useState(props.checked ?? false);
  const [disabled, setDisabled] = useState(props.disabled ?? false);
  const context = useContext(RadioGroupContext);

  const handleChange = () => {
    const isChecked = !props.disabled && !checked;
    if (context?.onChange && isChecked) {
      context.onChange(props.value);
      props.onChange && props.onChange(props.value);
      return;
    }
    if (isChecked) {
      setChecked(!checked);
      props.onChange && props.onChange(props.value);
    }
  };
  useEffect(() => {
    if (context) {
      setChecked(props.value === context.value);
      setDisabled(!!props.disabled || !!context.disabled);
    }
  }, [context?.value, context?.disabled]);

  useEffect(() => {
    !context && setChecked(!!props.checked);
  }, [props.checked]);

  useEffect(() => {
    setDisabled(!!props.disabled);
  }, [props.disabled]);

  return {
    checked,
    disabled,
    handleChange,
  };
}
