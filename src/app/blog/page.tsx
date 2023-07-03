import Link from "next/link";
import Welcome from "./welcome.mdx";

export default function () {
  return (
    <div className="w-full min-h-100vh py-40 flex items-center justify-center ">
      <div className="grid grid-cols-1 gap-4 max-w-[1080px] md:grid-cols-3">
        {Array(12)
          .fill("")
          .map((x, i) => (
            <Link
              key={i}
              href={"/blog/hello"}
              className="p-4 rounded-lg cursor-pointer hover:bg-gray-200 span-1 space-y-3"
            >
              <h2 className="text-2xl font-bold">
                Suspendisse varius nisi vel lorem iaculis, sit amet suscipit
                lacus molestie.
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                viverra metus eleifend massa vulputate pulvinar. Etiam cursus
                dui vel elit dapibus consequat. Quisque consequat lacus vitae
                convallis ultricies. Mauris ut lorem elit. Duis mattis lectus
                eros, et malesuada nunc egestas ut. Ut efficitur maximus turpis
                eget hendrerit. Nulla vulputate est et lectus porttitor, vel
                tempus ante aliquet. Nullam faucibus, massa nec vestibulum
                blandit, nibh risus venenatis magna, sit amet ullamcorper massa
                sem non dolor. Vivamus volutpat tortor et diam faucibus
                vulputate. Suspendisse pulvinar nibh ut ligula condimentum
                posuere.
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
