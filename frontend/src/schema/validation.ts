import * as yup from 'yup';

export const Validation = {
  phoneNumber: yup
    .string()
    .matches(/^(?:0|\+94)[1-9]\d{8}$/, 'Invalid phone number')
    .required('Phone Number is required'), 
  longitude: yup
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180')
    .required('Longitude is required'),
  latitude: yup
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90')
    .required('Latitude is required'),
  url: yup
    .string()
    .url("Invalid URL")
};