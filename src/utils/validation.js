const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Invalid name");
    }
};

module.exports = {
    validateSignupData,
}