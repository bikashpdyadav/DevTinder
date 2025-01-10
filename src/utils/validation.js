const validateSignupData = (userObj) => {
    const {firstName, lastName, emailId, password} = userObj;
    if(!firstName || !lastName){
        throw new Error("Invalid name");
    }
};

module.exports = {
    validateSignupData,
}