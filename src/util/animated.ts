import { Box, Button, Tabs, Typography, Stack } from "@mui/material";
import { animated } from "@react-spring/web";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";

export const AnimatedBox = animated(Box);
export const AnimatedButton = animated(Button);
export const AnimatedImage = animated(Image);
export const AnimatedStack = animated(Stack);
export const AnimatedTabs = animated(Tabs);
export const AnimatedTypography = animated(Typography);
