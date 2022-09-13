import type { NextPage } from 'next'
import { useQuery } from 'react-query'
import Link from "next/link"
import ConsumeCard from 'components/layouts/ConsumeCard/ConsumeCard'


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
      <ConsumeCard consumable={null}></ConsumeCard>
    </div>
  );
};

export default Home;
