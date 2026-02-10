import LightRays from './LightRays';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] bg-background overflow-hidden">
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
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <Card className="max-w-2xl border-white/20 bg-card/70">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl">Light Rays Hero</CardTitle>
            <CardDescription className="text-base md:text-lg">
              Одностраничный React + Vite проект с TailwindCSS, shadcn/ui и WebGL background-эффектом.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-3">
            <Button size="lg">Get started</Button>
            <Button size="lg" variant="outline">
              View docs
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
