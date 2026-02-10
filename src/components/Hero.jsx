import LightRays from './LightRays';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#6c9aea"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-b from-transparent via-[#070824]/80 to-[#040514]" />

      <div className="relative z-20 flex h-full flex-col px-4 pt-24 md:px-8">
        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="mb-5 text-balance text-5xl font-semibold leading-tight text-slate-200 md:text-7xl">
              The Aethereum
            </h1>

            <p className="whitespace-pre-line text-base leading-relaxed text-slate-300/95 md:text-lg">
              {'Descend into a secret laboratory and pass through 150 locked doors, each hiding deadly monsters.\nYour mission is to recover classified documents that were never meant to be found.\nSurvive the monsters. Uncover the truth.\nBut remember - not every door should be opened.'}
            </p>
          </div>
        </div>

        <div className="pointer-events-none pb-8 text-center">
          <p className="text-lg font-medium tracking-wide text-cyan-200/90 [text-shadow:0_0_24px_rgba(103,180,255,0.85)] md:text-xl">
            Developers
          </p>
          <p className="mt-1 text-xs tracking-[0.3em] text-white/45">SCROLL DOWN</p>
        </div>
      </div>
    </section>
  );
}
