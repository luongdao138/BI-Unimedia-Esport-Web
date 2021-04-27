import Link from 'next/link'

const HomePage: React.FC = () => {
  return (
    <main>
      <h1>Hello, world!</h1>
      <Link href="/login">
        <a>login</a>
      </Link>
    </main>
  )
}

export default HomePage
