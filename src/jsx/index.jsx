import React from 'react';
import ReactDOM from 'react-dom';

import Plant from './plant';

import Game from './game.jsx';

document.addEventListener("contextmenu", function(e){
	e.preventDefault();
}, false);

ReactDOM.render(
	<Game />,
	document.getElementById('wrapper')
);
