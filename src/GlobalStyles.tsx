import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	body {
		padding: 0;  
		margin: 0;
        font-family: Montserrat;
	}

	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
    	-webkit-appearance: none;
    	margin: 0;
	}	
`;

export default GlobalStyles;
