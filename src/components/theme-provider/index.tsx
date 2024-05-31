import { cookies } from "next/headers";

const ThemeProvider = async function () {
  const cookieJar = cookies();
  const theme = cookieJar.get("theme");
};
