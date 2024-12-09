import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SignInRoute from "./signIn";
import SignUpRoute from "./signUp";
import WavyBlock from "./reusables/wavyBlock";
import blackManta from "../images/blackManta.png";
import carouselData from "./carousel-data.json";
import Button from "./reusables/button";
import ButtonIcon from "./reusables/buttonIcon";
import googleIcon from "../images/google-color.png";
import facebookIcon from "../images/facebook-color.png";
import appleIcon from "../images/apple.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AuthenticationPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="authenticationPage">
      <div
        className="wrapper-wavy-block"
        style={{ backgroundImage: `url(${blackManta})` }}
      >
        <WavyBlock />
      </div>
      <h1>{carouselData[1].title}</h1>
      <div className="buttonsContainer">
        <Button className="btn-primary">{carouselData[1].buttonOneText}</Button>
        <Button>{carouselData[1].buttonTwoText}</Button>
      </div>
      <h4>{carouselData[1].content}</h4>
      <div className="socialSignUps">
        <ButtonIcon
          className="google-icon"
          icon={<img src={googleIcon} alt="Google" />}
        />
        <ButtonIcon
          className="social-icons"
          icon={<img src={facebookIcon} alt="Facebook" />}
        />
        <ButtonIcon
          className="social-icons"
          icon={<img src={appleIcon} alt="Apple" />}
        />
      </div>
    </div>
    // <Box sx={{ width: '100vw', height: '100vh' }}>
    //   <Box sx={{ borderBottom: 1, borderColor: 'lightgrey', width: '100vw' }}>
    //     <Tabs
    //       value={value}
    //       onChange={handleChange}
    //       TabIndicatorProps={{
    //         sx: { backgroundColor: 'lightgray', height: 2 },
    //       }}
    //       sx={{
    //         '& button.Mui-selected': { color: 'lightgray', width: '50%' },
    //         backgroundColor: '#538dbd',
    //         fontFamily: 'Patrick Hand',
    //       }}
    //     >
    //       <Tab
    //         label="Sign In"
    //         {...a11yProps(0)}
    //         sx={{
    //           fontFamily: 'Patrick Hand',
    //           color: 'darkgray',
    //           width: '50%',
    //           fontSize: '2.5vw',
    //         }}
    //       />
    //       <Tab
    //         label="Sign Up"
    //         {...a11yProps(1)}
    //         sx={{
    //           fontFamily: 'Patrick Hand',
    //           color: 'darkgray',
    //           width: '50%',
    //           fontSize: '2.5vw',
    //         }}
    //       />
    //     </Tabs>
    //   </Box>
    //   <TabPanel
    //     value={value}
    //     index={0}
    //     style={{ backgroundColor: '#538dbd', height: '100%' }}
    //   >
    //     <SignInRoute setValue={setValue} />
    //   </TabPanel>
    //   <TabPanel
    //     value={value}
    //     index={1}
    //     style={{ backgroundColor: '#538dbd', height: '100%' }}
    //   >
    //     <SignUpRoute />
    //   </TabPanel>
    // </Box>
  );
}
