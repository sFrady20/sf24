import { Avatar, Box, Stack, Typography } from "@mui/material";
import SvgFilter from "components/SvgFilter";
import { makeServerSideProps } from "util/makeServerSideProps";
import GithubIcon from "icons/github.svg";
import TwitterIcon from "icons/twitter.svg";
import EmailIcon from "icons/email.svg";
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

export const getServerSideProps = makeServerSideProps();

0.0;
const ProjectBlock = () => {
  return (
    <Box
      component={"li"}
      sx={{
        background: "#313131",
        height: "100%",
        paddingRight: "30%",
        borderRadius: 3,
        display: "block",
        padding: 5,
        backgroundImage: "radial-gradient(#455E59, #313131)",
      }}
    >
      <video
        autoPlay
        muted
        loop
        style={{ height: "100%", borderRadius: 12, overflow: "hidden" }}
      >
        <source src="/videos/abundant.webm" type="video/webm" />
      </video>
    </Box>
  );
};

const Home = (props: {}) => {
  return (
    <SvgFilter sx={{ height: "calc(var(--1svh) * 100)" }}>
      <Typography
        component={"h1"}
        sx={{
          fontFamily: "Zighead",
          fontSize: "min(30vw, 45vh)",
          textTransform: "uppercase",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          cursor: "default",
        }}
      >
        Frady
      </Typography>
      <Typography
        component={"div"}
        sx={{
          fontSize: 14.5,
          textAlign: "justify",
          width: 530,
          maxWidth: "80%",
          position: "absolute",
          left: "50%",
          top: "15%",
          transform: "translate(-50%, -50%)",
        }}
      >
        I am a creative full-stack developer with over 9 years of experience. I
        specialize in building elegant solutions and I'm constantly crafting new
        features with a focus on simplicity and scalability.
      </Typography>

      <Stack
        direction={"row"}
        component={"ul"}
        spacing={4}
        sx={{
          position: "absolute",
          bottom: "15vh",
          left: 0,
          right: 0,
          height: "40vh",
        }}
      >
        <ProjectBlock />
        <ProjectBlock />
        <ProjectBlock />
        <ProjectBlock />
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ position: "absolute", bottom: "5vh", left: "5vw", width: "88vw" }}
      >
        <Avatar />
        <Stack direction={"row"} spacing={6}>
          <Box component={"div"}>
            <Link href={"https://github.com/sFrady20"} target="_blank">
              <GithubIcon height={20} />
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"https://twitter.com/slowjamsteve"} target="_blank">
              <TwitterIcon height={20} />
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"mailto:@sfrady20@gmail.com"} target="_blank">
              <EmailIcon height={20} />
            </Link>
          </Box>
        </Stack>
        <Typography>RESUME</Typography>
      </Stack>
    </SvgFilter>
  );
};

export default Home;
