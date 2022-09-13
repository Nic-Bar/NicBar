import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col sm:flex-row">
        <div>
          <h1 className="font-bold text-6xl">
            Die wahrscheinlich coolste Kellerbar in Linz
          </h1>
        </div>
        <div>
          <Link href="/user-interface/">
            <a>App</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
