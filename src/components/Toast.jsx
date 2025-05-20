import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Toast = () => {
  const notify = () => {
    toast.success(Msg, {
      data: {
        title: "Joueur ajouté !",
        text: "Le joueur a bien été ajouté !",
      },
    });
    toast.error(Msg, {
      data: {
        title: "Erreur...",
        text: "Le joueur n'a pas pu être ajouté, vérifiez...",
      },
    });
  };

  return <div></div>;
};

export default Toast;
