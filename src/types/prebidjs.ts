/**
 * Api Reference for Prebid.js
 *
 * @see https://prebid.org/dev-docs/publisher-api-reference.html
 */

export namespace prebidjs {
  export interface IPrebidjsWindow {
    /**
     * global prebid.js object
     */
    pbjs: prebidjs.IPrebidJs;
  }

  export interface IPrebidJs {
    /**
     * Command queue on the `pbjs` window object.
     * All functions will be executed once pbjs is loaded.
     */
    que: {
      push(callback: Function): void;
    };

    /**
     * Prebid version
     */
    readonly version: string;

    /**
     * The bidderSettings object provides a way to define some behaviors for the platform and specific adapters.
     * The basic structure is a 'standard' section with defaults for all adapters, and then one or more
     * adapter-specific sections that override behavior for that bidder.
     */
    bidderSettings: IBidderSettings;

    /**
     * Contains all currently active ad units.
     *
     * NOTE: this is an undocumented API and is only used to remove adUnits in a single page application
     *       environment. If you upgrade prebid, make sure this API is still available.
     *
     * Works with prebid 1.38.0
     */
    readonly adUnits?: IAdUnit[];

    /**
     * Define ad units and their corresponding header bidding bidders' tag IDs.
     */
    addAdUnits(adUnits: IAdUnit[]): void;

    /**
     * Remove adUnit from the pbjs configuration
     *
     * @param adUnitCode - the adUnitCode to remove
     */
    removeAdUnit(adUnitCode: string): void;

    /**
     * Set query string targeting on all GPT ad units. The logic for deciding query strings is described
     * in the section Configure AdServer Targeting. Note that this function has to be called after all
     * ad units on page are defined.
     *
     * @param adUnit - an array of adUnitCodes to set targeting for. If no array is specified all configured
     *                 ad units will be used instead.
     *                 The parameter is especially useful for lazy loading, e.g. when the targeting needs to be set
     *                 for a specific ad unit that gets called lazily.
     */
    setTargetingForGPTAsync(adUnit?: string[]): void;

    /**
     *
     * supports a number of advanced configuration options
     *
     * @see https://prebid.org/dev-docs/publisher-api-reference.html#module_pbjs.setConfig
     * @param {prebidjs.IPrebidJsConfig} config
     */
    setConfig(config: Partial<IPrebidJsConfig>): void;

    /**
     * Request bids. When adUnits or adUnitCodes are not specified, request bids for all ad units added.
     */
    requestBids(requestParam?: IRequestObj): void;

    /**
     * This function returns the query string targeting parameters available at this moment for a given ad unit.
     */
    getAdserverTargeting(): object;

    /**
     * Trigger a manual user sync. This only works if you have set the `config.userSync.enableOverride` to `true`.
     *
     * http://prebid.org/dev-docs/publisher-api-reference.html#setConfig-Configure-User-Syncing
     */
    triggerUserSyncs(): void;

    /**
     * Enable sending analytics data to the analytics provider of your choice.
     *
     * For usage, see Integrate with the [Prebid Analytics API](http://prebid.org/dev-docs/integrate-with-the-prebid-analytics-api.html)
     *
     * @param adapters
     * @see [[http://prebid.org/overview/analytics.html]]
     * @see [[http://prebid.org/dev-docs/integrate-with-the-prebid-analytics-api.html]]
     */
    enableAnalytics(adapters: analytics.AnalyticsAdapter[]): void;

    /**
     * NOTE: this is a very rough typing. As prebid doesn't help you a lot with what is defined and what not,
     *       you have to try your own luck :(
     *
     *
     * @param event name of the event
     * @param handler callback handling the events
     * @param id The optional id parameter provides more finely-grained event callback registration.
     *        This makes it possible to register callback events for a specific item in the event context
     * @see https://docs.prebid.org/dev-docs/publisher-api-reference.html#module_pbjs.onEvent
     */
    onEvent(event: event.EventName, handler: Function, id?: any): void;

    /**
     * Deregister
     *
     * @param event name of the event
     * @param handler callback handling the events
     * @param id The optional id parameter provides more finely-grained event callback registration.
     *        This makes it possible to register callback events for a specific item in the event context
     * @see https://docs.prebid.org/dev-docs/publisher-api-reference.html#module_pbjs.onEvent
     */
    offEvent(event: event.EventName, handler: Function, id?: any): void;
  }

  /**
   * ## Global Improve Digital configuration
   *
   * This extends the [[IPrebidJsConfig]] with Improve Digital specific configuration options.
   *
   */
  interface IImproveDigitalConfig {
    /**
     * Global Improve Digital property
     */
    readonly improvedigital?: {
      /**
       * Enable the single request mode, which will send all bids in one request.
       *
       * Available since prebid 1.37.0
       */
      readonly singleRequest: boolean;

      /**
       * By default, the adapter doesn't send Prebid ad unit sizes to Improve Digital's ad server
       * and the sizes defined for each placement in the Polaris platform will be used.
       *
       * This configuration makes improve use the prebid sizes parameter.
       *
       * Available since prebid 2.8.0
       */
      readonly usePrebidSizes: boolean;
    };
  }

  /**
   * ## Global Rubicon configuration
   *
   * This extends the [[IPrebidJsConfig]] with Rubicon specific configuration options.
   *
   */
  interface IRubiconConfig {
    /**
     * Global Rubicon property
     */
    readonly rubicon?: {
      /**
       * Enable the single request mode, which will send all bids in one request.
       *
       * Available since prebid 1.12.0
       */
      readonly singleRequest: boolean;
    };
  }

  export namespace targetingcontrols {
    export interface ITargetingControls {
      /**
       * Specifies the maximum number of characters the system can add to ad server targeting.
       */
      readonly auctionKeyMaxChars?: number;

      /**
       * To make sure that deal bids are sent along with the winning bid in the `enableSendAllBids:false` scenario,
       * use the alwaysIncludeDeals flag that's part of targetingControls
       */
      readonly alwaysIncludeDeals?: boolean;
    }
  }

  /**
   * 'Consent Management' module configuration
   *
   * @see https://prebid.org/dev-docs/modules/consentManagement.html
   */
  export namespace consent {
    export interface IConsentManagementConfig {
      /**
       * The ID for the CMP in use on the page. Default is 'iab'
       */
      readonly cmpApi?: 'iab';

      /**
       * Length of time (in milliseconds) to allow the CMP to perform its tasks before aborting the process. Default is 10000
       */
      readonly timeout: number;

      /**
       * A setting to determine what will happen when obtaining consent information from the CMP fails;
       * either allow the auction to proceed (true) or cancel the auction (false). Default is true
       */
      readonly allowAuctionWithoutConsent?: boolean;

      /**
       * @see http://prebid.org/dev-docs/modules/gdprEnforcement.html
       */
      readonly gdpr?: IGdprConfig;
    }

    /**
     * A page needs to define configuration rules about how Prebid.js should enforce each in-scope activity
     *
     * @see http://prebid.org/dev-docs/modules/gdprEnforcement.html
     */
    export interface IGdprConfig {
      readonly rules: IGdprConfigRule[];
    }

    export interface IGdprConfigRule {
      /**
       * Supported values:
       * - "storage" (Purpose 1)
       * - "basicAds" (Purpose 2)
       * - "measurement" (Purpose 7)
       */
      readonly purpose: 'storage' | 'basicAds' | 'measurement';

      /**
       * Determines whether to enforce the purpose consent or not. The default in Prebid.js 3.x is not to enforce
       * purposes. The plan for Prebid.js 4.0 is to enforce consent for Purpose 1 and no others.
       */
      readonly enforcePurpose: boolean;

      /**
       * Determines whether to enforce vendor signals for this purpose or not. The default in Prebid.js 3.x is not to
       * enforce vendor signals. The plan for Prebid.js 4.0 to enforce signals for Purpose 1 and no others.
       */
      readonly enforceVendor: boolean;

      /**
       * Defines a list of biddercodes or module names that are exempt from the enforcement of this Purpose.
       *
       * The vendorExceptions list is based on Prebid.js biddercodes instead of Global Vendor List (GVL) IDs,
       * i.e. "rubicon" instead of "52". This was done to accomodate Prebid.js modules and adapters that don't have
       * GVL IDs.
       *
       * @example
       * ```js
       * ["bidderA", "userID-module-B"]
       * ```
       */
      readonly vendorExceptions?: string[];
    }
  }

  /**
   * This configuration defines the price bucket granularity setting that will be used for the hb_pb keyword.
   *
   * @see http://prebid.org/dev-docs/publisher-api-reference.html#price-granularity
   */
  export namespace priceGranularity {
    export type PriceGranularityConfig =
      | 'low'
      | 'medium'
      | 'high'
      | 'auto'
      | 'dense'
      | ICustomPriceGranularityConfig;

    /**
     * This configuration defines the price bucket granularity setting that will be used for the hb_pb keyword.
     */
    export interface ICustomPriceGranularityConfig {
      readonly buckets: IPriceBucketConfig[];
    }

    /**
     * The default Prebid price granularities cap out at $20, which isn't always convenient for video ads, which
     * can command more than $20. One solution is to just set up a custom price granularity as described above.
     * Another approach is mediaTypePriceGranularity config that may be set to define granularities for each of
     * five media types: banner, video, video-instream, video-outstream, and native.
     */
    export interface IMediaTypePriceGranularityConfig {
      readonly video: PriceGranularityConfig;
      readonly 'video-outstream': PriceGranularityConfig;
      readonly banner: PriceGranularityConfig;
      readonly native: PriceGranularityConfig;
    }

    /**
     * @example
     * ```javascript
     * const customConfigObject = {
     * "buckets" : [{
     *     "precision": 2,  //default is 2 if omitted - means 2.1234 rounded to 2 decimal places = 2.12
     *     "max" : 5,
     *     "increment" : 0.01  // from $0 to $5, 1-cent increments
     *  },
     *  {
     *    "max" : 8,
     *    "increment" : 0.05  // from $5 to $8, round down to the previous 5-cent increment
     *  },
     *  {
     *    "max" : 40,
     *    "increment" : 0.5   // from $8 to $40, round down to the previous 50-cent increment
     *  }]
     * };
     * ```
     */
    export interface IPriceBucketConfig {
      /**
       * default is 2 if omitted - means 2.1234 rounded to 2 decimal places = 2.12
       */
      readonly precision?: number;

      /**
       * Upper limit for this price bucket
       */
      readonly max: number;

      /**
       * Increment steps in publisher currency
       */
      readonly increment: number;
    }
  }

  export namespace userSync {
    /**
     * ## Configure User Syncing
     *
     * The user sync configuration options described in this section give publishers control over how adapters behave
     * with respect to dropping pixels or scripts to cookie users with IDs. This practice is called “user syncing”
     * because the aim is to let the bidders match IDs between their cookie space and the DSP's cookie space. There's a
     * good reason for bidders to be doing this – DSPs are more likely to bid on impressions where they know something
     * about the history of the user. However, there are also good reasons why publishers may want to control the use of
     * these practices:
     *
     * - Page performance: Publishers may wish to move ad-related cookie work to much later in the page load after ads
     *                     and content have loaded.
     * - User privacy:     Some publishers may want to opt out of these practices even though it limits their users'
     *                     values on the open market.
     * - Security:         Publishers may want to control which bidders are trusted to inject images and JavaScript into
     *                     their pages.
     *
     * User syncing default behavior If you don't tweak any of the settings described in this section, the default
     * behavior of Prebid.js is to wait 3 seconds after the auction ends, and then allow every adapter to drop up to
     * 5 image-based user syncs.
     *
     * @see https://prebid.org/dev-docs/publisher-api-reference.html#setConfig-Configure-User-Syncing
     */
    export interface IUserSyncConfig {
      /**
       * Enable/disable the user syncing feature. Default: true.
       */
      readonly syncEnabled?: boolean;

      /**
       * Delay in milliseconds for syncing after the auction ends. Default: 3000.
       */
      readonly syncDelay?: number;

      /**
       * Delay in milliseconds of the auction to retrieve user ids via the userId module before the auction starts.
       * Continues auction once all IDs are retrieved or delay times out. Does not apply to bid adapter user sync pixels.
       *
       * Default: 0.
       * @see http://prebid.org/dev-docs/modules/userId.html
       */
      readonly auctionDelay?: number;

      /**
       * Number of registered syncs allowed per adapter. Default: 5. To allow all, set to 0.
       */
      readonly syncsPerBidder?: number;

      /**
       * Configure lists of adapters to include or exclude their user syncing based on the pixel type (image/iframe).
       */
      readonly filterSettings?: IFilterSettingsConfig;

      /**
       * Enable/disable publisher to trigger user syncs by calling pbjs.triggerUserSyncs(). Default: false.
       */
      readonly enableOverride?: boolean;

      readonly userIds?: UserIdProvider[];
    }

    /**
     * All supported id providers
     */
    export type UserIdProvider =
      | IUnifiedIdProvider
      | IDigitTrustProvider
      | ICriteoProvider
      | IID5Provider
      | IIdentityLinkProvider
      | IPubCommonIdProvider
      | IZeotapIdPlusIdProvider;

    interface IUserIdProvider<N extends string> {
      /**
       * the provider name
       */
      readonly name: N;

      /**
       * The publisher can specify some kind of local storage in which to store the results of the call to get
       * the user ID. This can be either cookie or HTML5 storage. This is not needed when value is specified or
       * the ID system is managing its own storage
       */
      readonly storage?: IUserIdStorage;
    }

    /**
     * A UserId provider hat requires additional parameters configuration
     */
    interface IParameterizedUserIdProvider<P, N extends string> extends IUserIdProvider<N> {
      /**
       * provider specific params
       */
      readonly params: P;
    }

    export interface IUserIdStorage {
      /**
       *  The publisher can specify some kind of local storage in which to store the results of the call to get the
       *  user ID. This can be either cookie or HTML5 storage. This is not needed when value is specified or the
       *  ID system is managing its own storage
       */
      readonly type: 'cookie' | 'html5';

      /**
       * The name of the cookie or html5 local storage where the user ID will be stored.
       * @example '_unifiedId'
       */
      readonly name: string;

      /**
       * How long (in **days**) the user ID information will be stored. If this parameter isn't specified, session
       * cookies are used in cookie-mode, and local storage mode will create new IDs on every page.
       *
       * Note: This field is optional, but prebid strongly requires it so we make it mandatory.
       */
      readonly expires: number;

      /**
       * The amount of time (in **seconds**) the user ID should be cached in storage before calling the provider again
       * to retrieve a potentially updated value for their user ID. If set, this value should equate to a time period
       * less than the number of days defined in `storage.expires`.
       *
       * By default the ID will not be refreshed until it expires.
       */
      readonly refreshInSeconds?: number;

      /**
       * Used only if the page has a separate mechanism for storing a User ID. The value is an object containing the
       * values to be sent to the adapters.
       *
       * @example
       * ```json
       * {"tdid": "1111", "pubcid": {2222}, "id5id": "ID5-12345" }
       * ```
       */
      readonly value?: any;
    }

    export interface IUnifiedIdProviderParams {
      /**
       * This is the partner ID value obtained from registering with The Trade Desk
       * or working with a Prebid.js managed services provider.
       *
       * @example "myTtdPid"
       */
      readonly partner?: string;

      /**
       * If specified for UnifiedId, overrides the default Trade Desk URL.
       *
       * @example "https://unifiedid.org/somepath?args"
       */
      readonly url?: string;

      /**
       *
       *  Used only if the page has a separate mechanism for storing the Unified ID. The value is an object
       *  containing the values to be sent to the adapters. In this scenario, no URL is called and nothing
       *  is added to local storage
       *
       * @example
       * ```json
       * {"tdid": "D6885E90-2A7A-4E0F-87CB-7734ED1B99A3"}
       * ```
       */
      readonly value?: {
        readonly tdid: string;
      };
    }

    /**
     * @see http://prebid.org/dev-docs/modules/userId.html#unified-id
     */
    export interface IUnifiedIdProvider
      extends IParameterizedUserIdProvider<IUnifiedIdProviderParams, 'unifiedId'> {}

    /**
     * @see http://prebid.org/dev-docs/modules/userId.html#criteo-id-for-exchanges
     */
    export interface ICriteoProvider extends IUserIdProvider<'criteo'> {}

    /**
     * @see http://prebid.org/dev-docs/modules/userId.html#digitrust
     */
    export interface IDigitTrustProviderParams {
      readonly init: {
        readonly member: string;
        readonly site: string;
      };
      /** Allows init error handling */
      readonly callback?: (result: any) => void;
    }

    /**
     * @see https://console.id5.io/docs/public/prebid
     */
    export interface IDigitTrustProvider
      extends IParameterizedUserIdProvider<IDigitTrustProviderParams, 'digitrust'> {}

    export interface IID5ProviderParams {
      /**
       * This is the ID5 Partner Number obtained from registering with ID5.
       * @example 173
       */
      readonly partner: number;

      /**
       * The pd field (short for Publisher Data) is an optional, base64 encoded string that contains any deterministic
       * user data the publisher has access to. The data will be used strictly to provide better linking of ID5 IDs
       * across domains for improved user identification. If the user has not provided ID5 with a legal basis to process
       * data, the information sent to ID5 will be ignored and neither used nor saved for future requests.
       */
      readonly pd?: string;
    }

    /**
     * The ID5 Universal ID that is delivered to Prebid will be encrypted by ID5 with a rotating key to avoid
     * unauthorized usage and to enforce privacy requirements. Therefore, we strongly recommend setting
     * `storage.refreshInSeconds` to 8 hours (8*3600 seconds) to ensure all demand partners receive an ID that
     * has been encrypted with the latest key, has up-to-date privacy signals, and allows them to transact against it.
     *
     * @see http://prebid.org/dev-docs/modules/userId.html#id5-universal-id
     */
    export interface IID5Provider
      extends IParameterizedUserIdProvider<IID5ProviderParams, 'id5Id'> {}

    export interface IIdentityLinkProviderParams {
      /**
       * This is the placementId, value needed for obtaining user's IdentityLink envelope.
       */
      readonly pid: string;
    }

    /**
     * IdentityLink, provided by LiveRamp is a single person-based identifier which allows marketers, platforms and
     * publishers to perform personalized segmentation, targeting and measurement use cases that require a consistent,
     * cross-channel view of the user in anonymous spaces.
     *
     * @see https://docs.prebid.org/dev-docs/modules/userId.html#identitylink
     */
    export interface IIdentityLinkProvider
      extends IParameterizedUserIdProvider<IIdentityLinkProviderParams, 'identityLink'> {}

    /**
     * @see http://prebid.org/dev-docs/modules/userId.html#pubcommon-id
     */
    export interface IPubCommonIdProvider extends IUserIdProvider<'pubCommonId'> {}

    /**
     * ID+, powered by zeotap, enables the marketing ecosystem to overcome challenges posed by the demise of identifiers
     * and a fast-changing regulatory landscape. ID+ is an open invitation to the entire industry to build the future
     * of identity together.
     *
     * @see https://docs.prebid.org/dev-docs/modules/userId.html#id
     */
    export interface IZeotapIdPlusIdProvider extends IUserIdProvider<'zeotapIdPlus'> {}

    export interface IFilterSettingsConfig {
      /**
       * From the documentation:
       * If you want to apply the same bidder inclusion/exclusion rules for both types of sync pixels,
       * you can use the all object instead specifying both image and iframe objects like so
       */
      readonly all?: IFilterSetting;

      /**
       * Allow iframe-based syncs (the presence of a valid filterSettings.iframe object automatically enables iframe type user-syncing).
       *
       * Note - iframe-based syncing is disabled by default.
       */
      readonly iframe?: IFilterSetting;

      /**
       * Image-based syncing is enabled by default; it can be disabled by excluding all/certain bidders via the filterSettings object.
       */
      readonly image?: IFilterSetting;
    }

    export interface IFilterSetting {
      /**
       * Array of bidders that should be filtered. '*' means all.
       */
      readonly bidders: BidderCode[] | '*';

      readonly filter: 'include' | 'exclude';
    }
  }

  export namespace event {
    export type EventName =
      | 'auctionInit'
      | 'auctionEnd'
      | 'beforeRequestBids'
      | 'bidRequested'
      | 'bidResponse'
      | 'bidAdjustment'
      | 'bidWon'
      | 'noBid'
      | 'bidTimeout'
      | 'setTargeting'
      | 'requestBids'
      | 'addAdUnits'
      | 'adRenderFailed'
      | 'auctionDebug'
      | 'bidderDone'
      | 'tcf2Enforcement';
  }

  export namespace currency {
    export type IBidderCurrencyDefault = {
      [bidder in BidderCode]: 'EUR' | 'USD' | 'GBP';
    };

    export interface ICurrencyConfig {
      /**
       * ISO 4217 3-letter currency code.
       * If this value is present, the currency conversion feature is activated.
       */
      readonly adServerCurrency: 'EUR' | 'USD' | 'GBP';

      /**
       * How much to scale the price granularity calculations. Defaults to 1.
       * Note: The multiplier may not make sense for markets
       * where the currency value is close to USD, e.g. GBP and EUR.
       * In those scenarios, just leave the granularityMultiplier at 1.
       */
      readonly granularityMultiplier: 1;

      /**
       * An optional parameter that defines a default rate that can be used
       * if the currency file cannot be loaded.
       * This option isn't used when the rates parameter is supplied.
       *
       * Prebid hosts a conversion file here: https://currency.prebid.org/latest.json
       */
      readonly defaultRates: { USD: { EUR: number } };

      /**
       * configure bidder specific currencies.
       *
       * SSPs that make use of this feature
       * - Visx
       * - ...
       */
      readonly bidderCurrencyDefault?: IBidderCurrencyDefault;
    }
  }

  export namespace server {
    export type S2SConfig = IS2SConfig & IS2DTestingConfig;

    /**
     * @see https://docs.prebid.org/dev-docs/publisher-api-reference.html#setConfig-Server-to-Server
     */
    export interface IS2SConfig {
      /**
       * Your Prebid Server account ID. This is obtained from whoever's hosting your Prebid Server.
       */
      readonly accountId: string;

      /**
       * Which bidders auctions should take place on the server side
       */
      readonly bidders: ReadonlyArray<BidderCode>;

      /**
       * Automatically includes all following options in the config with vendor's default values.
       * Individual properties can be overridden by including them in the config along with this setting.
       */
      readonly defaultVendor?: BidderCode;

      /**
       * Enables this s2sConfig block - defaults to false
       */
      readonly enabled: boolean;

      /**
       * number of milliseconds allowed for the server-side auctions. This should be approximately 200ms-300ms less
       * than your Prebid.js timeout to allow for all bids to be returned in a timely manner.
       *
       * See the Additional Notes below for more information.
       */
      readonly timeout: number;

      /**
       * Adapter to use to connect to Prebid Server.
       *
       * Defaults to 'prebidServer'
       */
      readonly adapter: 'prebidServer';

      /**
       *  Defines the auction endpoint for the Prebid Server cluster
       */
      readonly endpoint: string;

      /**
       * Defines the cookie_sync endpoint for the Prebid Server cluster
       */
      readonly syncEndpoint: string;

      /**
       * Max number of userSync URLs that can be executed by Prebid Server cookie_sync per request. If not defined,
       * PBS will execute all userSync URLs included in the request.
       */
      readonly userSyncLimit?: number;

      /**
       * Configures the default TTL in the Prebid Server adapter to use when Prebid Server
       * does not return a bid TTL - 60 if not set
       */
      readonly defaultTtl?: number;

      /**
       * Arguments will be added to resulting OpenRTB payload to Prebid Server in every impression
       * object at `request.imp[].ext.BIDDER`.
       */
      readonly adapterOptions?: AdapterOptions;

      /**
       * Arguments will be added to resulting OpenRTB payload to Prebid Server in `request.ext.prebid`.
       *
       * @example
       * ```javascript
       * extPrebid: {
       *   cache: {
       *     vastxml: { returnCreative: false }
       *   },
       *   targeting: {
       *     pricegranularity: {"ranges": [{"max":40.00,"increment":1.00}]}
       *   }
       * }
       * ```
       */
      readonly extPrebid?: ExtPrebid;

      /**
       * Function to modify a bidder's sync url before the actual call to the sync endpoint.
       * Bidder must be enabled for s2sConfig.
       */
      readonly syncUrlModifier?: any;
    }

    /**
     * Only available with the s2sTesting module
     * @see https://docs.prebid.org/dev-docs/modules/s2sTesting.html
     */
    export interface IS2DTestingConfig {
      /**
       * This attribute is required to enable the bidderControl and bidSource features.
       * This shouldn't be confused with the enabled: true flag which enables the entire server-to-server feature.
       *
       * Only available with the s2sTesting module
       */
      readonly testing?: boolean;

      /**
       * Using the `testServerOnly` flag means that all client requests will be suppressed
       * (those requests will not be made) whenever any bid requests from the 'A/B test group' result in a 'server'
       * bid request. The 'A/B test group' includes any requests whose source is controled by 's2sConfig.bidderControl'
       * or 'bidSource' at the adUnit level. This may give a clearer picture of how s2s performs without interference
       * from client bid requests.
       *
       * Only available with the s2sTesting module
       */
      readonly testServerOnly?: boolean;

      /**
       * Configure the client/server share for every bidder
       *
       * Only available with the s2sTesting module
       */
      readonly bidderControl?: {
        readonly [bidder in BidderCode]?: BidderControl;
      };
    }

    /**
     * Configure the A/B test between client and server
     */
    export type BidderControl = {
      /**
       * control the ratio between client and server.
       * `client` and `server` must add up to `100`.
       */
      readonly bidSource: BidSource;

      /**
       * As a Publisher, I'd like to run tests on one part or my site per one of the other use cases above. I'll use
       * the test KVP to confirm relative responses, so would like to have the hb_source test KVP coming in even on
       * pages where the server test isn't running.
       */
      readonly includeSourceKvp: boolean;
    };

    /**
     * control the ratio between client and server.
     * `client` and `server` must add up to `100`.
     */
    export type BidSource =
      | {
          /**
           * a number between 0 and 100
           */
          readonly client: number;

          /**
           * a number between 0 and 100
           */
          readonly server: number;
        }
      | {
          /**
           * if client should have 100% of the traffic, no server share is necessary
           */
          readonly client: 100;
        }
      | {
          /**
           * if server should have 100% of the traffic, no server share is necessary
           */
          readonly server: 100;
        };

    /**
     * Arguments will be added to resulting OpenRTB payload to Prebid Server in every impression
     * object at `request.imp[].ext.BIDDER`.
     */
    export type AdapterOptions = {
      readonly [bidder in BidderCode]?: any;
    };

    export type ExtPrebid = {
      readonly cache?: {
        readonly vastxml?: {
          readonly returnCreative: boolean;
        };
      };
      readonly targeting?: {
        readonly pricegranularity: {
          readonly ranges: Readonly<priceGranularity.IPriceBucketConfig>;
        };
      };

      /**
       * Stored Requests are also allowed on the BidRequest. These work exactly the same way, but support storing
       * properties like timeouts and price granularity.
       *
       * @see https://docs.prebid.org/prebid-server/features/pbs-storedreqs-go.html
       */
      readonly storedrequest?: StoredRequest;
    };

    /**
     * @see https://docs.prebid.org/prebid-server/features/pbs-storedreqs-go.html
     */
    export type StoredRequest = {
      readonly id: string;
    };
  }

  export namespace analytics {
    export type AnalyticsAdapter = IGoogleAnalyticsAdapter;
    export type AnalyticsProviders = 'ga';

    export interface IAnalyticsAdapter<T> {
      readonly provider: AnalyticsProviders;
      readonly options: T;
    }

    /**
     * Options are deducted from the source code.
     *
     * @see [[https://github.com/prebid/Prebid.js/blob/2.33.0/modules/googleAnalyticsAdapter.js]]
     */
    export interface IGoogleAnalyticsAdapterOptions {
      /**
       * set the global google analytics object if not 'ga'
       * default: 'ga'
       */
      readonly global?: string;

      /**
       * the google analytics tracker name
       * default: 'h5'
       */
      readonly trackerName?: string;

      /**
       * enable tracking of distribution metrics (load time, win rate)
       * default: false
       */
      readonly enableDistribution?: boolean;

      /**
       * define the percentage (0 to 1) of samples that should be tracked.
       *
       * 0   =   0%
       * 0.5 =  50%
       * 1   = 100%
       *
       * default: 100%
       */
      readonly sampling?: number;
    }

    export interface IGoogleAnalyticsAdapter
      extends IAnalyticsAdapter<IGoogleAnalyticsAdapterOptions> {
      readonly provider: 'ga';
    }
  }

  /**
   * ## Global Prebid Configuration
   *
   * Contains various configuration options for prebid. The type is not complete. Only the necessary configuration
   * options are listed here.
   *
   * NOTE: modules can extend this configuration as well, so you may find the information in various prebid
   *       documentation pages. One example is the consentModule.
   *
   * @see https://prebid.org/dev-docs/publisher-api-reference.html#module_pbjs.setConfig
   */
  export interface IPrebidJsConfig extends IImproveDigitalConfig, IRubiconConfig {
    /**
     * Turn on debugging
     */
    readonly debug?: boolean;

    /**
     * global bidder timeout
     */
    readonly bidderTimeout?: number;

    /**
     * After this method is called, Prebid.js will generate bid keywords for all bids, instead of the default behavior
     * of only sending the top winning bid to the ad server.
     *
     * With the sendAllBids mode enabled, your page can send all bid keywords to your ad server. Your ad server will see
     * all the bids, then make the ultimate decision on which one will win. Some ad servers, such as DFP, can then
     * generate reporting on historical bid prices from all bidders.
     *
     * Note that this config option must be called before pbjs.setTargetingForGPTAsync() or pbjs.getAdserverTargeting().
     *
     * After this option is set, pbjs.getAdserverTargeting() will give you the below JSON (example).
     * pbjs.setTargetingForGPTAsync() will apply the below keywords in the JSON to GPT (example below)
     *
     * Default: true
     */
    readonly enableSendAllBids?: boolean;

    /**
     * Set the publisher's domain where Prebid is running, for cross-domain iframe communication
     */
    readonly publisherDomain?: string;

    /**
     * This configuration defines the price bucket granularity setting that will be used for the hb_pb keyword.
     */
    readonly priceGranularity?: priceGranularity.PriceGranularityConfig;

    /**
     * The default Prebid price granularities cap out at $20, which isn't always convenient for video ads, which can
     * command more than $20. One solution is to just set up a custom price granularity as described above. Another approach is mediaTypePriceGranularity config that may be set to define granularities for each of five media types: banner, video, video-instream, video-outstream, and native. e.g.
     */
    readonly mediaTypePriceGranularity?: priceGranularity.IMediaTypePriceGranularityConfig;

    /**
     * The `targetingControls` object passed to pbjs.setConfig provides some options to influence how an auction's
     * targeting keys are generated and managed.
     */
    readonly targetingControls?: targetingcontrols.ITargetingControls;

    /**
     * 'Consent Management' module configuration
     *
     * @see https://prebid.org/dev-docs/modules/consentManagement.html
     */
    readonly consentManagement?: consent.IConsentManagementConfig;

    /**
     * @see userSync.IUserSyncConfig
     * @see https://prebid.org/dev-docs/publisher-api-reference.html#setConfig-Configure-User-Syncing
     */
    readonly userSync?: userSync.IUserSyncConfig;

    /**
     * The configuration for the currency module
     *
     * https://prebid.org/dev-docs/modules/currency.html
     */
    readonly currency: currency.ICurrencyConfig;

    /**
     * @see https://docs.prebid.org/dev-docs/publisher-api-reference.html#setConfig-Server-to-Server
     */
    readonly s2sConfig?: server.S2SConfig | ReadonlyArray<server.S2SConfig>;
  }

  /**
   * For AdUnits with MediaType: banner
   */
  export interface IMediaTypeBanner {
    /**
     * All the sizes that this ad unit can accept.
     * Hint: Some SSPs handles only the first size, so keep that in mind.
     */
    readonly sizes: [number, number][];
  }

  /**
   * For AdUnits with MediaType: video
   */
  export interface IMediaTypeVideo {
    /**
     * Context can be 'instream' or 'outstream'.
     * We only show outstream videos. Outstream video ads can be shown on any web page.
     * Instream video ads require you to have your own video inventory.
     */
    readonly context: 'outstream';

    /**
     * Player size(s) that this ad unit can accept (width, height).
     */
    readonly playerSize: [number, number][] | [number, number];
  }

  interface IMediaTypeNativeRequirement {
    /**
     * true if the field is required for the native ad
     */
    readonly required: boolean;

    /**
     * Prebid.js sends received asset values to a native template defined in your ad server using key-value targeting.
     * The key-value targeting pairs are passed to the ad server as query string parameters. In some cases, sending
     * native asset values as query string parameters may cause errors. For example, a long clickUrl value can exceed
     * an ad request URL limit, or special characters within a body can get mangled by URL encoding. In these cases,
     * you can opt to send URL-safe placeholder values to the ad server, and then in the native template, replace the
     * placeholder values with the actual native values through a non-URL request to and response from Prebid.js.
     *
     * Within mediaTypes.native, add sendId: true to any asset object you wish to send as a placeholder.
     * For example, to send body and clickUrl as placeholders
     *
     * ```
     * mediaTypes: {
     *   native: {
     *     body: {
     *       sendId: true
     *     },
     *     clickUrl: {
     *       sendId: true
     *     },
     *   },
     * },
     * ```
     *
     * Note: The creative designs must have the universal-prebid-creative included
     * ```
     * <script src="https://cdn.jsdelivr.net/npm/prebid-universal-creative@1.7.0/dist/native-trk.js"></script>
     * ```
     *
     * or for the latest version
     *
     * ```
     * <script src="https://cdn.jsdelivr.net/npm/prebid-universal-creative@latest/dist/native-trk.js"></script>
     * ```
     *
     * @see http://prebid.org/dev-docs/show-native-ads.html#sending-asset-placeholders
     */
    readonly sendId?: boolean;
  }

  /**
   * A few properties may have a `len` property that can be specified to allow the maximum length of text.
   */
  interface IMediaTypeNativeRequirementWithLength extends IMediaTypeNativeRequirement {
    /**
     * Maximum length of text, in characters.
     */
    readonly len?: number;
  }

  /**
   * NOTE: If you're using aspect_ratios in a native request sent to Prebid Server, the min_width and min_height
   * fields become required instead of optional. If these fields are not included, that native request will be rejected.
   */
  type MediaTypeNativeAspectRatio = {
    /**
     * The minimum width required for an image to serve (in pixels).
     */
    readonly min_width?: number;

    /**
     * The minimum height required for an image to serve (in pixels)
     */
    readonly min_height?: number;

    /**
     * This, combined with `ratio_height`, determines the required aspect ratio for an image that can serve.
     */

    readonly ratio_width: number;

    /**
     * This, combined with `ratio_width`, determines the required aspect ratio for an image that can serve.
     */
    readonly ratio_height: number;
  };

  /**
   * There are two methods for defining sizes for image-like assets (image and icon). Both are shown below,
   * but the first example (using sizes) is more widely supported by demand partners.
   *
   * - Using `mediaTypes.native.image.sizes` (or `mediaTypes.native.icon.sizes` for icons)
   * - Using `mediaTypes.native.image.aspect_ratios` (or `mediaTypes.native.icon.aspect_ratios` for icons)
   */
  interface IMediaTypeNativeRequirementImage extends IMediaTypeNativeRequirement {
    /**
     * All sizes this ad unit can accept.
     * @example `[400, 600]`
     * @example `[[300, 250], [300, 600]]`
     */
    readonly sizes?: [number, number] | [number, number][];

    /**
     * Alongside sizes, you can define allowed aspect ratios
     */
    readonly aspect_ratios?: MediaTypeNativeAspectRatio[];
  }

  /**
   * @see http://prebid.org/dev-docs/show-native-ads.html#native-ad-keys
   * @see https://docs.prebid.org/dev-docs/adunit-reference.html#adunitmediatypesnative
   */
  export interface IMediaTypeNative {
    /**
     * Prebid.js defines “types” of native ad for you as a convenience. This way you have less code to maintain,
     * that is hopefully more descriptive of your intent.
     *
     * For now there is only the image type, but more will be added.
     *
     * The image native ad type implies the following required fields:
     *
     * - image
     * - title
     * - sponsoredBy
     * - clickUrl
     *
     * And the following optional fields:
     *
     * - body
     * - icon
     * - cta
     *
     *
     * @see http://prebid.org/dev-docs/show-native-ads.html#pre-defined-native-types
     */
    readonly type?: 'image';

    /**
     * The title of the ad, usually a call to action or a brand name.
     *
     * ad server key-value: `hb_native_title`
     */
    readonly title?: IMediaTypeNativeRequirementWithLength;

    /**
     * Text of the ad copy.
     *
     * ad server key-value: `hb_native_body`
     */
    readonly body?: IMediaTypeNativeRequirementWithLength;

    /**
     * Additional Text of the ad copy.
     *
     * ad server key-value: `hb_native_body2`
     */
    readonly body2?: IMediaTypeNativeRequirement;

    /**
     * The name of the brand associated with the ad.
     *
     * ad server key-value: `hb_native_brand`
     */
    readonly sponsoredBy?: IMediaTypeNativeRequirement;

    /**
     * The brand icon that will appear with the ad.
     *
     * ad server key-value: `hb_native_icon`
     */
    readonly icon?: IMediaTypeNativeRequirementImage;

    /**
     * A picture that is associated with the brand, or grabs the user's attention.
     *
     * ad server key-value: `hb_native_image`
     */
    readonly image?: IMediaTypeNativeRequirementImage;

    /**
     * Where the user will end up if they click the ad.
     *
     * ad server key-value: `hb_native_linkurl`
     */
    readonly clickUrl?: IMediaTypeNativeRequirement;

    /**
     * Text that can be displayed instead of the raw click URL. e.g, “Example.com/Specials”
     *
     * ad server key-value: `hb_native_displayUrl`
     */
    readonly displayUrl?: IMediaTypeNativeRequirement;

    /**
     * Link to the Privacy Policy of the Buyer, e.g. http://example.com/privacy
     *
     * ad server key-value: `hb_native_privacy`
     */
    readonly privacyLink?: IMediaTypeNativeRequirement;

    /**
     * Icon to display for the privacy link, e.g. http://example.com/privacy_icon.png
     *
     * ad server key-value: `hb_native_privicon`
     */
    readonly privacyIcon?: IMediaTypeNativeRequirement;

    /**
     * Call to Action text, e.g., “Click here for more information”.
     *
     * ad server key-value: `hb_native_cta`
     */
    readonly cta?: IMediaTypeNativeRequirement;

    /**
     * Rating information, e.g., “4” out of 5.
     *
     * ad server key-value: `hb_native_rating`
     */
    readonly rating?: IMediaTypeNativeRequirement;

    /**
     * The total downloads of the advertised application/product
     *
     * ad server key-value: `hb_native_downloads`
     */
    readonly downloads?: IMediaTypeNativeRequirement;

    /**
     * The total number of individuals who like the advertised application/product
     *
     * ad server key-value: `hb_native_likes`
     */
    readonly likes?: IMediaTypeNativeRequirement;

    /**
     * The non-sale price of the advertised application/product
     *
     * ad server key-value: `hb_native_likes`
     */
    readonly price?: IMediaTypeNativeRequirement;

    /**
     * The sale price of the advertised application/product
     *
     * ad server key-value: `hb_native_saleprice`
     */
    readonly salePrice?: IMediaTypeNativeRequirement;

    /**
     * Address of the Buyer/Store. e.g, “123 Main Street, Anywhere USA”
     *
     * ad server key-value: `hb_native_address`
     */
    readonly address?: IMediaTypeNativeRequirement;

    /**
     * Phone Number of the Buyer/Store. e.g, “(123) 456-7890”
     *
     * ad server key-value: `hb_native_phone`
     */
    readonly phone?: IMediaTypeNativeRequirement;
  }

  /**
   * Defines one or multiple media types the ad unit supports.
   * Media Types can be "banner", "native" or "video.
   *
   * @see https://prebid.org/dev-docs/show-multi-format-ads.html
   * @see https://prebid.org/dev-docs/publisher-api-reference.html#adUnit-multi-format
   */
  export interface IMediaTypes {
    /**
     * optional. If no other properties are specified, this is the default.
     * @see https://prebid.org/dev-docs/publisher-api-reference.html#adUnit-banner
     */
    readonly banner?: IMediaTypeBanner;

    /**
     * Defines properties of a video ad.
     *
     * @see https://prebid.org/dev-docs/publisher-api-reference.html#adUnit-video
     */
    readonly video?: IMediaTypeVideo;

    /**
     * Defines properties of a native ad.
     *
     * @see http://prebid.org/dev-docs/show-native-ads.htm
     * @see http://prebid.org/adops/setting-up-prebid-native-in-dfp.html
     * @see http://prebid.org/dev-docs/examples/native-ad-example.html
     */
    readonly native?: IMediaTypeNative;
  }

  /**
   * Prebid.js will select the renderer used to display the outstream video in the following way:
   *
   * 1. If a renderer is associated with the Prebid adUnit, it will be used to display any outstream demand
   *    associated with that adUnit. Below, we will provide an example of an adUnit with an associated renderer.
   * 2. If no renderer is specified on the Prebid adUnit, Prebid will invoke the renderer
   *    associated with the winning (or selected) demand partner video bid.
   *
   * Since not all demand partners return a renderer with their video bid responses,
   * we recommend that publishers associate a renderer with their Prebid video adUnits, if possible.
   *
   * @see https://prebid.org/dev-docs/show-outstream-video-ads.html
   */
  export interface IRenderer {
    /**
     * Points to a file containing the renderer script.
     */
    readonly url: string;
    /**
     * A function that tells Prebid.js how to invoke the renderer script.
     */
    readonly render: (bid: any) => void; // TODO: find out bid type

    /**
     * Optional field, if set to true, buyer or adapter renderer will be preferred.
     * Default is true.
     */
    readonly backupOnly: boolean;

    /**
     * NOTE: we only want publishers that offer us url and renderer, but we want to keep this possibility open
     *
     * For demand partners that return a renderer with their video bid responses.
     * This configuration is bidder specific and may include options for e.g. skippability, player size and ad text.
     */
    readonly options?: any;
  }

  /**
   * ## Ad unit / ad unit object
   *
   * The ad unit object is where you configure what kinds of ads you will show in a given ad slot on your page, including:
   *
   * - Allowed sizes
   * - Allowed media types (e.g., banner, native, and/or video)
   *
   * It's also where you will configure bidders, e.g.:
   *
   * - Which bidders are allowed to bid for that ad slot
   * - What information is passed to those bidders via their parameters
   *
   * Relates directly to the `Moli.IAdSlot`.
   *
   * @see https://prebid.org/dev-docs/adunit-reference.html
   */
  export interface IAdUnit {
    /**
     * A unique identifier that you create and assign to this ad unit. This identifier will be used to set
     * query string targeting on the ad. If you're using GPT, we recommend setting this to the slot element ID.
     */
    readonly code: string;

    /**
     * Defines one or multiple media types the ad unit supports.
     * Media Types can be "banner", "native" or "video
     */
    readonly mediaTypes: IMediaTypes;

    /**
     * An array of bid objects.
     */
    readonly bids: IBid[];

    /**
     * The renderer associated to the ad-unit. Only for mediaType = video.
     */
    readonly renderer?: IRenderer;

    /**
     * This is an optional configuration for publishers that have a pubstack.io integration.
     *
     * @see https://pubstack.io/
     * @see https://pubstack.freshdesk.com/support/solutions/articles/48000965600-how-to-implement-google-adx-
     * @see https://pubstack.freshdesk.com/support/solutions/articles/48000965702-how-to-custom-ad-unit-name-
     */
    readonly pubstack?: {
      /**
       * By default, the integration uses the adUnitCode defined in the Ad Unit.
       * If you want Pubstack to use another name, you just have to provide the desired value through
       * the `pubstack.adUnitName` property.
       *
       * This feature is very useful when a site implements a lazy-loading or a refresh strategy.
       * The following example shows you how to set a custom name, whatever the ad unit code is.
       *
       * @see https://pubstack.freshdesk.com/support/solutions/articles/48000965702-how-to-custom-ad-unit-name-
       */
      readonly adUnitName?: string;

      /**
       * This is required for Google Ad Manager integration.
       *
       * Within the Prebid configuration (client-side), every prebid adUnit must be matched with a GAM adUnit,
       * so that we can display the corresponding AdX revenue in Pubstack. In order to do that, you need to
       * add the field "pubstack"."adUnitPath" to all ad units. This adUnitPath must be constructed* as such:
       *
       *   `/networkId/top_level1/level2/level3` (same as the DFP adUnitPath)
       *
       * @see https://pubstack.freshdesk.com/support/solutions/articles/48000965600-how-to-implement-google-adx-
       */
      readonly adUnitPath?: string;

      /**
       * Allows the publisher to push arbitrary dimensions to pubstack.
       * Can only be used with coordination of pubstack so the data can actually be used.
       */
      readonly tags?: string[];
    };
  }

  // Supported SSPs
  export const Criteo = 'criteo';
  export const AppNexusAst = 'appnexusAst';
  export const AppNexus = 'appnexus';
  export const ImproveDigital = 'improvedigital';
  export const IndexExchange = 'ix';
  export const NanoInteractive = 'nanointeractive';
  export const JustPremium = 'justpremium';
  export const PubMatic = 'pubmatic';
  export const OpenX = 'openx';
  export const SmartAdServer = 'smartadserver';
  export const Unruly = 'unruly';
  export const Teads = 'teads';
  export const Yieldlab = 'yieldlab';
  export const Spotx = 'spotx';
  export const ShowHeroes = 'showheroesBs';
  export const Xaxis = 'xhb';
  export const DSPX = 'dspx';
  export const Rubicon = 'rubicon';
  export const Recognified = 'rads';
  export const Visx = 'visx';

  /**
   * The bidder code is used to identify the different SSPs.
   */
  export type BidderCode =
    | typeof Criteo
    | typeof AppNexusAst
    | typeof AppNexus
    | typeof ImproveDigital
    | typeof IndexExchange
    | typeof JustPremium
    | typeof NanoInteractive
    | typeof PubMatic
    | typeof OpenX
    | typeof SmartAdServer
    | typeof Unruly
    | typeof Teads
    | typeof Yieldlab
    | typeof Spotx
    | typeof ShowHeroes
    | typeof Xaxis
    | typeof DSPX
    | typeof Rubicon
    | typeof Recognified
    | typeof Visx;

  /**
   * A bid object.
   */
  export interface IBidObject<B extends BidderCode, T> {
    /**
     * Unique code identifying the bidder. For bidder codes, see the [bidder param reference](https://prebid.org/dev-docs/bidders.html).
     * @see https://prebid.org/dev-docs/bidders.html
     */
    readonly bidder: B;

    /**
     * Bid request parameters for a given bidder. For allowed params, see the [bidder param reference](https://prebid.org/dev-docs/bidders.html).
     * @see https://prebid.org/dev-docs/bidders.html
     */
    readonly params: T;

    /**
     * Used for [conditional ads](https://prebid.org/dev-docs/conditional-ad-units.html).
     * Works with sizeConfig argument to [pbjs.setConfig](https://prebid.org/dev-docs/publisher-api-reference.html#setConfig-Configure-Responsive-Ads).
     *
     * Note: will be removed by the ad tag and thus hidden for prebid
     *
     * @see https://prebid.org/dev-docs/conditional-ad-units.html
     * @see https://prebid.org/dev-docs/publisher-api-reference.html#setConfig-Configure-Responsive-Ads
     */
    readonly labelAny?: string[];

    /**
     * Used for [conditional ads](https://prebid.org/dev-docs/conditional-ad-units.html).
     * Works with sizeConfig argument to [pbjs.setConfig](https://prebid.org/dev-docs/publisher-api-reference.html#setConfig-Configure-Responsive-Ads).
     *
     * Note: will be removed by the ad tag and thus hidden for prebid
     *
     * @see https://prebid.org/dev-docs/conditional-ad-units.html
     * @see https://prebid.org/dev-docs/publisher-api-reference.html#setConfig-Configure-Responsive-Ads
     */
    readonly labelAll?: string[];

    /**
     * Only available with the s2sTesting module.
     * Overrides the global bidSource configuration
     */
    readonly bidSource?: server.BidSource;
  }

  /**
   * Criteo bid parameters. There is no public available documentation. All information was
   * gathered from the prebid.js criteo adapter implementation.
   *
   * @see https://github.com/prebid/Prebid.js/blob/master/modules/criteoBidAdapter.js
   */
  export interface ICriteoParams {
    /**
     * Included for legacy integrations that require a zone id.
     */
    readonly zoneId?: number;

    /**
     * Required for all new criteo implementations
     */
    readonly networkId: number;

    /**
     * Used for reporting: we use de div-id here.
     */
    readonly publisherSubId?: string;
  }

  export interface ICriteoBid extends IBidObject<typeof Criteo, ICriteoParams> {}

  export interface IAppNexusASTKeyword {
    [key: string]: string[];
  }

  /**
   * AppNexusAST bid parameters.
   *
   * The type definition may not be complete as only the actually used (or tested)
   * fields are being modelled in this definition.
   *
   * @see https://prebid.org/dev-docs/bidders.html#appnexusAst
   */
  export interface IAppNexusASTParams {
    /**
     * The placement ID from AppNexus. You may identify a placement using the `invCode`
     * and `member` instead of a placement ID.
     */
    readonly placementId: string;

    /**
     * If true, ads smaller than the values in your ad unit's sizes array will be allowed to serve.
     * Defaults to false.
     */
    readonly allowSmallerSizes?: boolean;

    /**
     * A set of key-value pairs applied to all ad slots on the page.
     * Mapped to query string segments for buy-side targeting.
     *
     * Example:
     *
     * keywords: { genre: ['rock', 'pop'] }
     */
    readonly keywords?: IAppNexusASTKeyword;

    /**
     * Sets a floor price for the bid that is returned.
     */
    readonly reserve?: number;

    /**
     * Optional configuration for video placements
     * @see https://prebid.org/dev-docs/bidders.html#appnexus-video-object
     */
    readonly video?: {
      /**
       * Array of strings listing the content MIME types supported
       */
      readonly mimes?: string[];

      /**
       *  Integer that defines the minimum video ad duration in seconds.
       */
      readonly minduration?: number;

      /**
       * Integer that defines the maximum video ad duration in seconds.
       */
      readonly maxduration?: number;

      /**
       * Integer that determines whether to show the ad before, during, or after video content.
       * If > 0, position is mid-roll and value indicates start delay, in seconds.
       * Allowed values: Pre-roll: 0 (default); Mid-roll: -1 ; Post-roll: -2.
       */
      readonly startdelay?: number;

      /**
       * Boolean which, if true, means the user can click a button to skip the video ad.
       * Defaults to false.
       */
      readonly skippable?: boolean;

      /**
       * playback_method  Array of strings listing playback methods supported by the publisher.
       */
      readonly playback_method?: Array<
        | 'auto_play_sound_on'
        | 'auto_play_sound_off'
        | 'click_to_play'
        | 'mouseover'
        | 'auto_play_sound_unknown'
      >;

      /**
       *  Array of integers listing API frameworks supported by the publisher.
       *  Allowed values:
       *    0: None
       *    1: VPAID 1.0
       *    2: VPAID 2.0
       *    3: MRAID 1.0:
       *    4: ORMMA
       *    5: MRAID 2.0
       */
      readonly frameworks?: Array<0 | 1 | 2 | 3 | 4 | 5>;
    };
  }

  /**
   * AppNexus bid object.
   */
  export interface IAppNexusASTBid
    extends IBidObject<typeof AppNexusAst | typeof AppNexus, IAppNexusASTParams> {}

  /**
   * ImproveDigital bid parameters.
   *
   * @see https://github.com/prebid/Prebid.js/blob/master/modules/improvedigitalBidAdapter.js
   * @see https://prebid.org/dev-docs/bidders/improvedigital.html
   */
  export interface IImproveDigitalParams {
    readonly placementId: number;
    /**
     * Optional field to add additional targeting values.
     * Arbitrary keys can be added. The value is always a string array.
     */
    readonly keyValues?: {
      /** key value map */
      [key: string]: string[];
    };

    /**
     * Bid floor price
     *
     * @example 0.01
     */
    readonly bidFloor?: number;

    /**
     * Bid floor price currency. Supported values: USD (default), EUR, GBP, AUD, DKK, SEK, CZK, CHF, NOK
     */
    readonly bidFloorCur?: 'EUR';
  }

  /**
   * ImproveDigital bid object.
   */
  export interface IImproveDigitalBid
    extends IBidObject<typeof ImproveDigital, IImproveDigitalParams> {}

  /**
   * IndexExchange bid parameters.
   *
   * @see https://github.com/prebid/Prebid.js/blob/master/modules/indexExchangeBidAdapter.js
   * @see Documentation https://prebid.org/dev-docs/bidders/indexExchange.html
   */
  export interface IIndexExchangeParams {
    /**
     * An IX-specific identifier that is associated with a specific size on this ad unit. This is similar to
     * a placement ID or an ad unit ID that some other modules have.
     */
    readonly siteId: string;

    /**
     * The single size associated with the site ID. It should be one of the sizes listed in the ad unit under
     * `adUnits[].sizes` or `adUnits[].mediaTypes.banner.sizes`.
     *
     * Note that the 'ix' Prebid Server bid adapter ignores this parameter.
     */
    readonly size: [number, number];

    /**
     * Taken from source code:
     * @see https://github.com/prebid/Prebid.js/blob/3.9.0/modules/ixBidAdapter.js#L363-L371
     *
     * You must set the `bidFloorCur` parameter as well if you set this
     */
    readonly bidFloor?: number;

    /**
     * only required if the `bidFloor` parameter is set
     */
    readonly bidFloorCur?: 'EUR';
  }

  /**
   * IndexExchange bid object.
   */
  export interface IIndexExchangeBid
    extends IBidObject<typeof IndexExchange, IIndexExchangeParams> {}

  // ----- JustPremium ----- //

  export const JustPremiumPushUpBillboard = 'pu';
  export const JustPremiumPushDownBillboard = 'pd';
  export const JustPremiumFloorAd = 'fa';
  export const JustPremiumClassicFloorAd = 'cf';
  export const JustPremiumSideAd = 'sa';
  export const JustPremiumWallpaper = 'wp';
  export const JustPremiumMobileScroller = 'is';
  export const JustPremiumMobileSkin = 'mt';
  export const JustPremiumCascadeAd = 'ca';

  /**
   * The JustPremium HeaderBidding Guide offers a complete list of all formats.
   * This type only contains the formats in use.
   *
   * IMPORTANT: The format identifier is used by the prebid adapter to identify the correct adslot.
   *            AdUnit and DOM id are irrelevant. Make sure that the allow / exclude settings are
   *            unique for each ad slot. Otherwise only one ad slot will be filled, while the others
   *            stay empty.
   */
  export type JustPremiumFormat =
    | typeof JustPremiumPushUpBillboard
    | typeof JustPremiumPushDownBillboard
    | typeof JustPremiumFloorAd
    | typeof JustPremiumClassicFloorAd
    | typeof JustPremiumSideAd
    | typeof JustPremiumWallpaper
    | typeof JustPremiumMobileScroller
    | typeof JustPremiumMobileSkin
    | typeof JustPremiumCascadeAd;

  /**
   * JustPremium bid parameters
   */
  export interface IJustPremiumParams {
    /**
     * The zone ID provided by JustPremium.
     */
    readonly zone: string;

    /**
     * Permits a publisher to decide which products can be run from a specific ad unit
     */
    readonly allow?: Array<JustPremiumFormat>;

    /**
     * Permits a publisher to decide which products should be excluded from running in specific ad unit
     */
    readonly exclude?: Array<JustPremiumFormat>;
  }

  export interface IJustPremiumBid extends IBidObject<typeof JustPremium, IJustPremiumParams> {}

  export interface IPubMaticParams {
    /**
     *
     */
    readonly publisherId: string;

    /**
     * The adslot definition encodes the ad slot name and size.
     *
     * Format : [adSlot name| adSlot id]@[width]x[height]
     * Example: pubmatic_test@300x250
     * Example: 123456@300x250
     */
    readonly adSlot: string;

    /**
     * Bid Floor
     *
     * @example '1.75'
     */
    readonly kadfloor?: string;

    /**
     * Bid currency
     * Value configured only in the 1st adunit will be passed on.
     * Values if present in subsequent adunits, will be ignored.
     */
    readonly currency?: 'EUR' | 'USD';

    /**
     * Oustream AdUnit described in Blue BillyWig UI. This field is mandatory if mimeType is described as video and
     * context is outstream (i.e., for outstream videos).
     *
     * The code calls this 'rendererCode'.
     *
     * @example 'renderer_test_pubmatic'
     */
    readonly outstreamAU?: string;
  }

  export interface IPubMaticBid extends IBidObject<typeof PubMatic, IPubMaticParams> {}

  /**
   * NanoInteractive bid parameters.
   *
   * @see https://github.com/prebid/Prebid.js/blob/master/modules/nanointeractiveBidAdapter.js
   */
  export interface INanoInteractiveParams {
    /* security code */
    readonly sec: string;
    /* data partner id */
    readonly dpid: string;
    /* pixel id */
    readonly pid: string;
    /* tags */
    readonly nq?: string;
    /* url query param name */
    readonly name?: string;
    /* marketing channel (tier1) */
    readonly category: string;
  }

  /**
   * NanoInteractive bid object.
   */
  export interface INanoInteractiveBid
    extends IBidObject<typeof NanoInteractive, INanoInteractiveParams> {}

  /**
   * OpenX bid parameters
   *
   * @see https://prebid.org/dev-docs/bidders/openx.html
   *
   */
  export interface IOpenxParams {
    /**
     * OpenX delivery domain provided by your OpenX representative.
     * example: "PUBLISHER-d.openx.net"
     */
    delDomain: string;

    /**
     * OpenX ad unit ID provided by your OpenX representative.
     * example: "1611023122"
     */
    unit: string;

    /**
     * Minimum price in `USD`. customFloor applies to a specific unit. For example,
     * use the following value to set a $1.50 floor: 1.50
     *
     * *WARNING:*
     * Misuse of this parameter can impact revenue
     */
    readonly customFloor?: number;
  }

  /**
   * OpenX bid object
   */
  export interface IOpenxBid extends IBidObject<typeof OpenX, IOpenxParams> {}

  /**
   * Smart bid parameters
   *
   * @see https://prebid.org/dev-docs/bidders/smartadserver.html
   *
   */
  export interface ISmartAdServerParams {
    /**
     * The network domain
     * example: "https://prg.smartadserver.com"
     */
    readonly domain: string;

    /**
     * The placement site ID
     * example: 1234
     */
    readonly siteId: number;

    /**
     * The placement page ID
     * examples: 1234
     */
    readonly pageId: number;

    /**
     *  The placement format ID
     *  example: 1234
     */
    readonly formatId: number;

    /**
     * Override the default currency code (ISO 4217) of the ad request. (Default: 'USD')
     */
    readonly currency?: 'EUR' | 'USD';

    /**
     * Bid floor for this placement in USD or in the currency specified by the currency parameter. (Default: 0.0)
     */
    readonly bidfloor?: number;
  }

  /**
   * Smart bid object
   */
  export interface ISmartAdServerBid
    extends IBidObject<typeof SmartAdServer, ISmartAdServerParams> {}

  /**
   * Unruly bid parameters
   *
   * @see https://prebid.org/dev-docs/bidders#unruly
   */
  export interface IUnrulyParams {
    /**
     * The site ID from Unruly.
     */
    readonly siteId: number;

    /**
     * The targeting UUID from Unruly.
     *
     * @deprecated this field is still marked as required in the docs, but is never used nor provided by unruly
     */
    readonly targetingUUID?: string;
  }

  /**
   * Unruly bid object
   */
  export interface IUnrulyBid extends IBidObject<typeof Unruly, IUnrulyParams> {}

  /**
   * Teads bid parameters
   *
   * @see https://prebid.org/dev-docs/bidders#teads
   */
  export interface ITeadsParams {
    /**
     * Teads page id.
     */
    pageId: number;

    /**
     * Teads placement id.
     */
    placementId: number;
  }

  /**
   * Teads bid object
   */
  export interface ITeadsBid extends IBidObject<typeof Teads, ITeadsParams> {}

  export interface IYieldlabParams {
    /**
     * Yieldlab Adslot ID
     */
    readonly adslotId: string;

    /**
     * Yieldlab Supply ID. Please reach out to your account management for more information.
     */
    readonly supplyId: string;

    /**
     *  Override the default prebid size.
     *
     *  The current implementation takes the the first size from the sizes array and uses
     *  it. As we have a mulit-size setup, this doesn't work. So this parameter is required
     *  for us.
     *
     *  @example 970x250
     */
    readonly adSize: string;

    /**
     * A simple key-value map
     */
    readonly targeting?: { [key: string]: string };
  }

  /**
   * Yieldlab bid object
   */
  export interface IYieldlabBid extends IBidObject<typeof Yieldlab, IYieldlabParams> {}

  /**
   * Spotx bid parameters.
   *
   *
   * @see Implementation [[https://github.com/prebid/Prebid.js/blob/master/modules/spotxBidAdapter.js]]
   * @see Documentation [[https://prebid.org/dev-docs/bidders/spotx.html]]
   * @see Integration [[https://github.com/prebid/Prebid.js/pull/3472]]
   * @since Prebid `2.1.0`
   */
  export interface ISpotxParams {
    /**
     * A unique 5 digit ID that is generated by the SpotX publisher platform when a channel is created.
     *
     * @example `'85394'`
     */
    readonly channel_id: string;

    /**
     * Token that describes which ad unit to play: instream or outstream.
     *
     * @example `'outstream'`
     */
    readonly ad_unit: 'instream' | 'outstream';

    /**
     * Object to set options on the renderer.
     */
    readonly outstream_options: {
      /**
       * ID of element that video ad should be rendered into.
       *
       * @example `'adSlot1`'
       */
      readonly slot: string;

      /**
       * Boolean identifying whether the reqeusts should be https or not (used to override the protocol if the page isn't secure.
       */
      readonly secure?: boolean;

      /**
       * List of mimetypes to allow in ad.
       */
      readonly mimes?: Array<
        'application/javascript' | 'video/mp4' | 'video/webm' | 'application/x-shockwave-flash'
      >;

      /**
       * Set to true to start the ad with the volume muted.
       */
      readonly ad_mute?: boolean;

      /**
       * Set to true to make video auto-adapt to the ad's dimensions
       */
      readonly playersize_auto_adapt?: boolean;

      /**
       * ID of iFrame element to insert EASI script tag.
       */
      readonly in_iframe?: string;

      /**
       * Object of script tag attributes to override from the list of EASI Attributes.
       *
       * @see [[https://developer.spotxchange.com/content/local/docs/sdkDocs/EASI/README.md#common-javascript-attributes]]
       */
      readonly custom_override?: {
        /**
         * Autoplay is the default behavior where 1=autoplay and 0=user or publisher initiated.
         */
        readonly autoplay?: 0 | 1;

        /**
         * The desired width of the video ad placement. Requires `content_height` to also be set.
         *
         * @example `'640'`
         */
        readonly content_width?: string;

        /**
         * The desired height of the video ad placement. Requires content_width to also be set.
         *
         * @example `'480'`
         */
        readonly content_height?: string;
      };
    };

    /**
     * Value between 0 and 1 to denote the volume the ad should start at.
     */
    readonly ad_volume?: number;

    /**
     * Set to true to hide the spotx skin
     */
    readonly hide_skin?: boolean;

    /**
     * Configure key-value targeting
     *
     * @see [[https://developer.spotxchange.com/content/local/docs/sdkDocs/DirectSdk/README.md#custom-property-for-key-value-pair-reporting]]
     */
    readonly custom?: { [key: string]: string | number | string[] };
  }

  /**
   * SpotX bid object.
   */
  export interface ISpotXBid extends IBidObject<typeof Spotx, ISpotxParams> {}

  export interface IShowHeroesParams {
    /**
     * ShowHeroes player ID
     * @example '0151f985-fb1a-4f37-bb26-cfc62e43ec05'
     */
    readonly playerId: string;

    /**
     * Vpaid wrapper
     *
     * default: `false`
     */
    readonly vpaidMode?: boolean;
  }

  /**
   * ShowHeroes bid object
   *
   * Request are being made to `https://bs1.showheroes.com/api/v1/bid`
   *
   * @see [[http://prebid.org/dev-docs/bidders/showheroes.html]]
   */
  export interface IShowHeroesBid extends IBidObject<typeof ShowHeroes, IShowHeroesParams> {}

  export interface IXaxisParams {
    /**
     * placement id
     */
    readonly placementId: string;

    /**
     * A set of key-value pairs applied to all ad slots on the page.
     * Mapped to query string segments for buy-side targeting.
     *
     * Example:
     *
     * keywords: { genre: ['rock', 'pop'] }
     */
    readonly keywords?: IAppNexusASTKeyword;

    /**
     * Sets a floor price for the bid that is returned.
     */
    readonly reserve?: number;
  }

  /**
   * Xaxis / GroupM bid object
   *
   * Request are being made to `https://ib.adnxs.com/ut/v3/prebid` (App Nexus Ad Server).
   *
   * `Deal ID` Ad Server Key: `hb_deal_xhb`
   *
   * @see [[http://prebid.org/dev-docs/bidders/xaxis.html]]
   */
  export interface IXaxisBid extends IBidObject<typeof Xaxis, IXaxisParams> {}

  export interface IDSPXParams {
    /**
     * placement id
     */
    readonly placement: string;

    /**
     * enables local development mode
     */
    readonly devMode?: boolean;

    /**
     * Selection filter
     */
    readonly pfilter?: {
      /**
       * floor price in EUR * 1.000.000
       */
      readonly floorprice?: number;

      /**
       * Is private auction?  0  - no, 1 - yes
       */
      readonly private_auction?: 0 | 1;

      /**
       * configure the DOM ID of the ad slots where the creative should be injected
       */
      readonly injTagId?: string;
    };
  }

  /**
   * DSPX (Screen on Demand)
   *
   * Request are being made to `https://buyer.dspx.tv/request/`.
   * In dev mode requrest are being made to `https://dcbuyer.dspx.tv/request/`
   *
   *
   * @see [[https://prebid.org/dev-docs/bidders/dspx.html]]
   */
  export interface IDSPXBid extends IBidObject<typeof DSPX, IDSPXParams> {}

  /**
   * @see http://prebid.org/dev-docs/bidders/rubicon.html
   */
  export interface IRubiconParams {
    /**
     * The publisher account ID
     * @example '4934'
     */
    readonly accountId: string;

    /**
     *  The site ID
     * @example '13945'
     */
    readonly siteId: string;

    /**
     * The zone ID
     * @example '23948'
     */
    readonly zoneId: string;

    /**
     * Array of Rubicon Project size IDs. If not specified, the system will try to
     * convert from the AdUnit's mediaTypes.banner.sizes.
     */
    readonly sizes?: number[];

    /**
     * An object defining arbitrary key-value pairs concerning the page for use in targeting. The values must be arrays.
     * @example `{"rating":["5-star"], "prodtype":["tech","mobile"]}`
     */
    readonly inventory?: { [key: string]: string[] };

    /**
     * An object defining arbitrary key-value pairs concerning the visitor for use in targeting. The values must be arrays.
     * @example `{"ucat":["new"], "search":["iphone"]}`
     */
    readonly visitor?: { [key: string]: string[] };

    /**
     * Set the page position. Valid values are “atf” and “btf”.
     */
    readonly position?: 'atf' | 'btf';

    /**
     * Site-specific user ID may be reflected back in creatives for analysis.
     * Note that userId needs to be the same for all slots.
     */
    readonly userId?: string;

    /**
     * Sets the global floor – no bids will be made under this value.
     * @example 0.50
     */
    readonly floor?: number;

    /**
     * Video targeting parameters
     * Required for video
     */
    readonly video?: {
      /**
       *  Video player width in pixels. If not specified, takes width set in mediaTypes.video.playerSize
       *  @example '640'
       */
      readonly playerWidth?: string;

      /**
       *  Video player height in pixels. If not specified, takes height set in mediaTypes.video.playerSize
       *  @example '360'
       */
      readonly playerHeight?: string;

      /**
       * Indicates the language of the content video, in ISO 639-1/alpha2. Highly recommended for successful
       * monetization for pre-, mid-, and post-roll video ads. Not applicable for interstitial and outstream.
       */
      readonly language?: string;
    };
  }

  /**
   * @see http://prebid.org/dev-docs/bidders/rubicon.html
   */
  export interface IRubiconBid extends IBidObject<typeof Rubicon, IRubiconParams> {}

  /**
   * @see https://docs.prebid.org/dev-docs/bidders/visx.html
   */
  export interface IVisxParams {
    /**
     * The publisher's ad unit ID in VIS.X
     *
     * For prebid.js it should be string (number is probably fine too)
     * For prebid server it must be number
     *
     * @example `'903536'` or `903536`
     */
    readonly uid: string | number;
  }

  /**
   * @see https://docs.prebid.org/dev-docs/bidders/visx.html
   */
  export interface IVisxBid extends IBidObject<typeof Visx, IVisxParams> {}

  /**
   * @see https://docs.prebid.org/dev-docs/bidders/rads.html
   */
  export interface IRecognifiedParams {
    /**
     * Placement ID from Rads.
     * @example `'101'`
     */
    readonly placement: string;
  }

  /**
   * @see https://docs.prebid.org/dev-docs/bidders/rads.html
   */
  export interface IRecognifiedBid extends IBidObject<typeof Recognified, IRecognifiedParams> {}

  /**
   * Supported bid object types.
   */
  export type IBid =
    | ICriteoBid
    | IAppNexusASTBid
    | IImproveDigitalBid
    | IIndexExchangeBid
    | IJustPremiumBid
    | INanoInteractiveBid
    | IPubMaticBid
    | IOpenxBid
    | ISmartAdServerBid
    | IUnrulyBid
    | ITeadsBid
    | IYieldlabBid
    | ISpotXBid
    | IShowHeroesBid
    | IXaxisBid
    | IDSPXBid
    | IRubiconBid
    | IRecognifiedBid
    | IVisxBid;

  /**
   * Request bids. When adUnits or adUnitCodes are not specified, request bids for all ad units added.
   */
  export interface IRequestObj {
    /**
     * adUnit codes to request. Use this or requestObj.adUnits
     */
    adUnitCodes?: string[];

    /**
     * AdUnitObjects to request. Use this or requestObj.adUnitCodes
     */
    adUnits?: string[];

    /**
     * Timeout for requesting the bids specified in milliseconds
     */
    readonly timeout?: number;

    /**
     *  Defines labels that may be matched on ad unit targeting conditions.
     */
    readonly labels?: string[];

    /**
     * Callback to execute when all the bid responses are back or the timeout hits.
     * @param bidResponses contains all valid SSP responses
     * @param timedOut - true if the handler was called due to hitting the timeout. false others
     */
    readonly bidsBackHandler?: (bidResponses?: IBidResponsesMap, timedOut?: boolean) => void;
  }

  /**
   * The Object returned by the bidsBackHandler when requesting the Prebidjs bids.
   */
  export interface IBidResponsesMap {
    /**
     * The adUnit code, e.g. 'ad-presenter-desktop'
     */
    [adUnitCode: string]:
      | {
          /**
           * The bids that were returned by prebid
           */
          bids: prebidjs.BidResponse[];
        }
      | undefined;
  }

  /**
   * Bid response object.
   *
   * ## Concrete BidResponse types
   *
   * You can add specific response types for every header bid if necessary by
   *
   * 1. Creating a new interface that extends IBidResponse
   * 2. Narrow the `bidder` property to the header bidder, e.g.
   *    readonly bidder: typeof JustPremium
   * 3. Add the interface to the `BidResponse` union type
   * 4. Match on the `bidder` (acts as the union discriminator) to get the specific response you want.
   *
   */
  export interface IBidResponse {
    /**
     * The bidder code.
     */
    readonly bidder: BidderCode;

    /**
     * The exact bid price from the bidder.
     */
    readonly cpm: number;

    /**
     * The unique identifier of a bid creative.
     */
    readonly adId: string;

    /**
     * The width of the returned creative size.
     */
    readonly width: number;

    /**
     * The height of the returned creative size.
     */
    readonly height: number;

    /**
     * The media type of the bid response
     */
    readonly mediaType: 'banner' | 'video' | 'display';

    /**
     * Origin of the bid
     */
    readonly source: 'client' | 'server';

    /**
     * (Optional) If the bid is associated with a Deal, this field contains the deal ID.
     */
    readonly dealId?: string;
  }

  export interface IGenericBidResponse extends IBidResponse {
    /**
     * The bidder code.
     *
     * Excludes all the bidder codes which have a more specific implementation.
     * Add more bidders by extending the union type, e.g.
     *
     * ```
     * Exclude<BidderCode, typeof JustPremium | typeof AppNexusAst>;
     * ```
     */
    readonly bidder: Exclude<BidderCode, typeof JustPremium>;
  }

  export interface IJustPremiumBidResponse extends IBidResponse {
    /**
     * narrow this bid response type to justpremium
     */
    readonly bidder: typeof JustPremium;

    /**
     * The format that justpremium wants to deliever
     */
    readonly format: JustPremiumFormat;
  }

  export type BidResponse = IGenericBidResponse | IJustPremiumBidResponse;

  /**
   * The bidderSettings object provides a way to define some behaviors for the platform
   * and specific adapters. The basic structure is a 'standard' section with defaults for
   * all adapters, and then one or more adapter-specific sections that override behavior
   * for that bidder.
   *
   * Defining bidderSettings is optional; the platform has default values for all of the options. Adapters may specify their own default settings, though this isn't common. Some sample scenarios where publishers may wish to alter the default settings:
   *
   * - using bidder-specific ad server targeting instead of Prebid-standard targeting
   * - passing additional information to the ad server
   * - adjusting the bid CPM sent to the ad server
   *
   * @see https://prebid.org/dev-docs/publisher-api-reference.html#module_pbjs.bidderSettings
   */
  export type IBidderSettings = {
    /**
     * `standard` is used as a fallback if the SSP has no custom bidder settings
     */
    [bidder in BidderCode | 'standard']?: IBidderSetting;
  };

  /**
   * @see https://prebid.org/dev-docs/publisher-api-reference.html#module_pbjs.bidderSettings
   */
  export interface IBidderSetting {
    /**
     * Define which key/value pairs are sent to the ad server.
     */
    readonly adserverTargeting: IAdServerTargeting[];

    /**
     * Some bidders return gross prices instead of the net prices (what the publisher will actually get paid).
     * For example, a publisher's net price might be 15% below the returned gross price. In this case, the publisher may
     * want to adjust the bidder's returned price to run a true header bidding auction.
     * Otherwise, this bidder's gross price will unfairly win over your other demand sources who report the real price.
     */
    readonly bidCpmAdjustment?: (bidCpm: number, bid: IBidResponse) => number;
  }

  /**
   * For each bidder's bid, Prebid.js will set 4 keys (hb_bidder, hb_adid, hb_pb, hb_size) with their corresponding
   * values. The key value pair targeting is applied to the bid's corresponding ad unit. Your ad ops team will have the
   * ad server's line items target these keys.
   *
   *  If you'd like to customize the key value pairs, you can overwrite the settings as the below example shows.
   *  Note that once you updated the settings, let your ad ops team know about the change, so they can update the line
   *  item targeting accordingly. See the Ad Ops documentation for more information.
   *
   *  There's no need to include this code if you choose to use the below default setting.
   */
  export interface IAdServerTargeting {
    readonly key: string;

    /**
     * @param bidResponse returns the key value value. May be undefined, e.g. for `dealId` if not set
     */
    val(bidResponse: IBidResponse): string | undefined;
  }
}
