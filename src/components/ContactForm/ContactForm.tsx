import { Formik, Form, Field, type FieldProps } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import type { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").required("Required"),
  number: Yup.string().min(3, "Too Short!").required("Required"),
});

export const ContactForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={ContactSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await dispatch(addContact(values)).unwrap();
          toast.success("Contact added!");
          resetForm();
        } catch (error) {
          toast.error("Failed to add contact");
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Field name="name">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Field>

            <Field name="number">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Number"
                  fullWidth
                  error={touched.number && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Field>

            <Button
              type="submit"
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{ py: 1.5 }}
            >
              Add Contact
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
