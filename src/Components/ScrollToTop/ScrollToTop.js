import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen((x) => {
      // if (!x.hash.includes("#")) {
      //   window.scrollTo(0, 0);
      // } else {
      //   let divID = x.hash;
      //   console.log(divID);
      //   let elmnt = document.querySelector(divID);
      //   console.log(elmnt);
      //   // elmnt.scrollIntoView();
      // }
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
