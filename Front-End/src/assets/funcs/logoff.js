import Cookies from "js-cookie";

export const Logoff = () => {
    Cookies.remove("token");
    window.location.href = "/login";
}