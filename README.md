# Prebid Outstream Renderer

> A free and open source library for publishers to quickly implement outstream renderer.

This README is for developers who want to use this project to implement outstream renderer.

**Table of Contents**

- [Usage](#Usage)
- [Install](#Install)
- [Development Build](#Developement_Build)
- [Production Build](#Production_Build)
- [Run](#Run)

<a name="Usage"></a>

## Usage (as a npm dependency)

Prebid.js requires an outstream renderer URL in *renderer.url* object and outstream configuration object in *renderer.render* object.

```javascript
renderer: {
    url: 'bundle.js',   // URL of the renderer
    render: function (bid) {
        try {
            setTimeout( ()=>{
                // Object to configure the behaviour of outstream renderer from HTML page.
                var obj = {
                    width: 640,
                    height: 480,
                    vastTimeout: 5000,
                    maxAllowedVastTagRedirects: 3,
                    allowVpaid: false,
                    autoPlay: true,
                    preload: true,
                    mute: false,
                    adText: 'This is sample adtext.'
                }
                // Call to Global object of renderer.
                // Takes bid, element ID and configuration object as parameters
                outstreamPlayer(bid, 'video1', obj);
            }, 3000)

        } catch (e) {
            console.error(e);
            console.error("Error in ad rendering!");
        }
    }
}
```

Outstream renderer can be invoked by calling *window.outstreamPlayer()* function. This function takes three parameters namely *bid* object, *Element ID* where we want to insert the outstream player and an optional configuration object. Outstream renderer will throw an error, if bid object and/or element ID are not provided or an invalid value is provided.

The project allows the user to provide configuration at two levels:
1. Build time.
2. Runtime.

### Build Time Configuration
To provide the configuration at build time use the **.env.development** and **env.production** files for development and production modes respectively. Some of the available options are:

#### Base Player
This project allows user to select the base player of his choice from the available player list. If your favourite player is not available in the supported player list and you are interested in contributing to the project to provide its support, then please refer the document [How to add a new player support](https://github.com/prebid/prebid-outstream/blob/master/src/players/README.md).

The user needs to provide his selected player in **SELECTED_PLAYER** environment variable from the given supported player list.

**Supported Players**
+ `FLUID_PLAYER` - Fluid player
+ `VIDEO_JS` - Video JS

*Note 1:* At present, we only fully support Fluid player as Video JS player is not fully implemented. We are looking for your help in adding support to other major players.

*Note 2:* By default, we are choosing Fluid player as the base player for outstream renderer.

#### Viewability implementation

The video player will only initialize, and start and stop accordingly, if it is in the user's viewport. The way this is implemented can be configured via the `VIEWABILITY_IMPLEMENTATION` environment variable.

**Supported viewability implementations**

+ `GPT_EVENT` – Uses the google publisher-tag's [SlotVisibilityChangedEvent](https://developers.google.com/publisher-tag/reference#googletag.events.slotvisibilitychangedevent). If you use the google publisher tag anyway, this should be your preferred choice.
+ `INTERSECTION_OBSERVER` – Uses the browser's [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Does not support IE11.
+ `MANUAL_SCROLL_CHECK` – This is the default, but should not be your first choice. It is slow and not very performant, but supports IE11 and probably most other  browsers.


### Runtime Configuration
User can provide some configurations to the outstream player on runtime while calling the global function window.outstreamPlayer(). The supported parameters for this are defined in GenericConfiguration class. At present, the following configurations are supported:

+ `width` - Width in pixels. (Default: 640)
+ `height` - Height in pixels. (Default: 480)
+ `vastTimeout` - Time, in milliseconds, to wait for the VAST to load. (Default: 5000)
+ `maxAllowedVastTagRedirects` - Maximum allowed redirects (wrappers). (Default: 3)
+ `allowVpaid` - To enable loading VPAID ads allowVPAID option has to be set to true (false by default).
+ `autoPlay` - When set to true the video will play automatically when the page loads. Please note that this feature may not work on certain browser versions and depends on their AutoPlay Policies. (Default: true)
+ `preload` - Sets the preload parameter on video tag. (Default: true)
+ `mute` - Set this parameter to true to have the video muted by default. (Default: true)
+ `adText` - To set the custom text when an in-stream ad plays. (Default: '' - an empty string)

*Note 1:* Providig these parameters is completely optional, in which case we will use there default values.

*Note 2:* While providing custom values to above parameters, please make sure to provide these values with proper datatype otherwise default values will be used.

<a name="Install"></a>

## Install

    $ git clone https://github.com/prebid/prebid-outstream.git
    $ cd prebid-outstream
    $ npm install

*Note:* You need to have `NodeJS` 12.16.1 or greater installed.

<a name="Developement_Build"></a>

## Build for Development

To build the project on your local machine, run:

    $ npm run start

This runs some code quality checks, starts a web server at `http://localhost:8082/` serving from the project root. We can use **.env.development** file to configure the behaviour.

The *SELECTED_PLAYER* environment variable in the *.env.development* file is used to select the base player for the outstream renderer.

<a name="Production_Build"></a>

## Build for Production

To build the project on your local machine, run:

    $ npm run build

This runs some code quality checks, and builds the project in the project's root *./dist/* folder. *./dist/bundle.js* is the final minified file which needs to be hosted and whose URL should be provided in the renderer.url field.

We can use **.env.production** file to configure the behaviour of the final build.
The *SELECTED_PLAYER* environment variable from the *.env.production* file is used to select the base player for the outstream renderer.

<a name="Run"></a>

## Test locally

To run the unit tests:

```bash
npm run test
```

To generate and view the code coverage reports:

```bash
npm run coverage
```

To generate and view the bundle analyzer and visualizer reports:

```bash
npm run build-analyze
```

By default, console logs will be disabled. To enable console logs for the project pass an integer value between 0 to 5 in *playerDebugLevel* Query param. Significance, of each value of playerDebugLevel Query param is as follows:

| playerDebugLevel         | Significance                                           |
| :------------------------| :-----------------------------------------------------|
| Query param not present. | No logging                                            |
| null/undefined/NaN       | No logging                                            |
| 0                        | No logging                                            |
| 1                        | Will log info level logs.                             |
| 2                        | Will log info and error level logs.                   |
| 3                        | Will log info, error and warn level logs.             |
| 4                        | Will log info, error, warn and debug level logs.      |
| >5                       | Will log info, error, warn, debug and log level logs. |
| Any other invalid value. | No logging                                            |
