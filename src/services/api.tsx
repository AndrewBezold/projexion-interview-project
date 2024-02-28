const baseUrl = 'https://staging.api.constellation.academy/api/graphql'

export const login = async (email: string, password: string) => {
  const loginQuery = `mutation {
    Auth {
      loginJwt(input: {email: "${email}", password: "${password}"}) {
        loginResult {
          jwtTokens {
            accessToken,
            refreshToken
          },
          firstLogin
        },
        clientMutationId
      }
    }
  }`;

  const headers = {
    "Content-Type": "application/json",
  };
  return fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: loginQuery
    }),
  }).then((res) => res.json());
}

export const getContentNodes = async (accessToken: string) => {
  const ContentNodesQuery = `query {
    Admin {
      Tree {
        GetContentNodes {
          pageInfo {
            hasNextPage,
            hasPreviousPage,
            startCursor,
            endCursor
          },
          edges {
            node {
              structureDefinition {
                title
              },
              description,
              shortDescription
            },
            cursor
          }
        }
      }
    }
  }`;

  const ContentNodesQuery2 = `query {
    Admin {
      Tree {
        GetContentNodes {
          edges {
            node {
              description
            }
          }
        }
      }
    }
  }`

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`
  };
  return fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: ContentNodesQuery2
    }),
  }).then((res) => res.json());
}

export const getSchema = () => {
  const introspectionQuery = `query {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }
  
  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }
  
  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }
  
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }`;

  const headers = {
    "Content-Type": "application/json",
  };
  return fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: introspectionQuery
    }),
  }).then((res) => res.json());
}
