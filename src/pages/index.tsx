import FilterBox from '@/components/home/FilterBox'
import Hotels from '@/components/home/Hotels'
import Head from 'next/head'
import { dummyData } from "@/dummy"

export default function Home() {
  console.log(dummyData)
  return (
    <>
      <Head>
        <title>Lobby - Home</title>
        <meta name="description" content="A Hotel seaching and booking ap" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-full py-7'>
          <FilterBox />
          <div className='w-full px-3 md:px-10 bg-gray-100 py-3 grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {dummyData.businesses.map((hotel, index) => (
              <Hotels data={hotel} key={index} />
            ))}
          </div>
      </main>
    </>
  )
}

// grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8