/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yWYpaHrdyyX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className=" flex justify-center w-full">
            <Image
            alt="Under Construction"
            src={"/under-construction.jpg"}
            width={"300"}
            height={"300"}
            />
        </div>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white shadow-sm px-8 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Return to base
        </Link>
      </div>
    </div>
  )
}