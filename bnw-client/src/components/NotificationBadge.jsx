import React from "react";
import styled from "styled-components";

const MyBadge = styled.div`
  background-color: gray;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  right: -5px;
  top: -7px;
`;

const BadgeContainer = styled.div`
  position: relative;
  overflow: visible;
  display: flex;
  color: white;
  cursor: pointer;
`;

const NotificationBadge = ({ materialUI, notificationNumber }) => {
  return (
    <BadgeContainer>
      {materialUI}
      {notificationNumber !== "0" && <MyBadge>{notificationNumber}</MyBadge>}
    </BadgeContainer>
  );
};

export default NotificationBadge;
