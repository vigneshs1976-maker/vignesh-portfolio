// The one orchestrated "hero moment" on the page: a noisy signal resolves
// into a clean waveform on load. A quiet nod to the deepfake-audio project —
// distinguishing real signal from noise is the whole point of that build.
export default function SignalStrip() {
  return (
    <div className="signal-strip" aria-hidden="true">
      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="signal-svg">
        <defs>
          <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B90E8" />
            <stop offset="100%" stopColor="#E7B23D" />
          </linearGradient>
        </defs>
        <path
          className="wave-noisy"
          d="M-10,60 L10,30 L25,85 L40,20 L55,95 L70,40 L85,75 L100,15 L115,90 L130,45 L145,70 L160,25 L175,95 L190,50 L205,30 L220,85 L235,45 L250,80 L265,10 L280,95 L295,55 L310,20 L325,80 L340,35 L355,90 L370,50 L385,70 L400,60"
          fill="none"
          stroke="#45455A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="wave-clean"
          d="M-10,60 C30,10 70,10 110,60 C150,110 190,110 230,60 C270,10 310,10 350,60 C370,85 390,85 410,60"
          fill="none"
          stroke="url(#signalGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
