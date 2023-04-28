import "windi.css";
import "../styles.css";
import "large-small-dynamic-viewport-units-polyfill";

import { ReactNode } from "react";
import { AppShell } from "./Shell";
import "~/components/Analytics";

export default function App(props: { children?: ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <title>Steven Frady - Creative Full-Stack Developer</title>

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <meta
          name="title"
          content="Steven Frady - Creative Full-Stack Developer"
        />
        <meta
          name="description"
          content="I am a creative full-stack developer with over 8 years of experience. I specialize in building elegant solutions and I'm constantly crafting new features with a focus on simplicity and scalability."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.stevenfrady.com/" />
        <meta
          property="og:title"
          content="Steven Frady - Creative Full-Stack Developer"
        />
        <meta
          property="og:description"
          content="I am a creative full-stack developer with over 8 years of experience. I specialize in building elegant solutions and I'm constantly crafting new features with a focus on simplicity and scalability."
        />
        <meta property="og:image" content="http://stevenfrady.com/social.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.stevenfrady.com/" />
        <meta
          property="twitter:title"
          content="Steven Frady - Creative Full-Stack Developer"
        />
        <meta
          property="twitter:description"
          content="I am a creative full-stack developer with over 8 years of experience. I specialize in building elegant solutions and I'm constantly crafting new features with a focus on simplicity and scalability."
        />
        <meta
          property="twitter:image"
          content="http://stevenfrady.com/social.jpg"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
