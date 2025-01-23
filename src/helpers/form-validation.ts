import * as Yup from 'yup'

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Your name must be longer than 2 characters.')
    .max(50, 'Your name must be shorter than 50 characters.')
    .required('A name is required'),
  email: Yup.string().email('Invalid email').required('An email is required'),
  password: Yup.string()
    .min(6, 'Your password must be at least 6 characters.')
    .required('A password is required'),
  passwordRepeat: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  )
})

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('An email is required'),
  password: Yup.string().required('A password is required')
})
