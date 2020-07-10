import {useState} from 'react';

const useFormReactNativeHook = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (name, text) =>
      setValues({
        ...values,
        [name]: text,
      }),
  ];
};

export default useFormReactNativeHook;
