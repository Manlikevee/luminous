import { Inter } from "next/font/google";
import "./globals.css";
import 'material-symbols';
const inter = Inter({ subsets: ["latin"] });
import { Toaster, toast } from 'sonner'
import { VeeContextProvider } from "@/components/Chatcontext";
export const metadata = {
  title: "Luminout | LightStore - Quality Lighting Solutions",
  description: "Discover a wide range of lighting solutions at LightStore. From elegant chandeliers to modern LED fixtures, we have everything to brighten your home or office. Shop now for quality lights at affordable prices.",
  keywords: 'LightStore, lighting solutions, chandeliers, LED fixtures, home lighting, office lighting, affordable lights, quality lights, modern lighting, elegant lighting, lighting store',

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
   
      <body className={inter.className}>
      <VeeContextProvider>
        {children}
        <Toaster className="custom-toaster" richColors position="top-right" />
        </VeeContextProvider>


      </body>
    </html>
  );
}
