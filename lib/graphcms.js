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
 * While sorting for now is handled in the UI (client) there is a
 * mechanism in which to pass the default sort type and direction
 * (which happens on page load) over to the GraphQL query body.
 * 
 * To do this, pass either of the two sortBy property options above as 
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
    {$sortMethod: sortMethod}
  )

  return data.shows
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
