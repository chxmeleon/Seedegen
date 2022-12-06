import type { NextPage } from 'next'
import Layout from '../components/layouts/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="m-auto w-full text-center">
          home
        </div>
      </div>
    </Layout>
  )
}

export default Home
