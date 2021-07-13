let user = sessionStorage.getItem("user");

const AuthHeaders = {
    "Content-Type": "application/json",
    Authorization: `Basic ${user}`,
};

export default AuthHeaders;