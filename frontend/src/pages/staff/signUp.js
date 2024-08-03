import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { IconLabelTabs } from '../../components/tabPanel'
import { Navbar } from '../../components/navbar';
import WidgetWrapper from '../../components/WidgetWrapper';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export function StaffSignup(props) {
  React.useEffect(() => {
    props.setValue(2);
  }, [])


  const [isSentOtp, setIsSentOtp] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!isSentOtp) {
      let firstName = data.get('firstName');
      let lastName = data.get('lastName');
      let email = data.get('email');
      let password = data.get('password');
      let staffID = data.get('staffID');
      let yearOfJoining = data.get('yearOfJoining');

      await axios.post('http://localhost:3001/signup/staff', { firstName, lastName, email, password, staffID, yearOfJoining })
        .then(result => {
          if (result.data.status === 500) alert(result.data.error);
          else if (result.data.status === 400 && result.data === "You have already Registered") {
            alert("You have already Registered!");
            navigate('/auth/login');
          } else if (result.data.status === 400) {
            alert(result.data);
          } else {
            setIsSentOtp(true);
          }
        })
        .catch(err => console.log(err));
    } else {
      // Extract OTP value from form data
      let otp = data.get('otp');
      // Call API to verify OTP
      await axios.post('http://localhost:3001/signup/authenticate', { otp })
        .then(result => {
          console.log(result);
          // Handle success or failure based on the result
          navigate('/auth/login');
        })
        .catch(err =>alert(err.message));
    }
  };

  return (
    <Box>
      <Navbar />
      <Box padding="2rem 25%">
        <CssBaseline />
        <WidgetWrapper>
          <Box
            sx={{
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <IconLabelTabs value={props.value} setValue={props.setValue} />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              {!isSentOtp && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="...@iiitg.ac.in"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="staffID"
                      label="Staff ID"
                      name="staffID"
                      autoComplete="staffID"
                      inputProps={{ min: 1, max: 999999 }}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="yearOfJoining"
                      label="Year of Joining"
                      name="yearOfJoining"
                      autoComplete="yearOfJoining"
                      select
                    >
                      {Array.from({ length: 100 }, (_, i) => 2023 + i).map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              )}
              {isSentOtp && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="otp"
                      label="OTP"
                      name="otp"
                      autoComplete="otp"
                    />
                  </Grid>
                </Grid>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isSentOtp ? 'Verify OTP' : 'Sign Up'}
              </Button>
              {!isSentOtp && (
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/auth/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </WidgetWrapper>
      </Box>
    </Box>
  );
}

