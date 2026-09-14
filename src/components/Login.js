
import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import Header from "./Header";
import checkValidData from "../utils/validate";


const Login = () => {
    const navigate = useNavigate();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const fullName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = async (event) => {
        event.preventDefault();

        const validationError = checkValidData(
            email.current.value,
            password.current.value,
            isSignInForm ? undefined : fullName.current.value
        );

        setErrorMessage(validationError || "");
        setSuccessMessage("");

        if (validationError) {
            return;
        }

        try {
            if (isSignInForm) {
                await signInWithEmailAndPassword(
                    auth,
                    email.current.value.trim(),
                    password.current.value
                );
                setSuccessMessage("Signed in successfully.");
                navigate("/browse");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email.current.value.trim(),
                password.current.value
            );
            await updateProfile(userCredential.user, {
                displayName: fullName.current.value.trim()
            });
            setSuccessMessage("Account created. You can now sign in.");
            setIsSignInForm(true);
        } catch (error) {
            const firebaseMessages = {
                "auth/email-already-in-use": "This email is already registered.",
                "auth/invalid-credential": "Incorrect email or password.",
                "auth/invalid-email": "Please enter a valid email address.",
                "auth/weak-password": "Password must be at least 6 characters."
            };
            setErrorMessage(firebaseMessages[error.code] || "Authentication failed. Please try again.");
        }
    }
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div>
            <Header />
            <div>
                <img ></img>
            </div>

            <form onSubmit={handleButtonClick} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded" >
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        type="text"
                        ref={fullName}
                        placeholder="Full Name"
                        className="p-4 my-4 w-full bg-gray-700"
                    />
                )}
                <input type="text"
                    ref={email}
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-gray-700" />


                <input type="Password"
                    ref={password}
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700" />

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <button type="submit" className="p-4 my-6 bg-red-700 w-full rounded-lg">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now"
                        : "Alreday registered? Sign In Now."}
                </p>
            </form>

        </div>
    )
}
export default Login;