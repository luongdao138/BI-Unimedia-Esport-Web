import { NextPage } from 'next'
import MainLayout from '@/layouts/MainLayout'
import PlainLayout from '@/layouts/PlainLayout'

type PageWithMainLayoutType = NextPage & { Layout: typeof MainLayout }

type PageWithPostLayoutType = NextPage & { Layout: typeof PlainLayout }

type PageWithLayoutType = PageWithMainLayoutType | PageWithPostLayoutType

export default PageWithLayoutType
