import withGlobal from "middleware/withGlobal";
import { GetServerSidePropsContext } from "next";
import { createRouter } from "next-connect";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import Link from "next/link";

const projectList = [
  "Abundant",
  "Home Run Derby",
  "Moneybot",
  "Wanderseat",
  "Area 51 Defense Squad",
  "Casino Bandito",
  "Verizon Juggle",
  "Phonetopia",
  "Influence",
  "Block Party",
  "Walt Kart",
  "Shader Stage",
  "QuarterVerse",
  "Civic Education Kiosk",
  "Centurylink Vikings",
  "Drexls",
  "labctrl",
  "Dispatch",
  // meh
  "Pit Crew",
  "Christmas Pageant",
  // dont rlly exist yet,
  "MimicMe",
  "Christmas town",
  "Dispatch-new",
  "Metal After Man",
  "Perfect Routine",
  "Fradiation",
  "Earthling Creative",
  "Mycota",
];

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  await createRouter()
    .use(withGlobal())
    .use(() => ({}))
    .run(ctx.req, ctx.res);

const Home = (props: {}) => {
  return (
    <Box
      component={"div"}
      sx={{ width: "100%", height: "100vh", background: "#308" }}
    >
      <Container>
        <Card>
          <CardHeader>HAEYYY</CardHeader>
          <CardContent>
            THIS IS A CARD
            <Link href={"/about"}>
              <Button>Test</Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Home;
