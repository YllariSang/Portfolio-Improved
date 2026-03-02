import Link from "next/link";
import AsciiBadApplePlayer from "./AsciiBadApplePlayer";

export default function BadApplePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-16 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="chamfer-panel relative px-6 py-10 md:px-10 md:py-12">
          <span className="micro-tag">[ARCHIVE_STREAM: BAD_APPLE]</span>

          <div className="mt-5 border border-unbeatable-white/25 bg-industrial-black/85 px-5 py-6 md:px-7 md:py-8">
            <h1 className="persona-accent text-3xl font-black uppercase tracking-[0.14em] text-zzz-yellow md:text-5xl">
              Bad Apple ASCII
            </h1>

            <p className="mt-4 max-w-3xl text-sm uppercase tracking-[0.12em] text-unbeatable-white/78 md:text-base">
            ASCII playback inspired by Touhou&apos;s Bad Apple sequence. No music cuz copyright.
            </p>

            <p className="micro-tag mt-3 text-unbeatable-white/72">
              [SOURCE_DATA] Based on EmirXK/bad_apple (MIT). 
              <a
                href="https://github.com/EmirXK/bad_apple"
                target="_blank"
                rel="noreferrer"
                className="secret-link ml-2"
              >
                OPEN REPO
              </a>
            </p>

            <AsciiBadApplePlayer />

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/?mode=neo" className="glitch-button invert">
                RETURN TO CREATIVE VIEW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
