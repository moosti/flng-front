import { getLocale } from "next-intl/server";
import LoginForm from "./components/LoginForm";

export default async function Login() {
  const locale = await getLocale();

  return <LoginForm locale={locale} />;
}
