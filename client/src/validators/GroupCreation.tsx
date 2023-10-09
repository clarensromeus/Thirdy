import * as yup from "yup";

const validateGroupCreation = yup.object().shape({
  GroupName: yup.string().required("enter the group name"),
  GroupPrivacy: yup.string().required("required").trim(),
});

export default validateGroupCreation;
