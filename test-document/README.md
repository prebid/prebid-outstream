**Table of Contents**

- [Test Matrix](#Test_Matrix)
- [Test Case](#Test_Cases)
- [Integrate with DFP](#Integrate_with_DFP)
- [Known Defects / Behaviour / workarounds](#KnownDefects)

<a name="Test_Matrix"></a>
# Test Matrix:

## Platforms and Browsers:

| **Platform/Browser** | **Chrome** | **Firefox** | **Edge** | **Safari** |
| --- | --- | --- | --- | --- |
| **Desktop-Windows 10** | Yes | Yes | Yes  | NA |
| **Desktop-MAC** | NA | NA | NA  | Yes |
| **Mobile – Android 10** | Yes | NA | NA  | NA |
| **Mobile – iOS-14** | NA | NA | NA |  Yes |

Prebid Version: v4.4.0

Fluid Player Version: 3.0.4

<a name="Test_Cases"></a>
# Test Cases:

| **Test Scenario** | **Test Case** | **Expected/Steps** |
| --- | --- | --- |
| VAST Support | Support for VAST version 2.0 | Player should be able to render VAST response with given VAST |
| VAST Support | Support for VAST version 3.0 | Player should be able to render VAST response with given VAST |
| VAST Support | Support for VAST version 4.0 | Player should be able to render VAST response with given VAST |
| VAST Support | Invalid vast version: Blank VAST | Console should display appropriate message |
| VAST Support | Invalid vast version: Wrong XML structure of Ad | Console should display appropriate message |
| VAST Support | Support for wrapper VAST (no nested levels of wrapper vast) | Player should be able to render VAST response with given wrapper VAST |
| VAST Support | Support for nested wrapper VAST (wrapper level is lesser than maxAllowedVastTagRedirects) | Player should be able to render nested VAST response with given wrapper VAST.<br> Renderer should be able to render wrapper vast response<br> Here we are considering nested wrapper level is 2 and default maxAllowedVastTagRedirects is 3 |
| VAST Support | Support for nested wrapper VAST more than &#39;maxAllowedVastTagRedirects&#39; levels | Player should not be able to render nested VAST response with more then &#39;maxAllowedVastTagRedirects&#39; levels<br> Please note, maxAllowedVastTagRedirects is 3 and we are giving a wrapper with 4 levels to renderer |
| VAST Support | Verify when maxAllowedVastTagRedirects lesser than number of wrappers present in the response | Player will not get VAST response and video could not be played<br> Verify no creative URL is triggered |
| VPAID Support | Support for VPAID when allowVPAID=True | When allowVPAID = True and VPIAD valid response is given to renderer, video should be rendered |
| VPAID Support | when allowVPAID=False | when allowVPAID=False then renderer should not render VPAID response |
| VPAID Support | Verify default value of allowVPIAD is false | when allowVPAID not mentioned in page then default value False should be considered and video ad should not be rendered |
| VPAID Support | when allowVPAID=Non Boolean value | when allowVPAID=Non Boolean value then default value False should be considered |
| Page Setup | support for single slot single size | Video should be rendered on single slot single size ad unit |
| Page Setup | support for single slot single size with slot refresh | On refresh of adSlot,<br> - Ad should be rendered<br> - All vast events should be triggered<br> - No error should appear in console or network log |
| Page Setup | support for single slot single size on safe frame | Video should be rendered on single slot single size ad unit in safe frame<br> Verify below URL present in network tab<br> https://tpc.googlesyndication.com/safeframe/1-0-37/html/container.html |
| Page Setup | support for multi slot multisize (2 slots 2 sizes) | Video should be rendered on multi slot multi size |
| Page Setup | support for multi slot multisize (2 slots 2 sizes), 2nd slot appears in view after scroll | Video should be rendered on 1st visible slot<br> Video should be rendered on 2nd visible slot after scroll down<br> Rendering should not start on out of the view slot |
| VAST Events (on multiple browser and platforms) | Verify VAST events (test with all 3 vast versions) | Verify below VAST events have been triggered<br> start<br> firstQuartile<br> midpoint<br> thirdQuartile<br> complet<br> impression |
| VAST Events (on multiple browser and platforms) | Verify Error VAST event | Verify Error VAST event have been fired in case of error in rendering<br> Verify Proper error code/message has been given in case of error<br> E.g. Corrupt media file path in vast, we will get 401.<br> http://stagingams.pubmatic.com:8080/openwrap/outsreamrendererprebid/error.html?&amp;er=401 |
| Player Configuration | Verify publisher can set player width &amp; height, also player should display the ad in specified width and height | -Set player width and height in page<br> -Verify that player show the ad as per specified width and height. |
| Player Configuration | Verify that player&#39;s width and height should be auto adjusted as per ad size if specified dimension&#39;s ad is not present | -Set player width and height in page<br> -Verify that player show the ad as per ad&#39;s dimension if there is no matching ad of player&#39;s dimension |
| Player Configuration | Verify default VAST timeout is 5 sec | - Force the node to give VAST response after &#39;5 sec&#39;<br> - Verify that renderer does not play the video after 5 sec |
| Player Configuration | Verify custom VAST Timeout | - Set vastTimeout<br> - Force the node to give VAST response after &#39;vastTimeout&#39;<br> - Verify that renderer does not play the video after vastTimeout |
| Player Configuration | Verify default autoPlay is True | - Verify renderer play the video as soon ad unit come in view point |
| Player Configuration | set autoPlay is False | - Verify publisher can set AutoPlay False<br> - Verify renderer does not auto render/play the video<br> - verify renderer play the video when user click on play button |
| Player Configuration | Verify default preload is True | Verify rederer buffer the video by default |
| Player Configuration | set preload false | Verify renderer does not buffer the video. |
| Player Configuration | Verify default mute is True | Verify renderer is by default mute |
| Player Configuration | Set mute is False | Verify renderer is unmute while rendering the video |
| Player Configuration | Verify default adText is blank | Verify no ad text should appear while rendering the ad |
| Player Configuration | Set adText | Verify publisher can set adText<br> Verify adText render properly in renderer |
| Player Configuration | Set adText (longer text) | Verify publisher can set adText<br> Verify adText render properly in renderer<br> Verify text should not come out of player window and formatting should not disturbed |
| Player Configuration | Mute:TRUE Autoplay:FALSE | Video should not auto play and sound should be in mute |
| Player Configuration | Mute:TRUE Autoplay:TRUE | Video should auto play without sound |
| Player Configuration | Mute:FALSE Autoplay:TRUE | Video should not Auto play as mute is false |
| Player Configuration | Mute:FALSE Autoplay:FALSE | Video should not auto play and volume should be unmuted |
| Player Functionalities | Support for Play and Pause by mouse | Verify video can be play and pause by mouse |
| Player Functionalities | Support for volume adjustment by mouse | Verify volume can be adjusted by mouse |
| Player Functionalities | Support for mute and unmute by mouse | Verify mute and unmute can be done by mouse |
| Player Functionalities | Support for video progress bar | Verify the video play progress bar should be visible<br> Verify user should not be able to forward or rewind the ad/video |
| Player Functionalities | Support for full screen and exit | Verify renderer can go in full screen and can exist from the same |
| Player Functionalities | support for playerExpand and playerCollapse | Verify player can be expand and collapse |
| Player Functionalities | Support for SKIP ad after X minutes | Verify that ad remaining duration appears on bottom right corner of the player<br> Verify SKIP button should be enabled after specified duration and ad can be skipped |
| Player Functionalities | Support for Non SKIPABLE ad | Verify that SKIP option does not appear for non skippable ad |
| Player Functionalities | Support for media type | Verify following formats can be supported<br> MP4, mov, WMV ,FLV , AVI, VPAID(js/swf), 3gpp,MKV |
| Miscellaneous Test Cases | Verify non secure stream URL does not allowed to render by renderer | VAST should have non secure media URL<br> Verify non secure stream URL does not allowed to render by renderer<br> (When page called with https and streaming url is http) |
| Miscellaneous Test Cases | Verify renderer is destroyed after ad is over and no footprint left on UI | Verify there should not be any visible element related to player on page once ad is over. |
| Miscellaneous Test Cases | Verify ad automatically runs if user pause the ad, scroll the renderer out of view point and again bring in view point | Verify ad is playing<br> Scroll up the page till player goes out of view point<br> Verify ad is paused (by listening the audio)<br> Scroll down the page till player come on view point<br> Verify ad resumes |
| Miscellaneous Test Cases | Navigate to ad link | If user clicks on ad then user navigates to ad provider page and ad should pause |
| Miscellaneous Test Cases | web page should come out from full screen mode automatically | Verify if ad is completed in full screen mode then full screen mode should come out automatically once ad is over |
| Miscellaneous Test Cases | Verify default player | If publisher does not specify any player in SELECTED\_PLAYER then by default fluid player should be picked |
| Miscellaneous Test Cases | Verify logLevels | By default, console logs will be disabled. To enable console logs for the project pass an integer value between 0 to 5 in \*playerDebugLevel\* Query param. Significane, of each value of playerDebugLevel Query param is as follows:<br> Query param not present = no logging<br> null/undefined/NaN = no logging<br> 0 =no logging<br> 1=info level<br> 2=Info and Error<br> 3=info, error and warn level<br> 4=log info, error and warn, debug level<br> 5= nfo, error, warn, debug and log |
| Miscellaneous Test Cases | Verify values for below params given in double quote :width,height,vastTimeout,maxAllowedVastTagRedirects,allowVpaid,autoPlay,preload,mute,adText | Default value should be considered for all parameters |
| Miscellaneous Test Cases | Bid object is not passed to the renderer | In console error should be like &quot;ReferenceError: obj is not defined&quot; |
| Miscellaneous Test Cases | Verify when incorrect slot has passed to outsream renderer function | In console error should be like &quot;Error: Please provide a valid element ID.&quot; |
| Miscellaneous Test Cases | Verify when incorrect obj passed to outstream renderer function | In console error should be like &quot;bid1 is not defined&quot;<br> Error should be in console as &#39;Error in rendering&#39; |

<a name="Integrate_with_DFP"></a>
# Integrate with DFP:

Please refer https://docs.prebid.org/adops/step-by-step.html

<a name="KnownDefects"></a>
# Known Defects/Behaviour/workarounds:

- Testing has not been done on IE 11 browser
- &#39;null&#39; call (&#39;undefined&#39; call in Edge) in network tab
  - If there is no master content specified, then null/undefined call appears
  - To resolve, add master content URL at insertVideoElement() in src/OutstreamPlayer.js file. Replace ```  videoElement += '></video>';  ``` with below
  - ``` <videoElement += '><source src="https://stagingva.pubmatic.com:8443/test/ad.mp4" title="1080p" type="video/mp4" /></video>';  ```
- Video types mov, MP3 and mkv working fine where as flv,WMV,AVI and 3gp formats are not supported
- In iOS-14 Safari iPhone 11 forward and rewind buttons get enabled(when player is in full screen mode) and user can forward or rewind the ad. Here iOS is giving it's own controls in full screen mode.
- Auto play functionality may work as per latest autoplay policies implemented by each browser. For chrome browser's auto play policies refer https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
- VPAID creatives are not rendering in Fluid Player 3.0.4. Defect has been raised with fluid player for the same. Please follow the updates at https://github.com/fluid-player/fluid-player/issues/514
