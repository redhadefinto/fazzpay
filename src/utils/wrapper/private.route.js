import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const dataArray = useSelector((state) => state.auth.data.data);
  useEffect(() => {
    if (!dataArray) {
      router.push("/login");
    }
  }, [dataArray, router]);

  return <>{children}</>;
};

export default PrivateRoute;
