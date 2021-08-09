import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import getUserDetails from "../../../apicalls/getUserDetails";
import UserDetailsForm from "./UserDetailsForm";
import updateKYC from "../../../apicalls/updateKYC";
import ErrorMsg from "../../screenMessages/ErrorMsg";
import SuccessMsg from "../../screenMessages/SuccessMsg";
import { useHistory } from "react-router-dom";

export default function UserDetails() {
  const [errorfromCall, setErrorfromCall] = useState(null);
  const [succesMsgfromCall, setSuccessMsgfromCall] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const getUserData = async () => {
      const { error, responseData } = await getUserDetails();
      if (error) setErrorfromCall(error);
      if (responseData) setUserData(responseData);
    };
    getUserData();
  }, []);
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        //userData?.name this naming convention is used because of properties names in Raindrop/raintech.php?apicall=getUserKyc api
        firstName: userData ? userData.name : "",
        midddlename: userData ? userData.middlename : "",
        lastName: userData ? userData.surname : "",
        dob: userData ? userData.dob : "",
        taxID: userData ? userData.taxID : "",
        mobile: userData ? userData.mobile : "",
        phone: userData ? userData.phone : "",
        country: userData ? userData.country : "",
        addline1: userData ? userData.addline1 : "",
        addline2: userData ? userData.addline2 : "",
        city: userData ? userData.city : "",
        state: userData ? userData.state : "",
        zip: userData ? userData.zip : "",
      },
      validationSchema: Yup.object({
        mobile: Yup.string()
          .matches(
            /^\d+$/,
            "Mobile number should only have digits. No special charaters or letters to be included."
          )
          .length(10, "Mobile must be exactly 10 digits")
          .nullable(),
        phone: Yup.string()
          .matches(
            /^\d+$/,
            "Phone number should only have digits. No special charaters or letters to be included."
          )
          .length(10, "Phone must be exactly 10 digits")
          .nullable(),
      }),
      async onSubmit() {
        setErrorfromCall(null);
        setSuccessMsgfromCall(null);
        setLoading(true);
        const { error, successMsg } = await updateKYC(values);
        if (error) {
          setLoading(false);
          setErrorfromCall(error);
        }
        if (successMsg) {
          setLoading(false);
          setSuccessMsgfromCall(successMsg);
        }
        setTimeout(() => {
          history.push("/");
          history.push("/dashboard/account-setting/user-details");
        }, 1500);
      },
    });
  // console.log("userData...", userData);
  // console.log("error...", errorfromCall);
  // console.log("values...", values);
  // console.log("successMsg...", succesMsgfromCall);
  // console.log("error...", errorfromCall);
  const props = {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    loading,
  };
  function getMsgComponent() {
    if (errorfromCall) return <ErrorMsg message={errorfromCall} />;
    if (succesMsgfromCall) return <SuccessMsg message={succesMsgfromCall} />;
    if (!errorfromCall && !succesMsgfromCall) return null;
  }
  return (
    <>
      <UserDetailsForm props={props} />
      {getMsgComponent()}
    </>
  );
}
