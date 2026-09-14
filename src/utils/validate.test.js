import checkValiddata from "./validate";

test("returns null for valid sign-in data", () => {
	 expect(checkValiddata("user@example.com", "StrongPass1!")).toBeNull();
});

test("returns an error for an invalid email", () => {
	 expect(checkValiddata("invalid-email", "StrongPass1!")).toBe(
		"Please enter a valid email address."
	 );
});

test("returns an error for a weak password", () => {
	 expect(checkValiddata("user@example.com", "password")).toBe(
		"Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
	 );
});

test("returns an error for an invalid full name", () => {
	 expect(checkValiddata("user@example.com", "StrongPass1!", "User123")).toBe(
		"Please enter your full name."
	 );
});

test("returns null for valid sign-up data", () => {
	 expect(checkValiddata("user@example.com", "StrongPass1!", "User Example")).toBeNull();
});