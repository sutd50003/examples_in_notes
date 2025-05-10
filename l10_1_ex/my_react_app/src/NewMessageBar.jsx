import React from "react";

function NewMessageBar({message, onMessageChange, onSubmitClick}) {
    return (
        <div>
            <input type="text" aria-label="echo-message" placeholder="" 
                value={message} 
                onChange={(e) => {onMessageChange(e.target.value)}}>
            </input>
            <button onClick={onSubmitClick}> Submit </button>
        </div>
    )
}

export default NewMessageBar;