async function fetchAPI(query, variables = {}) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID)
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

/**
 * Retrieve all shows via GraphQL
 * 
 * The following sortBy properties [scheduledStartTime, title] are
 * provided in the UI that invokes this request.
 * Both options subsequently have a directional option (e.g: ASC, DESC).
 * 
 * While the lightweight sorting is handled just fine on client there is a
 * mechanism in which to pass any default sort type and direction
 * (which happens on page load) over to the GraphQL query body without the
 * need to update the files here or on server.
 * 
 * To do this, that is - set the default sorting options from the component
 * file, pass either of the two sortBy property options above as 
 * <prop>_<DIR> to the following param:
 * @param {string} sortMethod A valid concantinated graphql orderby value 
 * 
 */
export async function getAllShows(sortMethod="scheduledStartTime_DESC") {

  const data = await fetchAPI(
    `{
      shows(orderBy: ${sortMethod}) {
        id
        title
        scheduledStartTime,
        slug
        artists {
          fullName
          slug
        }
      }
    }`,
    { sortMethod }
  )

  return data.shows
}

export async function getAllArtists(sortMethod="fullName_ASC") {

  const data = await fetchAPI(
    `{
      artists(orderBy: ${sortMethod}) {
        id
        fullName
        slug
      }
    }`,
    { sortMethod }
  )

  return data.artists;
}

/**
 * Retrieve an individual artist details via GraphQL query
 * @param {*} slug Artist slugified full name
 * @returns 
 */
 export async function getArtistBySlug(slug) {
  const data = await fetchAPI(
    `query ($slug: String!) {
      artist(where: {slug: $slug}) {
        id
        fullName
        bio
        genres
        facebookUrl
        instagramUrl
        spotifyUrl
        youTubeUrl
        webUrl
        images {
          url
        }
        shows {
          id
          title
          scheduledStartTime
        }
      }
    }`,
    { slug }
  )
  return data.artist;
}



/**
 * Retrieve a specific show via GraphQL query
 */
export async function getShowBySlug(slug) {
  const data = await fetchAPI(
    `query ($slug: String!) {
      show(where: {slug: $slug}) {
        id
        title
        ticketPrice
        artists {
          id
          bio
          fullName
          facebookUrl
          instagramUrl
          spotifyUrl
          youTubeUrl
          webUrl
          images {
            url
          }
          slug
        }
        description
        genre
        scheduledStartTime
      }
    }`,
    { slug }
  )
  return data.show
}

/**
 * Retrieve certain schema by GraphQL query
 */
export async function getSchemaByName(name) {
  const data = await fetchAPI(
    `query ($name: String!) {
      __type(name: $name) {
        name
        fields {
          name
          description
          type {
            name
            kind
          }
        }
      }
    }`,
    { name }
  )
  return data['__type']
}
