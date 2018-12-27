import React from 'react';
import {render} from 'react-dom';
import Root from './components/Root';

const ele = document.createElement('div');
document.body.appendChild(ele);
render(<Root />,ele);