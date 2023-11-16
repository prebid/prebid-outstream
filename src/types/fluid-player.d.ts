/**
 * These types are incomplete and only based on the usage by
 * this library, before introducing typescript.
 */

declare module 'fluid-player' {
    export type FluidPlayerConfig = {
        vastOptions: {
            skipButtonCaption: string;
            skipButtonClickCaption: string;
            adText: string;
            adTextPosition: string;
            adCTAText: boolean;
            adCTATextPosition: string;
            vastTimeout: number;
            /**
             * Default false
             */
            showPlayButton: boolean;
            maxAllowedVastTagRedirects: number;
            /**
             * Default false
             */
            allowVPAID: boolean;
            /**
             * Default false
             */
            showProgressbarMarkers: boolean;
            /**
             * Default true
             */
            adClickable: boolean;
            adList: [
                {
                    roll: string;
                    vastTag: string;
                }
            ];
            vastAdvanced: {
                vastLoadedCallback: () => void;
                noVastVideoCallback: () => void;
                vastVideoSkippedCallback: () => void;
                vastVideoEndedCallback: () => void;
            };
        };
        captions: {
            play: string;
            pause: string;
            mute: string;
            unmute: string;
            fullscreen: string;
            exitFullscreen: string;
        };
        layoutControls: {
            playButtonShowing: boolean;
            autoPlay: boolean;
            preload: boolean;
            mute: boolean;
            doubleclickFullscreen: boolean;
            controlBar: {
                /**
                 * Default false
                 */
                autoHide: boolean;
                /**
                 * Default 3
                 */
                autoHideTimeout: number;
                /**
                 * Default true
                 */
                animated: boolean;
            };
            controlForwardBackward: {
                /**
                 * Default false
                 */
                show: boolean;
            };
            playerInitCallback: () => void;
            persistentSettings: {
                /**
                 * Default true
                 */
                volume: boolean;
                /**
                 * Default true
                 */
                quality: boolean;
                /**
                 * Default true
                 */
                speed: boolean;
                /**
                 * Default true
                 */
                theatre: boolean;
            };
            /**
             * Default true
             */
            allowTheatre: boolean;
            theatreSettings: {
                /**
                 * Default '100%'
                 */
                width: string;
                /**
                 * Default '60%'
                 */
                height: string;
                /**
                 * Default 0
                 */
                marginTop: number;
                horizontalAlign: string; // 'left', 'right' or 'center'
            };
            /**
             * Default false
             */
            playbackRateEnabled: boolean;
            /**
             * Default false
             */
            allowDownload: boolean;
            /**
             * Default 'default'
             */
            layout: string;
            htmlOnPauseBlock: {
                /**
                 * Default null
                 */
                html: string;
                /**
                 * Default null
                 */
                height: number;
                /**
                 * Default null
                 */
                width: number;
            };
            logo: {
                /**
                 * Default null
                 */
                imageUrl: string | null;
                /**
                 * Default 'top left'
                 */
                position: string;
                /**
                 * Default null
                 */
                clickUrl: string | null;
                /**
                 * Default 1
                 */
                opacity: number;
                /**
                 * Default null
                 */
                mouseOverImageUrl: string | null;
                /**
                 * Default '2px'
                 */
                imageMargin: string;
                /**
                 * Default false
                 */
                hideWithControls: boolean;
                /**
                 * Default false
                 */
                showOverAds: string;
            };
            /**
             * Default false
             */
            loop: boolean;
            title: string;
            /**
             * Default true
             */
            keyboardControl: boolean;
            /**
             * Default false
             */
            subtitlesEnabled: boolean;
            /**
             * Default true
             */
            fillToContainer: boolean;
            /**
             * Default true
             */
            playPauseAnimation: boolean;
            /**
             * Default false
             */
            posterImage: boolean;
            showCardBoardView: boolean;
            showCardBoardJoystick: boolean;
        };
    };

    export interface FluidPlayer {
        play: () => void;
        pause: () => void;
        on(
            event:
                | 'pause'
                | 'playing'
                | 'ended'
                | 'play'
                | 'seeked'
                | 'theatreModeOn'
                | 'theatreModeOff',
            callback: () => void
        ): void;
        on(event: 'timeupdate', callback: (time: number) => void): void;
    }

    export default function (id: string, config: FluidPlayerConfig): FluidPlayer;
}
