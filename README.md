# Final Fantasy XV Quests & Hunts tracker

## TODO

[x] Store information in local storage
[x] Remember completed when updating data
[x] Add correct header based on sort in QuestList
[x] Header title based on what's displayed (side quests or hunt)
[ ] Link to quest on IGN
[ ] Data generator should have a switch to use either fixtures or live website
[x] Add Hunts
    [x] Generify the components/QuestList into a components/CompletableListView
    [x] constants/QuestFilters into Filters (app should not be big enough to be a problem)
    [x] containers/App aware of quests/hunts and use it dispatch to correct action (handleQuestShow(filter) -> handleShow(kind, filter))
[ ] Improve performance when rendering items in list
[ ] Refactor (merge) Hunts and Side Quests implementation (actions/reducers/containers are practically the same)
[ ] Load Hunts and Side Quests as two separate JSON (let update one without the other)

## Usage

### Package installation
```bash
$ npm install
```

### Use development server
For development server, webpack-dev-server is reasonable. It monitors update files and rebuild them automatically. Since the webpack cli command is registerd in `package.json` in this project, just type the following command to run webpack-dev-server:

```bash
$ npm start
```

Be careful! The webpack-dev-server rebuilds files in `src` automatically but the bundled files are just placed on its memory. Build manually by allowing next section (Build assets), if you want need the bundled files.


### Build assets
To put compiled files into `static` directory, type the following command.

```bash
$ npm run build
```

### Publish to GitHub page

```bash
$ npm run publish
```

## Tools

In case I forgot, this is based on https://github.com/takanabe/react-redux-material_ui-boilerplate and use the following tools and frameworks:

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Material UI](http://material-ui.com/#/)
* [webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)
* [ESLint](http://eslint.org/)