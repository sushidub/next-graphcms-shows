import { useState } from 'react'
import Layout from '@c/Layout'
import { Grid, List, Card } from '@c/Grid'
import { Title } from '@c/Title'
import { getAllShows } from '@l/graphcms'

export default function Shows({ shows }) {
  const [ showsDisplayState, setShowsDisplayState ] = useState(true); // true = Grid, false = List

  function ToggleBtn() {
    return (
      <div>
        <input className="toggle-btn" type="checkbox" value={showsDisplayState} onChange={setShowsDisplayState(!showsDisplayState)} />
      </div>
    );
  }

  return (
    <Layout title="next-graphcms-shows / Shows">
      <Title>Shows</Title>

      <ToggleBtn showState={showsDisplayState} />
      {!showsDisplayState &&
        <List>
          {shows.map(show => (
            <li href={`/show/${show.slug}`} header={show.title} key={show.id}>
              <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
            </li>
          ))}
        </List>
      }

      {showsDisplayState &&
      <Grid>
        {shows.map(show => (
          <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
            <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
          </Card>
        ))}
      </Grid> }
    </Layout>
  )
}

export async function getServerSideProps() {
  const shows = (await getAllShows()) || []
  return {
    props: { shows },
  }
}
