import { getLocale } from "next-intl/server";
import RegisterForm from "./components/RegisterForm";

export default async function Login() {
  const locale = await getLocale();

  return <RegisterForm locale={locale} />;
}
