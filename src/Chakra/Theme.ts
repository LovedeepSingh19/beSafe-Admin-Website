import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

const theme = extendTheme({
    colors: {
        brand:{
            100 : "#D8D8D8",
            200 : "#3A3B3C",
            400 : "#E49393",
            700 : "#408E91",
            900 : "#245953"
        }
    },
    fonts: {
      body: "Open Sans, sans-serif",
    },
    // components: {

    // }
    });

export default theme;