import Link from "next/link";
import AnemoImageCarousel from "../components/AnemoImageCarousel";

const ventiGallery = [
  {
    src: "/venti/VentiWallpaper.jpg",
    alt: "Venti tribute frame one",
    tag: "[FRAME_01]",
    artist: "不熬夜乐 (Bù áoyè lè)",
    sourceUrl: "https://buaoyele.lofter.com/",
  },
  {
    src: "/venti/VentiBraiding.png",
    alt: "Venti tribute frame two",
    tag: "[FRAME_02]",
    artist: "HoYoverse (Genshin Impact Official Art Team)",
    sourceUrl: "https://x.com/GenshinImpact",
  },
  {
    src: "/venti/Venti.full.3961390.jpg",
    alt: "Venti tribute frame three",
    tag: "[FRAME_03]",
    artist: "DSマイル (DSmile) and HoYoverse",
    sourceUrl: "https://x.com/GenshinImpact",
  },
  {
    src: "/venti/venti2025bday.jpg",
    alt: "Venti tribute frame four",
    tag: "[FRAME_04]",
    artist: "HoYoverse (Genshin Impact Official Art Team)",
    sourceUrl: "https://x.com/GenshinImpact",
  },
];

export default function AnemoVaultPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-16 md:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="chamfer-panel relative px-6 py-10 md:px-10 md:py-12">
          <span className="micro-tag">[HIDDEN_ARCHIVE: THE_ANEMO_ARCHON]</span>

          <div className="mt-5 border border-unbeatable-white/25 bg-industrial-black/85 px-5 py-6 md:px-7 md:py-8">
            <h1 className="persona-accent text-3xl font-black uppercase tracking-[0.14em] text-zzz-yellow md:text-5xl">
              Venti Tribute
            </h1>

            <p className="mt-4 max-w-3xl text-sm uppercase tracking-[0.14em] text-unbeatable-white/86 md:text-base">
              A page to admire and appreciate my favorite character from Genshin Impact, Venti, the Anemo Archon of Mondstadt.
            </p>

            <AnemoImageCarousel frames={ventiGallery} />

            <p className="micro-tag mt-4 border border-unbeatable-white/25 bg-industrial-black/70 px-3 py-2 text-unbeatable-white/78">
              [ATTRIBUTION_NOTICE] Artists are credited as displayed below the image. Give thanks and appreciation to these amazing artists!
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="border border-unbeatable-white/30 bg-industrial-black/88 p-4">
                <p className="micro-tag">[CODEX_01]</p>
                <h2 className="mt-2 text-lg font-bold uppercase tracking-[0.1em] text-zzz-yellow">
                  Tone-Deaf Bard
                </h2>
                <p className="mt-2 text-sm text-unbeatable-white/82">
                  Trickster charm, lyrical confidence, and soft chaos with a
                  playful smile.
                </p>
              </article>

              <article className="border border-unbeatable-white/30 bg-industrial-black/88 p-4">
                <p className="micro-tag">[CODEX_02]</p>
                <h2 className="mt-2 text-lg font-bold uppercase tracking-[0.1em] text-zzz-yellow">
                  Anemo Archon
                </h2>
                <p className="mt-2 text-sm text-unbeatable-white/82">
                  Wind motifs, lifted rhythm, and energy woven into
                  every interaction.
                </p>
              </article>

              <article className="border border-unbeatable-white/30 bg-industrial-black/88 p-4">
                <p className="micro-tag">[CODEX_03]</p>
                <h2 className="mt-2 text-lg font-bold uppercase tracking-[0.1em] text-zzz-yellow">
                  Nation of Freedom
                </h2>
                <p className="mt-2 text-sm text-unbeatable-white/82">
                  A reminder to be expressive, light, and alive!
                  Like songs carried by the open skies!
                </p>
              </article>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/?mode=neo" className="glitch-button">
                RETURN PORTAL
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 border border-unbeatable-white/20 bg-[radial-gradient(circle_at_center,rgba(141,231,163,0.32)_0%,rgba(141,231,163,0.06)_48%,transparent_72%)]" />
          <div className="pointer-events-none absolute -bottom-12 left-[-2rem] h-56 w-56 border border-unbeatable-white/18 bg-[radial-gradient(circle_at_center,rgba(218,248,226,0.24)_0%,rgba(218,248,226,0.05)_52%,transparent_74%)]" />
        </div>
      </div>
    </main>
  );
}
