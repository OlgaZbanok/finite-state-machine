class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error();
        else {
            this.config = config;
            this.currentState = this.config['initial'];
            this.nextState = "";
            this.prevState = "";
        }
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (! (state in this.config.states)) {
            throw new Error();
        }
        else {
            this.prevState = this.currentState;
            this.currentState = state;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let trans="";
        if (!(event in this.config.states[this.currentState]['transitions'])) 
            throw new Error();
        for (let val in (this.config.states[this.currentState]['transitions'])){
            if (event == val) {
                this.prevState = this.currentState;
                this.currentState =  this.config.states[this.currentState]['transitions'][val];
                return this;
            }
        }
    }
    

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config['initial'];
        return this;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states=[];
        if (!event){
            for (let st in this.config.states){
                states.push(st);
            }
        }
         else {
            for (let st in this.config.states) {
                for (let val in (this.config.states[st]['transitions'])){
                    if (event == val) {
                        states.push(st);
                    }
                }
             }
         }
        return states;
}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if ((this.prevState == "")||(this.prevState == ""))
        return false;
        if (this.prevState == this.currentState)
            return false;    
        this.nextState = this.currentState;    
        this.currentState = this.prevState;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState =="") 
            return false;
        if (this.nextState == this.currentState)
            return false;
        this.currentState = this.nextState;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState="";
        this.nextState="";
        this.currentState =  this.config['initial'];
        return this;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
