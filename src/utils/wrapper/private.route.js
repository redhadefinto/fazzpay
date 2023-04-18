import Loaders from "@/components/Loaders";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const privateRoute = (WrappedComponent) => {
  const Auth = (props) => {
    const dataArray = useSelector((state) => state.auth.data.data);
    const router = useRouter();
    useEffect(() => {
      if (!dataArray) {
        router.push("/login");
      }
    }, [dataArray, router]);

    if (dataArray) {
      return <WrappedComponent {...props} />;
    }
    return <Loaders />;
  };

  return Auth;
};

export default privateRoute;
