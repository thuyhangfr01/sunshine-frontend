import React, { useState, useEffect } from "react";
import Content from "./content"
const Test = () => {
    const [show, setShow] = useState(false);

    return (
        <div >
            <button
                onClick={() => setShow(!show)}>Toggle</button>
                {show && <Content/>}
        </div>
    )
}

export default Test;