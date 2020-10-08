import { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

const ScrollToTop: React.FC<any> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default withRouter(ScrollToTop);
