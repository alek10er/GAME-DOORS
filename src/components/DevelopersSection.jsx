import ProfileCard from './ProfileCard';

const developers = [
  {
    name: 'mertvyakov',
    title: 'founder, designer',
    handle: 'mertvyakov',
    avatarUrl: '/mertvyakov.png',
    contactUrl: 'https://t.me/mertvyakov'
  },
  {
    name: 'BelarWhite',
    title: '3D-Modeler',
    handle: 'BelarWhite',
    avatarUrl: '/BelarWhite.png',
    contactUrl: 'https://t.me/BelarWhite'
  },
  {
    name: '2nic4',
    title: 'GUI designer',
    handle: 'kkva5ik',
    avatarUrl: '/2nic4.jpg',
    contactUrl: 'https://t.me/kkva5ik'
  }
];

export default function DevelopersSection() {
  return (
    <section className="relative z-20 min-h-screen bg-[#040514] px-6 pb-24 pt-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-semibold text-slate-100 md:text-6xl">Developers</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300/80 md:text-base">
            Core team behind The Aethereum. Scroll through the cards and connect with each member.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-8 lg:grid-cols-3">
          {developers.map((dev) => (
            <ProfileCard
              key={dev.name}
              name={dev.name}
              title={dev.title}
              handle={dev.handle}
              status="Online"
              contactText="Telegram"
              avatarUrl={dev.avatarUrl}
              miniAvatarUrl={dev.avatarUrl}
              showUserInfo
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.open(dev.contactUrl, '_blank', 'noopener,noreferrer')}
              showBehindGlow
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              customInnerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
