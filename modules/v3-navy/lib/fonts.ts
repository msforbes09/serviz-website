import { Outfit, Poppins } from "next/font/google";

// Scoped to the v3 layout so the other previews never download these faces.
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-outfit-src",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins-src",
  display: "swap",
});
