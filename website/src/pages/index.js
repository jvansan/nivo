import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const IndexPage = () => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>nivo</h1>
    </Layout>
)

export default IndexPage
