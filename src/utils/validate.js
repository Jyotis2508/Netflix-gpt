const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const fullNameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{8,}$/;

const checkValidData = (email = "", password = "", fullName) => {
	if (fullName !== undefined && !fullNameRegex.test(fullName.trim())) {
		return "Please enter your full name.";
	}

	if (!emailRegex.test(email.trim())) {
		return "Please enter a valid email address.";
	}

	if (!passwordRegex.test(password)) {
		return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
	}

	return null;
};

export default checkValidData;