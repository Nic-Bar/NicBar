import Link from "next/link"

function Header() {
  return (
    <header>
        <Link href="/">
          <a>
            <h1 className="bg-black text-white text-3xl">NicBar</h1>
          </a>
        </Link>
    </header>
  );
}

export default Header