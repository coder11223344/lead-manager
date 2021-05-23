#Implementation Approach
##Front End
The UI has been implemented using `BootStrap React components`

Functionality
- Clicking on `Accept` button moves the lead to the `Accepted` tab
- Clicking on `Decline` button removes the lead from `Invited` tab. And the lead does not render in `Accepted` tab as well

##Back End
There were issues with running the provided `docker boilerplate` on my local.

So, I use `localStorage` for persisting data. And I've implemented a module `mockAPI`, that reads/writes from `localStorage` in `async` fashion (using `setTimeout`), to mock API calls. Replacing `setTimeout` with real api end point call would work as well.