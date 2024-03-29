import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const {data, error} = useQuery(ME_QUERY, {skip: !hasToken})
  console.log(data, error);
  useEffect(() => {
    if (data?.me === null) {
      logUserOut()
    }
  }, [data]);
  return {data};
}

export default useUser;