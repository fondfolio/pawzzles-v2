import React, {useContext} from 'react';

export const IconContext = React.createContext({});

export const useIcons = () => useContext(IconContext);
