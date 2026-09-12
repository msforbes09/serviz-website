import { Outfit, Poppins } from "next/font/google";

// One weight, for the name in the nav bar only: the same setting as v3's bar.
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-outfit-src",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins-src",
  display: "swap",
});
