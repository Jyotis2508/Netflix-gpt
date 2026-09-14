import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    return (
        <div className="absolute z-10 flex w-full items-start justify-between bg-gradient-to-b from-black px-8 py-2">
            <img
                className="w-44"
                src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-08-21/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="Netflix logo"
            />
            {location.pathname === "/browse" && user?.email && (
                <div className="flex flex-col items-end gap-2">
                    <button
                        type="button"
                        className="text-4xl"
                        aria-label="Open profile"
                        title={user.displayName || user.email}
                    >
                        👤
                    </button>
                    <button
                        type="button"
                        className="rounded bg-red-700 px-3 py-1 text-sm font-semibold text-white"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
export default Header;