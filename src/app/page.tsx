import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-2xl font-semibold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Web Based Blog App pake Next.js TypeScript, Firebase, PostgreSQL, Prisma, Tailwind CSS, React-Quill dan deploy di Vercel
                </h1>
                <p className="mb-12 text-base font-normal !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  Aplikasi Blog Berbasis Web buat nulis blog dan dikelompokkan berdasarkan kategori,
                  bisa juga komunikasi lewat kolom komentar di tiap halaman detail postingan.
                  <br />
                  <br />
                  Login dulu kalo mau bikin postingan blog atau komen di postingan blog orang lain.
                  <br />
                  <br />
                  <br />
                  kepikiran bikin ini karna intan suka nulis 🤓
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  className="px-6 py-2 text-base font-semibold text-white rounded-md bg-primary hover:bg-primary/80"
                  href={"/blog"}
                >
                  Explore Blogs

                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
