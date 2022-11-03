import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BannerComponent from "../components/BannerComponent";

const headerText = "Your Payment was Cancelled";
const subText =
  "Your Items are still in Your Cart if you wish to purchase in the future";

function PaymentFailure() {
  const { bookingId } = useParams();
  //when setting up the stripe session the redirect url contains the id of the booking that was
  //temporarily made. We make a delete request to the backend server for this particular doc to be
  //deleted due to cancellation
  useEffect(() => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/booking/${bookingId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bookingId]);
  return <BannerComponent header={headerText} subHead={subText} />;
}

export default PaymentFailure;
