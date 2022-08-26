import Footer from "../Footer/Footer";
import Header from "../header/Header"


type MainLayoutProps = {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout