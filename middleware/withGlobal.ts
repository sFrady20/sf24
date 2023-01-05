import { createRouter } from "next-connect";

const withGlobal = () =>
  createRouter().use(async (req, res, next) => {
    const nextResults = next ? await next() : undefined;
    return {
      ...nextResults,
      props: { ...nextResults?.props, global: {} },
    };
  });

export default withGlobal;
