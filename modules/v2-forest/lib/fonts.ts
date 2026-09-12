import { Poppins, Sora } from "next/font/google";

// Scoped to the v2 layout so a visitor to another variant never downloads
// these faces. The variable names feed the `font-sora` / `font-poppins`
// utilities defined in app/globals.css.
export const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora-src",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins-src",
  display: "swap",
});
