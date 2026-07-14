import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import "./App.css";

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const account = accounts[0];

  const signIn = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Microsoft sign-in failed:", error);
    }
  };

  const signOut = async () => {
    try {
      await instance.logoutRedirect({
        account,
        postLogoutRedirectUri: window.location.origin,
      });
    } catch (error) {
      console.error("Microsoft sign-out failed:", error);
    }
  };

  return (
    <main className="app">
      <section className="card">
        <p className="eyebrow">Travel Budget</p>

        <h1>Budget Viewer</h1>

        {!isAuthenticated ? (
          <>
            <p>
              Sign in with your Microsoft account to view your travel
              budget.
            </p>

            <button type="button" onClick={signIn}>
              Sign in with Microsoft
            </button>
          </>
        ) : (
          <>
            <p>You are signed in successfully.</p>

            <div className="account">
              <strong>{account?.name ?? "Microsoft user"}</strong>
              <span>{account?.username}</span>
            </div>

            <button type="button" onClick={signOut}>
              Sign out
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default App;