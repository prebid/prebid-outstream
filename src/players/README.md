# How to add a new player support
At a high level, a player adapter is responsible for:
1. Providing support for VAST specification.
2. Play the outstream video Ad.
3. Implementing functions mentioned in GenericPlayer class.

This page has instructions for writing your own player adapter. The instructions here try to walk you through some of the code you’ll need to write for your adapter. When in doubt, use [the working adapters in the GitHub repo](https://github.com/prebid/prebid-outstream/blob/master/src/players/fluid-player/FluidPlayer.js) for reference.

## Contributing
Contributions are always welcome. To contribute, [fork](https://help.github.com/articles/fork-a-repo/) prebid-outstream, commit your changes, and [open a pull request](https://help.github.com/articles/using-pull-requests/) against the master branch.

Before a Pull Request will be considered for merge:

- All new and existing tests must pass
- Added or modified code must have greater than 80% coverage

## Steps to integrate a new player
1. Before, proceding ahead, please make sure that it is not already available, if not create a new folder in *src/players* with the player and plugin name combination.
2. Create a new class for this player-plugin combination by extending *GenericConfiguration* class.
3. Import the player/plugin in this class. You can use them as an NPM package or include its code as a library in this newly created folder.
4. Implement all the methods mentioned in the *GenericConfiguration* class. Don't forget to provide a concrete implementation for each of these methods otherwise an error will be thrown.
4. If needed, create additional classes and methods. Also, write the unit test cases for the newly created code.
5. Create a new unique name like *FLUID_PLAYER* to identify this new player-plugin combination.
6. Do a conditional import of the new player class depending on the value of *SELECTED_PLAYER* environment variable in the import section of *PlayerFactory.js* file.
7. Mention its entry in *PlayerFactory* class constructor function's switch statement and return its instance.
8. To use this new player-plugin combination as a base player for the project, assign this new unique name generated in step #5 to *SELECTED_PLAYER* environment variable.
9. Insert this new player entry in [README.md](https://github.com/prebid/prebid-outstream/blob/master/README.md)


*Note 1:* Before raising the PR, please make sure the license of the player/plugin is compatible with the project.
