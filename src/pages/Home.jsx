import Header from '../components/sections/Header'
import Hero from '../components/sections/Hero'

export default function Home() {
    return (
        <>
            <Header />
            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <Hero />
            </main>
        </>
        
    )
  }