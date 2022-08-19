type MainLayoutProps = {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      {/* TODO: header */}
      <main>{children}</main>
      {/* TODO: footer */}
    </div>
  );
}

export default MainLayout