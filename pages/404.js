import Layout from '@c/Layout'

export default function Custom404(str) {
  return (
    <Layout title="next-graphcms-shows / 404" maxWidth="900px">
      <h1 style={{fontSize:"5rem",fontWeight:"lighter",margin:"0"}}>404</h1>
      <blockquote>It's not your fault Wil</blockquote>
    </Layout>
  )
}