/*
**  Caps Lock Indicator
**  Uses Javascript as a type of state machine to keep up with the state of caps lock for a particular
**  element on the page.  The caps on vs caps off can be styled using CSS.
**  by Kevin Cox
*/
var CapsLockState_Enum = {Off:0, On:1, Unknown:3 }; 

var CapsLock_Indicator = function(elementId, onStyleClass, offStyleClass) {
    this.inputElementId = elementId;                    // 
    this.capsLockOnStyleClass = onStyleClass;           // Caps Lock On CSS Style
    this.capsLockOffStyleClass = offStyleClass;         // Caps Lock Off CSS Style 
    this.capsLockState = CapsLockState_Enum.Unknown;    // The current state of the caps lock.
    this.debug = true;                                 // Set to true for debug messages on the console.
};

CapsLock_Indicator.prototype = function() {

    // 'Private' functions
    // Toggles the style class on the Caps lock indicator based on
    // the caps lock state.
    var toggleCapsLockIndicatorStyleClass = function() {
        
        logDebugMessage.call(this, `toggleCapsLockIndicatorStyleClass function fired`);

        // If the state of the caps lock is unknown, then turn off the indicator.
        if (this.capsLockState === CapsLockState_Enum.Unknown) {
            logDebugMessage.call(this, `capsLockState is unknown.`);
            var currentStyleClass = this.inputElementId.className;

            if (currentStyleClass === this.capsLockOnStyleClass) {
                this.inputElementId.classList.remove(this.capsLockOnStyleClass);
                this.inputElementId.classList.add(this.capsLockOffStyleClass);
            }

        } else if (this.capsLockState === CapsLockState_Enum.On) {
            logDebugMessage.call(this, `capsLockState is on.`);
            this.inputElementId.classList.remove(this.capsLockOffStyleClass);
            this.inputElementId.classList.add(this.capsLockOnStyleClass);
        } else if (this.capsLockState === CapsLockState_Enum.Off) {
            logDebugMessage.call(this, `capsLockState is off.`);
            this.inputElementId.classList.remove(this.capsLockOnStyleClass);
            this.inputElementId.classList.add(this.capsLockOffStyleClass);
        }
    },

    checkForCapsLock = function(e) {
        
        logDebugMessage.call(this, `checkForCapsLock function fired.`);

        if (!e) {
            e = window.event;
        }

        var priorCapsLockState = this.capsLockState;
        var charCode = (e.charCode ? e.charCode : e.keyCode);

        // Shift Off and Caps Lock Off - Lower Case
        if (charCode >= 97 && charCode <= 122 && !(e.shiftKey)) {
            this.capsLockState = CapsLockState_Enum.Off;
        } 
        // Shift On and Caps Lock On - Lower Case
        else if (charCode >= 97 && charCode <=122 && (e.shiftKey)) {
            this.capsLockState = CapsLockState_Enum.On;
        }
        // Shift Off and Caps Lock On - Upper Case
        else if (charCode >= 65 && charCode <= 90 && !(e.shiftKey)) {
            this.capsLockState = CapsLockState_Enum.On;
        }
        else {
            this.capsLockState = CapsLockState_Enum.Unknown;
        }

        if (this.capsLockState !== priorCapsLockState) {
            toggleCapsLockIndicatorStyleClass.call(this);
        }
    },

    // This function will fire any time the window looses focus.
    lostFocus = function() {
        logDebugMessage.call(this, `The triggered element ${this.inputElementId} lost focus.`);
        this.capsLockState = CapsLockState_Enum.Unknown;
        toggleCapsLockIndicatorStyleClass.call(this);
    },

    logDebugMessage = function(message) {
        if (this.debug) {
            console.log(message);
        }
    };

    // Exposed functions
    return {
        checkForCapsLock : checkForCapsLock,
        lostFocus : lostFocus
    };
}();

