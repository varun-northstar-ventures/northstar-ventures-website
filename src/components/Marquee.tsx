const PHRASE = ["Learn.", "Certify.", "Lead."];
const REPEAT = 4;

function Run({ hidden }: { hidden?: boolean }) {
  return (
    <span aria-hidden={hidden || undefined} className="flex shrink-0">
      {Array.from({ length: REPEAT }, (_, r) =>
        PHRASE.map((word) => (
          <span key={`${r}-${word}`} className="trim-cap block pr-[0.55em]">
            {word}
          </span>
        )),
      )}
    </span>
  );
}

/** Seamless left → right ticker: two identical runs, the track slides by exactly one run. */
export function Marquee() {
  return (
    <div className="overflow-x-clip bg-ink py-20 md:py-[120px]">
      <p className="sr-only">Learn. Certify. Lead.</p>
      <div
        aria-hidden="true"
        className="marquee-track flex w-max text-[48px] leading-[48px] font-extralight whitespace-nowrap text-white/20 md:text-[64px] md:leading-[64px]"
      >
        <Run />
        <Run hidden />
      </div>
    </div>
  );
}
