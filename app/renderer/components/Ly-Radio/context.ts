import { createContext } from 'react';

interface RadioGroupContextProps {
  onChange?: (e: any) => void;
  value: any;
  disabled: boolean;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;
export default RadioGroupContext;
