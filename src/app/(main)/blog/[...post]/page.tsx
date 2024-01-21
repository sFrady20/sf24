import dynamic from "next/dynamic";

export default function ({ params }: { params: { post: string[] } }) {
  const { post } = params;

  const Content = dynamic(() => import(`./content/${post.join("/")}.mdx`));

  return (
    <div className="w-full min-h-100vh flex items-center justify-center">
      <Content />
    </div>
  );
}
