import { ShowToastContext } from "@/context/ShowToastContext";
import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/router';

const Toast = ({msg}) => {
    const {showToastMsg, setShowToastMsg}=useContext(ShowToastContext);
    const router = useRouter();

    useEffect(() => {
        setInterval(() => {
            setShowToastMsg(null);
            router.reload()
        }, 1000)
    }, [showToastMsg])

  return (
    <div className="toast toast-center">
      <div className="alert alert-success">
        <span>{msg}</span>
      </div>
    </div>
  );
};

export default Toast;
