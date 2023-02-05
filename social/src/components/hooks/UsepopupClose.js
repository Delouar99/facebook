import { useEffect } from "react";

const UsepopupClose = (ref, setRef) => {
  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      if (ref.current && !ref?.current?.contains(e.target)) {
        setRef(false);
      }
    });
  }, [ref]);
};

export default UsepopupClose;
