import { TextField, Button } from '@mui/material';
import React from 'react';
import {
  useForm,
  Controller,
  ControllerRenderProps,
  FormProvider,
  useFormContext,
  DefaultValues,
  FieldValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

interface IFormInput extends FieldValues {
  firstName: string;
  lastName: string;
  age: number;
}

interface FormProps<T> extends React.PropsWithChildren {
  defaultValues: DefaultValues<T>;
  onSubmit: (values: T) => void;
}

type InputProps = {
  label: string,
  field: ControllerRenderProps,
};

interface ElementProps extends React.PropsWithChildren {
  className?: string;
  name: string;
}

const Input = ({ field }: InputProps) => {
  // console.log('input label: ', label, field);

  return <TextField {...field} label="Last Name" />;
};

const validationSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

const Test = <T,>(name: T) => {
  const a = 5;
  console.log(`Hi: ${name} ${a}`);
};

Test<string>('Dev');

const Form = <T,>({ children, onSubmit, defaultValues }: FormProps<T>) => {
  const formHandlers = useForm<T>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const onSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    // this part is for stopping parent forms to trigger their submit
    if (evt) {
      // sometimes not true, e.g. React Native
      if (typeof evt.preventDefault === 'function') {
        evt.preventDefault();
      }

      if (typeof evt.stopPropagation === 'function') {
        // prevent any outer forms from receiving the event too
        evt.stopPropagation();
      }
    }

    return formHandlers.handleSubmit(async (values) => {
      await onSubmit(values);
    })(evt);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <FormProvider {...formHandlers}>
      <form onSubmit={onSubmitHandler}>{children}</form>
    </FormProvider>
  );
};

const Field: React.FunctionComponent<ElementProps> = ({ className, name }) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input field={{ ...field }} label="First Name" />
        )}
      />

      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => {
          return <p>{message}</p>;
        }}
      />
    </div>
  );
};

const MainForm = () => {
  const defaultValues: IFormInput = {
    firstName: 'Dev',
    lastName: 'Fs1',
    age: 26,
  };

  return (
    <Form<IFormInput>
      defaultValues={defaultValues}
      onSubmit={(values) => console.log('values: ', values)}
    >
      <Field name="firstName" />
      <Field name="lastName" />
      <Field name="age" />

      <Button size="large" variant="contained" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MainForm;
