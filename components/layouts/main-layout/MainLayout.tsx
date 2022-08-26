import Footer from "../Footer/Footer";
import Header from "../header/Header"


type MainLayoutProps = {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout bg-almostBlack text-white flex flex-col h-screen justify-between">
      <Header></Header>
      <main className="mb-auto h-10">{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout