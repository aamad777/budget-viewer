import type {
  Configuration,
  RedirectRequest,
  SilentRequest,
} from "@azure/msal-browser";

const budgetViewerClientId =
  "75deb615-48d8-4acf-9a9e-39229ba522e6";

const tenantId =
  "ee45b852-058d-432a-8ecb-0905921660ea";

const travelBudgetApiClientId =
  "291d1b94-5370-496c-8e69-4a7d80ff4b04";

export const msalConfig: Configuration = {
  auth: {
    clientId: budgetViewerClientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
};

export const budgetReadScope =
  `api://${travelBudgetApiClientId}/Budget.Read`;

export const loginRequest: RedirectRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    budgetReadScope,
  ],
};

export const tokenRequest: Omit<
  SilentRequest,
  "account"
> = {
  scopes: [budgetReadScope],
};