import { GetStaticProps } from 'next'
import Head from 'next/head'
import { FC } from 'react'
import useSWR from 'swr'
import { fetch } from '../libs/polyfil/fetch'
import { WPPost } from '../libs/wpapi/interfaces'
import { WPAPIURLFactory } from '../libs/wpapi/UrlBuilder'
import { PostArchives } from '../components/archives/Posts';
import { Divider, PageHeader } from 'antd'
import styles from '../styles/Home.module.css'
const urlBuilder = WPAPIURLFactory.init(
  process.env.WORDPRESS_URL,
).postType('posts').startAt(1).perPage(50).withEmbed()


export const Home:FC<{
  posts: WPPost[]
}> = ({posts: initialProps}) => {
  const {data: posts} = useSWR<Array<WPPost>>(urlBuilder.getURL(), fetch, {initialData: initialProps})
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

    </div>
  )
}


export const getStaticProps: GetStaticProps<{
  posts: WPPost[]
}> = async () => {
  const url = urlBuilder.getURL()
  const posts = await fetch(url)
  return {
    props: {
      posts
    }
  }
}

export default Home