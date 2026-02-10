import { Sparkles } from 'lucide-react';
import LightRays from './LightRays';
import { Button } from './ui/button';

function NavPill() {
  return (
    <div className="mx-auto mb-16 flex w-full max-w-2xl items-center justify-between rounded-full border border-white/15 bg-white/5 px-8 py-4 backdrop-blur-xl">
      <span className="text-xl font-semibold tracking-tight text-white/95">React Bits</span>
      <div className="flex gap-8 text-sm text-white/80">
        <a href="#" className="transition hover:text-white">Home</a>
        <a href="#" className="transition hover:text-white">Docs</a>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-6 py-8 md:px-10">
      <div className="relative mx-auto min-h-[640px] max-w-[1120px] overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-b from-[#080a2b] to-[#070824]">
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

        <div className="relative z-10 px-6 py-10 md:px-12 md:py-12">
          <NavPill />

          <div className="mx-auto mt-24 flex max-w-xl flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
              <Sparkles className="h-4 w-4" /> New Background
            </div>

            <h1 className="mb-8 text-balance text-5xl font-semibold leading-tight text-slate-200 md:text-6xl">
              May these lights guide you on your path
            </h1>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="min-w-36 rounded-full bg-slate-100 text-slate-900 hover:bg-white">
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-36 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
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
