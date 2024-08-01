"use client";
import "highlight.js/styles/night-owl.min.css";

import highlight from "highlight.js/lib/core";
import glsl from "highlight.js/lib/languages/glsl";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";

highlight.registerLanguage("glsl", glsl);
highlight.registerLanguage("typescript", typescript);
highlight.registerLanguage("json", json);

export default highlight;
