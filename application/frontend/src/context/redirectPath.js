import React, { useState } from 'react';

export const RedirectPathContext = React.createContext({
    redirectPath: '/Feed',
    redirectTo: (newPath) => {}
});

function RedirectPathContextProvider(props) {
    const [path, setPath] = useState('/Feed');

    function redirectHandler(newPath) {
        console.log('[redirect path]' + newPath);
        setPath(newPath);
    };

    return <RedirectPathContext.Provider value={{
        redirectPath: path, 
        redirectTo: redirectHandler
        }} >
            {props.children}
        </RedirectPathContext.Provider>
}

export default RedirectPathContextProvider;