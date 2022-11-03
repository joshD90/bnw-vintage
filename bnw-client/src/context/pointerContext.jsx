import React, { useState } from "react";
//initialize our pointer context
export const PointerContext = React.createContext();

//this pointer context allows us to disable the mouse pointer.  As this is for the shipping address
//and will be required in the navbar or the footer it is more practical to do this using context rather than
//passing props
const PointerContextProvider = (props) => {
  //control the context using state rather than reducer for simplification on this project
  const [pointerState, setPointerState] = useState(false);
  //this will return the context provider so that it can wrap the rest of the components and pass down
  //the state to its children
  return (
    <PointerContext.Provider value={{ pointerState, setPointerState }}>
      {props.children}
    </PointerContext.Provider>
  );
};

export default PointerContextProvider;
