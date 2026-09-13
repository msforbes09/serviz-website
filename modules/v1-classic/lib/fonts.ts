import { Orbitron, Poppins } from "next/font/google";

// One weight, for the SERBIZ wordmark only. The print logo is a heavy, wide,
// squared sans; Orbitron's black weight is the nearest Google face with real
// mass. Michroma matched the shape better but ships one light weight and read
// thin beside the mark.
export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-orbitron-src",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins-src",
  display: "swap",
});
