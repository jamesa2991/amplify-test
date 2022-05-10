import Head from 'next/head'
import { API } from 'aws-amplify'
import { listParks } from '../src/graphql/queries'
import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [parks, setParks] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const p = await API.graphql({ query: listParks })
      console.log(p)
      setParks(p.data.listParks.items)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Head>
        <title>National Parks</title>
      </Head>
      <div className="container">
        <h1>
          National Parks <Link href="/create-park">(+)</Link>
        </h1>
        <div className="img-grid">
          {parks?.map((park) => (
            <div key={park.id} className="img-square">
              <h2>{park.name}</h2>
              {/* use the AmplifyS3Image component to render the park's image using its S3 key */}
              <AmplifyS3Image imgKey={park.image.key} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
