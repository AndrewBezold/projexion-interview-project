Task:
Create a frontend react app with the following requirements:

    Configure GraphQL using the following endpoint https://staging.api.constellation.academy/api/graphql 
    A user can login using a login form (mutation Auth { loginJwt })
    After login, a user sees their user name and a list of ContentNodes (query Admin { Tree { GetContentNodes } }). The name of the node is available under node.structureDefinition.title
    A user can log out

Bonus points:

    functional components and sensible use of React hooks
    Lazy loading on scroll for the node list (if there's not enough nodes in the system, you can make an individual row 30vh tall)
    Performance optimization with the assumption that the node list can be very long
    Advanced: sorting of the list via drag and drop

Programming languages:

    Frontend using Javascript or Typescript and React.JS
    Data storage, if necessary, in local storage

What are we looking for:

    high levels of code quality
    test coverage
    production ready code - please develop as you would in your day to day work at PROJEXION
    please submit the test using a public github repository with testing instructions
    please provide us with a timeline by which we can expect the submission


axios had difficulties with jest, so just using fetch instead
react-list-lazy-load is unmaintained, so using TanStack Virtual instead
using DndContext for drag and drop sorting



- single page
- if not logged in, show login form
- if logged in, show username and list of ContentNodes and logout button

tests
- test login gets jwtToken
- test jwtToken retrieves ContentNodes
- test lazy loading works
- test drag and drop?
  - did not test drag and drop, because could not get drag and drop working properly