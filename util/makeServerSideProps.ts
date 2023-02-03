import { GetServerSidePropsContext } from "next";
import { createRouter } from "next-connect";

type Request = any;
type Response = any;

export const makeServerSideProps =
  (pageMiddleware?: (ctx: { req: Request; res: Response }) => Promise<void>) =>
  async (ctx: GetServerSidePropsContext) =>
    await createRouter<Request, Response>()
      //global
      .use(async (req, res, next) => {
        const nextResults = next ? await next() : undefined;
        return {
          ...nextResults,
          props: { ...nextResults?.props, global: {} },
        };
      })
      //page middleware
      .use(async (req, res, next) => {
        await pageMiddleware?.({ req, res });
      })
      //
      .run(ctx.req, ctx.res);

