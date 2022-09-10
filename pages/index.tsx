import type { NextPage } from 'next'
import { useQuery } from 'react-query'
import Link from "next/link"


const Home: NextPage = () => {

  return (
    <div className="">
      <div className="flex">
        <div>
          <h1 className="font-bold text-6xl">
            Die wahrscheinlich coolste Kellerbar in Linz
          </h1>
        </div>
        <div>
          <div>{!isLoading && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
          <Link href="/user-interface/">
            <a>App</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home
