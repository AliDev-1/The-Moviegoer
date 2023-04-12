import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
    font-size: 12px;
    //background-color: #202125 ;
}
* {
    margin: 0;
    padding: 0;
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap');
    font-family: 'Poppins', sans-serif;
    
    
}`;

export default GlobalStyles;
