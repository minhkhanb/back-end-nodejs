import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { navigate } from 'gatsby';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { RootState } from '@src/store';
import { login } from '@src/store/user';

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FunctionComponent = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isLoggedIn) return;

    navigate('/');
  }, [isLoggedIn]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    dispatch(login(data));
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 400, m: '50px auto', p: 3 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="h5"
          sx={{ mb: 3, textAlign: 'center' }}
        >
          Login to account
        </Typography>
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="First Name"
                className="email-input"
                placeholder="First Name"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Password"
                className="password-input"
                placeholder="Password"
                autoComplete={'new-password'}
                sx={{ mb: 3 }}
                {...field}
              />
            )}
          />

          <div>
            <Button
              className="btn-submit"
              type="submit"
              fullWidth
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
