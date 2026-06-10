import ChatWidget from "@/components/customer/chatWidget";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/customer/Footer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>
      <Footer />
      <ChatWidget/>
    </>
  );
}