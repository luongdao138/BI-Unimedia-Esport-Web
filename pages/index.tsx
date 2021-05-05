import Link from 'next/link'
import MainLayout from '@layout/MainLayout'

const HomePage = () => {
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

HomePage.Layout = MainLayout

export default HomePage
