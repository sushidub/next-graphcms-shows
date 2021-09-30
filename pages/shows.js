import { useState } from 'react'
import Layout from '@c/Layout'
import { Grid, Card } from '@c/Grid'
import { List, ListItem } from '@c/List'
import { Title } from '@c/Title'
import { getAllShows } from '@l/graphcms'
import { formatDate } from '@l/utils'

export default function Shows({ shows }) {

  const [ showsDisplayState, setShowsDisplayState ] = useState(true); // true = Grid, false = List
  
  function onToggleBtnChange(e) {
    setShowsDisplayState(e.target.checked);
  }

  const ToggleBtn = (props) => {
    return <input id="toggleDisplayState" name="toggledisplaystate" className="toggle-btn" type="checkbox" checked={props.displayState} onChange={onToggleBtnChange} />;
  }

  return (
    <Layout title="next-graphcms-shows / Shows">
      <Title>Shows</Title>

      <ToggleBtn displayState={showsDisplayState} />

      {!showsDisplayState &&
        <List>
          {console.log(shows)}
          {shows.map(show => (
            <ListItem href={`/show/${show.slug}`} header={show.title} key={show.id}>
              <div className="show-docket">{show.artists.map(({ fullName }) => fullName).join(', ')}</div>
              <span className="show-date-start">{formatDate(show.scheduledStartTime,{timeZoneName:"MST"})}</span>
            </ListItem>
          ))}
        </List> }

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
