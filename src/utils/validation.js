const validateSignupData = (userObj) => {
    const {firstName, lastName, emailId, password} = userObj;
    if(!firstName || !lastName){
        throw new Error("Invalid name");
    }
};

const validateEditProfileData = (req) => {
    const allowedData = ["age","skills"];
    const isAllowed = Object.keys(req.body).every(field => allowedData.includes(field));
    return isAllowed;
}

module.exports = {
    validateSignupData,
    validateEditProfileData
}