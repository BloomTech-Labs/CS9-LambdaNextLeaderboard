import { Container, Header, Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import React from "react";

const LandingHeading = ({ mobile }) => {
  <Container text>
    <Header
      as="h1"
      content="Next Steps"
      inverted
      style={{
        ontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="Take charge of your future."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Button primary size="huge">
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>;
};

export default LandingHeading
// LandingHeading.propTypes = {
//   mobile: propTypes.bool,
// };
