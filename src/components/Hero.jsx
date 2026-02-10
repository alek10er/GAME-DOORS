import LightRays from './LightRays';
import { Button } from './ui/button';

function TopPanel() {
  return (
    <div className="mx-auto mt-8 flex w-[min(920px,92vw)] items-center justify-between rounded-full border border-white/15 bg-white/5 px-8 py-4 backdrop-blur-xl">
      <span className="text-xl font-semibold tracking-tight text-white/95">The Aethereum</span>
      <div className="flex gap-8 text-sm text-white/80">
        <a href="#" className="transition hover:text-white">
          Home
        </a>
        <a href="#" className="transition hover:text-white">
          Docs
        </a>
      </div>
    </div>
  );
}

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

      <div className="relative z-10 flex h-full flex-col px-4 md:px-8">
        <TopPanel />

        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="mb-5 text-balance text-5xl font-semibold leading-tight text-slate-200 md:text-7xl">
              The Aethereum
            </h1>

            <p className="mb-10 whitespace-pre-line text-base leading-relaxed text-slate-300/95 md:text-lg">
              {'Descend into a secret laboratory and pass through 150 locked doors, each hiding deadly monsters.\nYour mission is to recover classified documents that were never meant to be found.\nSurvive the monsters. Uncover the truth.\nBut remember - not every door should be opened.'}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="min-w-40 rounded-full bg-slate-100 text-slate-900 hover:bg-white">
                Enter the Lab
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-40 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
