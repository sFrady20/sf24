"use client";

import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function ProjectPage() {
  return (
    <Box
      sx={{
        mt: { xs: "calc(5vh + 90px)", md: "calc(5vh + 130px)" },
      }}
    >
      Project
      <Link href={"/projects"}>
        <Button>Back</Button>
      </Link>
    </Box>
  );
}
