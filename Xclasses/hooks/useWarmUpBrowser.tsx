import React from "react";
import * as WebBrowser from "expo-web-browser"; //custom hook
 
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync(); //warm up the browser when the component mounts
    return () => {
      void WebBrowser.coolDownAsync(); 
    };
  }, []);
};

//This hook ensure that the Expo WebBrowser module is properly initialized and cleaned up when needed
//warm up browser: process of pre-loading or initializing certain resources or components of the web browser before they are actually needed
//reduces time to access them when needed
//The void operator is used to explicitly discard the promise returned by warmUpAsync, indicating that we are not interested in handling the result of the promise directly.