import styled from "styled-components"

const SNotification = styled.span `
  color: #2ecc71;
  font-weight: 600;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: -18px;
`


function Notification({message}) {
  return message === "" || !message ? null : <SNotification>{message}</SNotification>
}

export default Notification;