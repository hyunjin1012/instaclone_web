import styled from "styled-components"

export const Button = styled.button`
  width: 100%;
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.bgColor};
  text-align: center;
  padding: 8px 0px;
  font-weight: 600; 
  border-radius: 3px;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`