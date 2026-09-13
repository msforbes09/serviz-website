import { Michroma, Poppins } from "next/font/google";

// One weight (its only one), for the SERBIZ wordmark in the nav bar. Michroma
// is the closest Google face to the print logo's wide, squared, futuristic
// sans; Orbitron and Audiowide were the other two shown to the user.
export const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-michroma-src",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins-src",
  display: "swap",
});
