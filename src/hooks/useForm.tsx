import { useState } from 'react';
 
 
export const useForm = <T extends {[key: string]: any},>(initialState: T) => {
 
  const [form, setForm] = useState(initialState);
 
  const onChange = <K extends keyof T>(value: T[K], field: K) => {
    setForm({
      ...form,
      [field]: value,
    });
  };
 
  return {
    ...form,
    form,
    onChange,
  };
};