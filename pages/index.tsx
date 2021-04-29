import Link from 'next/link'

const HomePage: React.FC = () => {
  return (
    <main>
      <h1>Hello, world!</h1>
      <Link href="/login">
        <a>login</a>
      </Link>
      <br />
      <Link href="/register">
        <a>register</a>
      </Link>
      <br />
      <Link href="/forgot-password">
        <a>forgot password</a>
      </Link>
    </main>
  )
}

export default HomePage
