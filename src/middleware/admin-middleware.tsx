import { useNavigate } from "react-router-dom";
import { ToastBuilder } from "../builder/toast-builder";
import { getUserContext } from "../context/user-context";
import { Settings } from "../settings/settings";
import { IChildren } from "../interfaces/children-interface";
import { useEffect } from "react";

export default function AdminMiddleware({ children }: IChildren) {
  const { user } = getUserContext();
  const toastBuilder = new ToastBuilder("NOT AUTHORIZED");
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null || user.userRole != Settings.ADMIN) {
      toastBuilder.failedToast("YOU ARE NOT AUTHORIZED TO USE THIS PAGE");
      navigate("/");
    }
  }, [user]);

  return <>{children}</>;
}
