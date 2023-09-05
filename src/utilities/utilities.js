export const getToken = () => {
      return JSON.parse(localStorage.getItem("token"));
};

export const toastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
};

export const colorRingOptions = {
      visible: true,
      height: "80",
      width: "80",
      ariaLabel: "blocks-loading",
      wrapperClass: "blocks-wrapper",
      colors: ["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"],
};
