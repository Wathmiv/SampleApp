import React from 'react';
import { Box, Typography, TextField, Button, Theme, IconButton } from '@mui/material';
import { styled as materialStyled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Validation } from '../../schema/validation';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const CustomTextField = materialStyled(TextField)(({ theme }: { theme: Theme }) => ({
    width: '100%',
    '& .MuiInputBase-root': {
      height: 'auto',
      borderRadius: '5px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '297px',
    },
  }));

const CustomTimePicker = materialStyled(TimePicker)(({ theme }: { theme: Theme }) => ({
    width: '100%',
    '& .MuiInputBase-root': {
      height: '40px',
      borderRadius: '5px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '297px',
    },
  }));

function Form() {

    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          address: '',
          workshopName: '',
          phoneNumber: '',
          category: [],
          specialization: [],
          workingDays: [],
          workingHoursFrom: dayjs(new Date()).format('HH:mm'),
          workingHoursTo: dayjs(new Date()).format('HH:mm'),
          googleMapLink: '',
          longitude: '',
          latitude: '',
        },
        validationSchema: Yup.object({
          phoneNumber: Validation.phoneNumber,
          longitude: Validation.longitude,
          latitude: Validation.latitude,
          googleMapLink: Validation.url ,
        }),
        validateOnChange: false,
        onSubmit: (values) => {
          console.log(values);
          axios.post('http://localhost:8000/form', values)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        },
      });
    const categories = ["category1", "category2", "category3"] 
    const workingDays = [ "Week days", "Weekends", "Poya Days"]
    return (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      
      }}
      >
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          minHeight="100vh"
          maxWidth="500px"
          gap="15px"
        >
            <Typography variant="h4" gutterBottom><b>Form</b></Typography>
            <Box
            display={"flex"}
            flexDirection={"row"}
            gap={"10px"}
            >
            <CustomTextField
            label="First Name"
            name='firstName'
            type='text'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            variant="outlined"
            size='small'
            />
            <CustomTextField
            label="Last Name"
            name='lastName'
            type='text'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            variant="outlined"
            size='small'
            />
            </Box>

            <CustomTextField
            id="outlined-multiline-flexible"
            label="Address"
            name='address'
            type='text'
            value={formik.values.address}
            onChange={formik.handleChange}
            variant="outlined"
            size='small'
            multiline
            maxRows={4}
            />
             <CustomTextField
            label="Workshop Name"
            name='workshopName'
            type='text'
            value={formik.values.workshopName}
            onChange={formik.handleChange}
            variant="outlined"
            size='small'
            />


            <CustomTextField
            label="Phone Number"
            name='phoneNumber'
            type='text'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            variant="outlined"
            size='small'
            />

            <Autocomplete
                multiple
                id="tags-outlined"
                options={categories}
                getOptionLabel={(option) => option}
                onChange={(event, value) => {
                  formik.setFieldValue('category', [...formik.values.category, ...value]);
                }}
                renderInput={(params) => (
                  <CustomTextField
                      {...params}
                      label="Category"
                      name='category'
                      type='text'
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      variant="outlined"
                      size='small'
                      />

                )}
                  />

            <Autocomplete
                multiple
                id="tags-outlined"
                options={categories}
                getOptionLabel={(option) => option}
                onChange={(event, value) => {
                  formik.setFieldValue('specialization', [...formik.values.specialization, ...value]);
                }}
                renderInput={(params) => (
                  <CustomTextField
                      {...params}
                      label="Specialization"
                      name='specialization'
                      type='text'
                      value={formik.values.specialization}
                      onChange={formik.handleChange}
                      variant="outlined"
                      size='small'
                      />

                )}
                  />

            <Autocomplete
                multiple
                id="tags-outlined"
                options={workingDays}
                getOptionLabel={(option) => option}
                onChange={(event, value) => {
                  formik.setFieldValue('workingDays', [...formik.values.workingDays, ...value]);
                }}
                renderInput={(params) => (
                  <CustomTextField
                      {...params}
                      label="Working Days"
                      name='workingDays'
                      type='text'
                      value={formik.values.workingDays}
                      onChange={formik.handleChange}
                      variant="outlined"
                      size='small'
                      />

                )}
                  />

            <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            paddingLeft="10px"
            gap="8px"
            >

                <Typography
                sx={{width: "500px",
                  color: "rgba(0, 0, 0, 0.6);"
                }}
                >Working Hours:
                </Typography>

                <Typography
                color={"rgba(0, 0, 0, 0.6)"}
                >From
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CustomTimePicker 
                    name='workingHoursFrom'
                    value={dayjs(formik.values.workingHoursFrom, 'HH:mm')}
                    onChange={(date) =>{
                      const time = dayjs(date).format('HH:mm');
                      formik.setFieldValue('workingHoursFrom', time);
                    }}
                  />
                </LocalizationProvider>
                <Typography
                color={"rgba(0, 0, 0, 0.6)"}
                >
                  To
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CustomTimePicker
                    name='workingHoursTo'
                    value={dayjs(formik.values.workingHoursTo, 'HH:mm')} 
                    onChange={(date) => {
                      const time = dayjs(date).format('HH:mm');
                      formik.setFieldValue('workingHoursTo', time);
                    }} 

                  />
                </LocalizationProvider>
            </Box>

            <CustomTextField
            label="Google Map Link"
            name='googleMapLink'
            type='text'
            value={formik.values.googleMapLink}
            onChange={formik.handleChange}
            error={formik.touched.googleMapLink && Boolean(formik.errors.googleMapLink)}
            helperText={formik.touched.googleMapLink && formik.errors.googleMapLink}
            variant="outlined"
            size='small'
            />

          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={"10px"}
            >
            <CustomTextField
            label="Longitude"
            name='longitude'
            type='number'
            value={formik.values.longitude}
            onChange={formik.handleChange}
            error={formik.touched.longitude && Boolean(formik.errors.longitude)}
            helperText={formik.touched.longitude && formik.errors.longitude}
            variant="outlined"
            size='small'
            />
            <CustomTextField
            label="Latitude"
            name='latitude'
            type='number'
            value={formik.values.latitude}
            onChange={formik.handleChange}
            variant="outlined"
            size='small'
            />
            </Box>

            <Button
              variant="contained"
              color="primary"
              style={{
                marginTop: "20px",
                width: "100px",
                alignSelf: "flex-end"
              }}
              onClick={()=>formik.handleSubmit()}
            >
              Submit
            </Button>
            
        </Box>
      </div>
       
    );
}

export default Form;