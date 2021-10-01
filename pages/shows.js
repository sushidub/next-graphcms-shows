import { useState, useEffect } from 'react'
import Layout from '@c/Layout'
import { Grid, Card } from '@c/Grid'
import { List, ListItem } from '@c/List'
import { Title } from '@c/Title'
import { getAllShows } from '@l/graphcms'
import { formatDate, sortByProperty } from '@l/utils'

export default function Shows({ shows }) {
  const [ showsDisplayState, setShowsDisplayState ] = useState(true); // true = Grid, false = List
  const [ sortDir, setSortDir ] = useState("DESC");                   // ASC, DESC
  const [ sortProp, setSortProp ] = useState("scheduledStartTime");   // scheduledStartTime, title
  
  // TODO: Why didn't this ever work as expected?
  //
  // useEffect(() => {
  //   let propDir = sortDir === "ASC" ? sortProp : ("-" + sortProp);
  //   shows.sort(sortByProperty(propDir));
  // }, [sortProp]);

  function handleSortPropChange(e) {
    let propDir = sortDir === "ASC" ? e.target.value : ("-" + e.target.value);
    shows.sort(sortByProperty(propDir));
    setSortProp(e.target.value);
  }
  
  // TODO: make this its own component
  function handleOnToggleBtnChange(e) {
    setShowsDisplayState(e.target.checked);
  }

  function handleOnChangeSortDir(e) {
    const newDir = e.target.dataset.sortDir === "ASC" ? "DESC" : "ASC";
    setSortDir(newDir);
  }

  // TODO: make this its own component
  const Select = (props) => {
    
    const options = [
      {name: "Start Time", value: "scheduledStartTime"},
      {name: "Title", value: "title"}
    ];

    return (
      <select
        name="sortedproperty"
        value={props.selectedValue}
        onChange={handleSortPropChange}>
        {options.map( (option,idx) => (
          <option key={idx} value={option.value}>{option.name}</option>
        ))}
      </select>
    )
  }

  const ToggleBtn = (props) => {
    return <input id="toggleDisplayState" name="toggledisplaystate" className="toggle-btn" type="checkbox" checked={props.displayState} onChange={handleOnToggleBtnChange} />;
  }

  // Keeping this guy loosy goosy for now since it has potential
  // for some cool css effects or some of that ripe design from The Geradseth
  const sortDirectionBlock = (
    <span className="shows-sort-dir" data-sort-dir={sortDir} role="button" onClick={handleOnChangeSortDir}>{sortDir}</span>
  );

  return (
    <Layout title="next-graphcms-shows / Shows">
      <Title>Shows</Title>

      <ToggleBtn displayState={showsDisplayState} />

      <Select selectedValue={sortProp} />

      {sortDirectionBlock}

      {!showsDisplayState &&
        <List>
          {shows.map(show => (
            <ListItem href={`/show/${show.slug}`} header={show.title} key={show.id}>
              <div className="show-docket">{show.artists.map(({ fullName }) => fullName).join(', ')}</div>
              <span className="show-date-start">{formatDate(show.scheduledStartTime,{timeZoneName:"MST"})}</span>
              <span className="num-curr-usd">{show.ticketPrice ? show.ticketPrice : ""}</span>
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
    props: { shows }
  }
}
