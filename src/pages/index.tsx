import type { NextPage } from 'next'
import Layout from '../components/layouts/Layout'
import SearchBar from '../components/elements/SearchBar'

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="flex justify-center items-center w-full h-screen">
          <div className="m-auto w-full text-center">
            <h1 className="pb-12 text-6xl font-semibold">ICU</h1>
            <div className="flex justify-center items-center w-full">
              <div className="flex justify-center items-center w-full">
                <div className="m-auto w-1/3">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
