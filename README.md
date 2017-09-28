# MyReads Project Iteration 9/28/2017

Swapped state-hardcoded routing into using React Router DOM in order to give the user the
use of the back button, as well as to make pages bookmark-able.

Removed anchor tags, replaced with `<Link>` tags.  Checks of state were replaced with `<Route>` tags.  Entire
app in `index.js` wrapped with `<BrowserRouter>` tag.
