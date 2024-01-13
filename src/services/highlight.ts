"use client";
import "highlight.js/styles/night-owl.min.css";

import highlight from "highlight.js/lib/core";
import glsl from "highlight.js/lib/languages/glsl";

highlight.registerLanguage("glsl", glsl);

export default highlight;
