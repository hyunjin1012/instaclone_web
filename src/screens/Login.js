import { gql, useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import { Button } from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import { Input } from "../components/auth/Input";
import { FormBox } from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import Notification from "../components/auth/Notification";

const FacebookLogin = styled.div`
  margin-top: 15px;
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;


function Login() {
  const location = useLocation();
  console.log(location)

  const { register, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || ""
    }
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    console.log(data)
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      console.log(token)
      logUserIn(token)
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = () => {
    clearErrors("result")
  }


  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification message = {location?.state?.message} />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register("password", { required: "Password is required." })}
            onFocus={clearLoginError}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button type="submit" disabled={!formState.isValid || loading}>
            {loading ? "Loading..." : "Log in"}
          </Button>
          <FormError message={formState.errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}

export default Login;
