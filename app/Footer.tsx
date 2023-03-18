import { Box, Container, Stack, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

export function Footer() {
  return (
    <Box
      component={"footer"}
      sx={{
        position: "sticky",
        bottom: 0,
        margin: "-200px 0 0 0",
        paddingTop: "200px",
        boxSizing: "content-box",
        display: "flex",
        zIndex: 1,
        backgroundColor: "background.default",
      }}
    >
      <Container>
        <Stack
          sx={{
            flexDirection: "row",
            minHeight: 160,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              opacity: 0.5,
            }}
          >
            Des. and Dev. by Steven Frady{" "}
            <CopyrightIcon sx={{ width: 12, height: 12 }} /> 2023
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
