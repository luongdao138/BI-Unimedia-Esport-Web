import { NextPage } from 'next'
import MainLayout from '@/layouts/MainLayout'
import PlainLayout from '@/layouts/PlainLayout'
import AuthenticationLayout from '@/layouts/AuthenticationLayout'
import StreamLayout from '@/layouts/StreamLayout'

// add stream layout type
type PageWithStreamLayoutType = NextPage & { Layout?: typeof StreamLayout }

type PageWithMainLayoutType = NextPage & { Layout?: typeof MainLayout }

type PageWithPlainLayoutType = NextPage & { Layout?: typeof PlainLayout }

type PageWithAuthLayoutType = NextPage & { Layout?: typeof AuthenticationLayout }

// add layout type for live stream feature
type PageWithLayoutType = PageWithStreamLayoutType | PageWithMainLayoutType | PageWithPlainLayoutType | PageWithAuthLayoutType

export default PageWithLayoutType
