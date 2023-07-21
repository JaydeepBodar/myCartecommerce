const Validations = (input) => {

    const errors = {};

    if (!input.street) {
        errors.street = "street is required";
    }

    if (!input.city) {
        errors.city = "city is required";
    }

    if (!input.state) {
        errors.state = "state is required";
    } 
    if (!input.country) {
        errors.country = "country is required";
    } 
    if (!input.phoneNo) {
        errors.phoneNo = "phoneNo is required";
    } else if (/^[0-9]{10,10}$/.test(input.email)) {
        errors.email = "mobile number numeric and must 10 digit";
    }

    if (!input.zipcode) {
        errors.zipcode = "zipcode is required";
    } else if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(values.password)) {
        errors.password = "Password must be at least 7 characters long with special characters and numbers";
    }

    return errors;
}

export default Validations