import { Box, Button, Container } from "@mui/material";
import Link from "next/link";
import { makeServerSideProps } from "util/makeServerSideProps";

export const getServerSideProps = makeServerSideProps();

const Home = (props: {}) => {
  return (
    <Box
      component={"div"}
      sx={{ width: "100%", height: "100vh", background: "#637" }}
    >
      <Container>
        <p>
          I am a creative full-stack developer with over 9 years of experiencE.
          I specialize in building elegant solutions and I'm constantly crafting
          new features with a focus on simplicity and scalability.
        </p>
        <Link href={"/"}>
          <Button>Test</Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Home;
