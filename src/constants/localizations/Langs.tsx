export const DefaultLanguage = "en";

export const SupportedLanguages = [DefaultLanguage, "fr"];

export const Translations: TranslationsType = {
  components: {
    home: {
      apptitle: {
        en: "Public Lands Explorer",
        fr: "Le Navigateur des Terres Publiques",
      },
      loginlink: { en: "Login", fr: "Connexion" },
      registerlink: { en: "Register", fr: "S'inscrire" },
    },
    login: {
      title: { en: "Login", fr: "Connexion" },
      action: { en: "Login", fr: "Se Connecter" },
      email: { en: "Email", fr: "Courriel" },
      password: { en: "Password", fr: "Mot de passe" },
      noaccount: {
        en: "Don't have an account? Register here.",
        fr: "Vous n'avez pas de compte ? Inscrivez-vous ici.",
      },
    },
    register: {
      title: { en: "Register", fr: "Inscription" },
      action: { en: "Register", fr: "S'inscrire" },
      username: { en: "Username", fr: "Nom d'utilisateur" },
      email: { en: "Email", fr: "Courriel" },
      password: { en: "Password", fr: "Mot de passe" },
      confirmPassword: {
        en: "Confirm Password",
        fr: "Confirmer le mot de passe",
      },
      haveaccount: {
        en: "Already have an account? Login here.",
        fr: "Vous avez déjà un compte ? Connectez-vous ici.",
      },
      registrationSuccessMsg: {
        en: "Registration success! Please login.",
        fr: "Vous avez réussi à l'inscription! Veuillez vous connecter.",
      },
    },
    settings: {
      title: { en: "Settings", fr: "Paramètres" },
      logout: { en: "Logout", fr: "Se déconnecter" },
    },
    landsmap: {
      title: { en: "Lands Map", fr: "Carte des terres" },
    },
    downloads: {
      title: { en: "Downloads", fr: "Des Téléchargements" },
    },
  },
};

export type SupportedLanguageType = "en" | "fr";

type TranslationsType = {
  components: {
    [key: string]: {
      [key: string]: {
        en: string;
        fr: string;
      };
    };
  };
};
