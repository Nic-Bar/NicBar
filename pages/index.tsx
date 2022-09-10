import type { NextPage } from 'next'
import { useQuery } from 'react-query'

async function fetchConsumables() {
  const res = await fetch("/api/consumable")
  return res.json()
}
const Home: NextPage = () => {
  const { data, isLoading } = useQuery('users', fetchConsumables);

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
        </div>
      </div>
    </div>
  );
}

export default Home
