# Store

The store directory contains all our Redux code. The store is responsible for
maintaining a single centralized state for the application.

## Directory structure

The store uses a file structure similar to the 'Ducks' pattern:
https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-or-ducks

Each feature or part of the state has a single file which is responsible for
providing a reducer, actions, and selectors.


### Normalized state

As is recommended, the state is fully normalized. This means that there is no
nested data in the state.


### Middleware

The middleware scripts take large nested api responses and split them into
normalized data. The normalized data is then dispatched using numerous actions.


### Create Entity Adapter

https://redux-toolkit.js.org/api/createEntityAdapter

Each feature file in the store makes use of the `createEntityAdapter` function
which provides a common structure to each entity type. Each feature has the
structure, `{ entities: {}, ids: [] }` where `entities` is an object which stores
each instance using the instance's ID as a key and `ids` is an array of IDs
which handles the ordering of the entities.

`createEntityAdapter` provides helpful pre-built reducers and selectors which
make basic CRUD operations on the normalized data more manageable.


### API interactions

The react code does not interact directly with the service. Instead, actions
are dispatched and the store takes responsibility for interacting with the
service and updating the state accordingly.

Interactions with the service are managed using the `createAsyncThunk`
function: https://redux-toolkit.js.org/api/createAsyncThunk
