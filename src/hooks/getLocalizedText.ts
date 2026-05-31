import {
  DefaultLanguage,
  SupportedLanguages,
  SupportedLanguageType,
  Translations,
} from "@/constants/localizations/Langs";
import { getLocales } from "expo-localization";

const locales = getLocales();

let langCode = locales[0].languageCode;

if (langCode === null || !SupportedLanguages.includes(langCode)) {
  langCode = DefaultLanguage;
}

/* Ça veut dire que le code de la langue va être chargé seulement une fois.
 Il va falloir redémarrer l'appli après avoir changé la langue dans les paramètres */
const LANG_CODE = langCode as SupportedLanguageType;

export function getLocalizedText(
  component: string,
  identifier: string,
): string {
  return Translations.components[component][identifier][LANG_CODE];
}
