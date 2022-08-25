import Header from "../header/Header"

type MainLayoutProps = {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Header></Header>
      <main>{children}</main>
      {/* TODO: footer */}
    </div>
  );
}

export default MainLayout