import styled from "styled-components"
import { BaseBox } from "../shared"

export const FormBox = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;

  }
`