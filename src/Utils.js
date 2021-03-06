import logger from './Logger';

class Utils {
    getScrollTop(){
        logger.debug("Inside Utils.getScrollTop method.");
        if(typeof pageYOffset !== 'undefined'){
            //most browsers except IE before #9
            return pageYOffset;
        }
        else{
            var B = document.body; //IE 'quirks'
            var D = document.documentElement; //IE with doctype
            D = (D.clientHeight) ? D : B;
            return D.scrollTop;
        }
    }

    getOffset(element) {
        logger.debug("Inside Utils.getOffset for element");
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Check if element is not present
        if(element === undefined || element === null){
            logger.warn("No element was passed to the Utils.getOffset method as a parameter.");
            return {
                top: scrollTop,
                left: scrollLeft
            };
        }
        var rect = element.getBoundingClientRect();
        return { 
            top: rect.top + scrollTop, 
            left: rect.left + scrollLeft 
        };
    }

    isOnScreen(elementId) {
        logger.debug("Inside Utils.isOnScreen for element ID: " + elementId);
        // if the element doesn't exist, abort
        if( typeof elementId !== 'string' ||
            elementId.length === 0 ||
            document.getElementById(elementId) === null
        ){
            logger.warn("No element present with element ID: " + elementId);
            return false;
        }
        var element = document.getElementById(elementId);

        var viewport_top = this.getScrollTop();
        var viewport_height = screen.availHeight;
        var viewport_bottom = viewport_top + viewport_height;
        
        var top = this.getOffset(element).top;
        var height = element.style.height;
        var bottom = top + height;
    
        return (top >= viewport_top && top < viewport_bottom) ||
        (bottom > viewport_top && bottom <= viewport_bottom) ||
        (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom);
    }

    closeFullscreen() {
        logger.debug("Inside Utils.closeFullscreen method.")
        let promise;
        if (document.exitFullscreen) {
            logger.log("Calling document.exitFullscreen.");
            promise = document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            logger.log("Calling document.mozCancelFullScreen.");
            promise = document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            logger.log("Calling document.webkitExitFullscreen.");
            promise = document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            logger.log("Calling document.msExitFullscreen.");
            promise = document.msExitFullscreen();
        }
        promise
            .then(() => logger.debug("Document exited from full screen mode."))
            .catch((err) => logger.debug("Not able to exit from full screen mode. Received error: " + JSON.stringify(err)));
    }
}

const utils = new Utils();
Object.freeze(utils);
export default utils;