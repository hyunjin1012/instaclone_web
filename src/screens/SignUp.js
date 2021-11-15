import { gql, useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import routes from "../routes";
import BottomBox from "../components/auth/BottomBox";
import { FormBox } from "../components/auth/FormBox";
import { Button } from "../components/auth/Button";
import { Input } from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError"

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();

  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    history.push(routes.home, {
      message: "Account created. Please log in",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const { register, handleSubmit, formState, setError, clearErrors, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  const clearSignUpError = () => {
    clearErrors("result")
  }

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <Button>
          <FontAwesomeIcon icon={faFacebookSquare} size="1x" /> Log in with
          Facebook
        </Button>
        <Separator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", { required: "First name is required." })}
            type="text"
            placeholder="First name"
            hasError={Boolean(formState.errors?.firstName?.message)}
          />
          <FormError message={formState.errors?.firstName?.message} />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last name"
          />
          <Input
            {...register("email", { required: "Email is required." })}
            type="text"
            placeholder="Email"
            hasError={Boolean(formState.errors?.email?.message)}
            onFocus={clearSignUpError}
          />
          <FormError message={formState.errors?.email?.message} />
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
            onFocus={clearSignUpError}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register("password", { required: "Password is required." })}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button type="submit" disabled={!formState.isValid || loading}>
            {loading ? "Loading..." : "Sign up"}
          </Button>
          <FormError message={formState.errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.logIn} />
    </AuthLayout>
  );
}

export default SignUp;
