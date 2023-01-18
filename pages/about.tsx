import { Box, Button, Container } from "@mui/material";
import withGlobal from "middleware/withGlobal";
import { GetServerSidePropsContext } from "next";
import { createRouter } from "next-connect";
import Link from "next/link";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  await createRouter()
    .use(withGlobal())
    .use(() => ({}))
    .run(ctx.req, ctx.res);

const Home = (props: {}) => {
  return (
    <Box
      component={"div"}
      sx={{ width: "100%", height: "100vh", background: "#637" }}
    >
      <Container>
        <p>
          I am a creative full-stack developer with over 9 years of experience,
          based in Fairfax, Virginia. I specialize in building elegant solutions
          for clients from all over the world and I'm constantly crafting new
          features with a focus on simplicity and scalability. I'm available to
          chat about your next app, website, or game idea, just shoot me an
          email. Let's build something great together.
        </p>
        <Link href={"/"}>
          <Button>Test</Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Home;
