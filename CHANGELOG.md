# 0.1.17

- Babel has been updated to 6.6.0

  One of the notable changes is that semicolon is no longer required
  after class property definition.


- Redux and other complementing redux dependencies were updated
  to the latest versions.

- Redux-Saga has been updated to 0.9.2

  **Important changes**

    - `takeEvery` and `takeLast` high-level API was introduced. This is a much easier way to avoid missing action requests (normally handled with `take`/`fork` before)
    - **Breaking:** `as` has been renamed to `asEffect`


- `PORT` environment variable has been added to allow configuring
  webpack dev server's port (Thanks to Chris Morrell @inxilpro)

- **Bugfix:** .jsx file extension is recognized now (Thanks to Michael Joseph Rosenthal @michaeljosephrosenthal)

# Previous releases

Changelog wasn't maintained before 0.1.17
