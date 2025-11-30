import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-right" />
      <Header />
      {children}
      <Footer />
    </>
  );
}


