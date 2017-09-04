/*
    Content Script

	Chrome Extension - Skip Thumb Down in Google Music

    @author: jldupont
 */

const EXT_NAME = "SkipThumbDown";
const sel_button_next = "#player-bar-forward";
const sel_is_current_track_thumb_down = ".now-playing-actions paper-icon-button[data-rating][icon='sj:thumb-down-outline']";

const SECOND = 1000;
const INTERVAL_CHECK = 0.5 * SECOND;

/*
  The only way I found to determine if the current
  track is "thumb down" is to look for "Undo" string
  in the button's title.
*/
function checkIfThumbDown(obj) {
	
	if (obj)
		return obj.title.indexOf("Undo") != -1;

	return false;
};

function doSkipCurrentTrack() {
	var obj_btn_next = document.querySelector(sel_button_next);
	obj_btn_next.click();	
};

/*
	Regularly check if the current track has a
	"thumb down" and if so, skip it.
*/
function setupCurrentTrackChecker() {

	window.setInterval(function(){

		var obj_thumb_down = document.querySelector(sel_is_current_track_thumb_down);

		if (!obj_thumb_down) {
			// It is quite possible not all the UI is initialized yet
			//console.error(EXT_NAME + ": could not find thumb down button");
			return;
		}

		if (checkIfThumbDown(obj_thumb_down)) {
			console.log(EXT_NAME + ": skipping");
			doSkipCurrentTrack();
		}

	}, INTERVAL_CHECK);

};

(function() {

	setupCurrentTrackChecker();

})();

