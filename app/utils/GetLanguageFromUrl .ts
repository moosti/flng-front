export const getLanguageFromUrl = (): "fa" | "en" => {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    const lang = path.split("/")[1];
    if (lang === "fa" || lang === "en") {
      return lang;
    }
  }
  return "fa";
};
