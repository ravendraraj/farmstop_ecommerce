// RootNavigation.js
import * as React from 'react';

export const navigationRef = React.createRef();

// export function navigate(name, params){
//     navigationRef.current && navigationRef.current.navigate(name, params);
// }

export function navigate(name){
    navigationRef.current && navigationRef.current.navigate(name);
}
