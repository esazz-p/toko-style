import { useEffect, useMemo, useState } from "react";

const PHASE = {
  INTRO: "INTRO",
  ENTRY: "ENTRY",
  CENTER: "CENTER",
  DETAIL: "DETAIL",
  LIGHT: "LIGHT",
  HERO: "HERO",
  SPECS: "SPECS",
  OUT: "OUT",
  FLIP: "FLIP",
  SMOKE: "SMOKE",
  RESET: "RESET",
  SPLIT: "SPLIT",
  FINAL: "FINAL",
};

const TIMELINE = [
  [PHASE.INTRO, 3000],
  [PHASE.ENTRY, 2600],
  [PHASE.CENTER, 2200],
  [PHASE.DETAIL, 2400],
  [PHASE.LIGHT, 2600],
  [PHASE.HERO, 3000],
  [PHASE.SPECS, 6000],
  [PHASE.OUT, 2600],
  [PHASE.FLIP, 2200],
  [PHASE.SMOKE, 2800],
  [PHASE.RESET, 2500],
  [PHASE.SPLIT, 3000],
  [PHASE.FINAL, 999999],
];

function CarAnimation() {
  const [phase, setPhase] = useState(PHASE.INTRO);
  const [playing, setPlaying] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const index = TIMELINE.findIndex(
    ([name]) => name === phase
  );

  /* =========================================
     ANIMATION TIMELINE
  ========================================= */

  useEffect(() => {
    if (!playing || phase === PHASE.FINAL) {
      return;
    }

    const current = TIMELINE[index];

    if (!current) return;

    const timer = setTimeout(() => {
      if (index < TIMELINE.length - 1) {
        setPhase(TIMELINE[index + 1][0]);
      }
    }, current[1]);

    return () => clearTimeout(timer);
  }, [phase, index, playing]);

  /* =========================================
     MOUSE PARALLAX
  ========================================= */

  useEffect(() => {
    const handleMouse = (event) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      setMouse({
        x: x * 10,
        y: y * 7,
      });
    };

    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  /* =========================================
     PROGRESS
  ========================================= */

  const progress = useMemo(() => {
    if (phase === PHASE.FINAL) {
      return 100;
    }

    return (index / (TIMELINE.length - 1)) * 100;
  }, [phase, index]);

  /* =========================================
     CAR TRANSFORM
  ========================================= */

  const getCarTransform = () => {
    switch (phase) {
      case PHASE.INTRO:
        return `
          translate(
            calc(-50% + 42vw),
            -50%
          )
          scale(.58)
          rotate(-1deg)
        `;

      case PHASE.ENTRY:
        return `
          translate(
            calc(-50% + 18vw),
            -50%
          )
          scale(.68)
          rotate(-.5deg)
        `;

      case PHASE.CENTER:
        return `
          translate(
            calc(-50% + ${mouse.x}px),
            calc(-50% + ${mouse.y}px)
          )
          scale(.82)
          rotate(0deg)
        `;

      case PHASE.DETAIL:
        return `
          translate(
            calc(-50% + ${mouse.x}px),
            calc(-50% + ${mouse.y}px)
          )
          scale(1.06)
          rotate(0deg)
        `;

      case PHASE.LIGHT:
        return `
          translate(
            calc(-50% + ${mouse.x}px),
            calc(-50% + ${mouse.y}px)
          )
          scale(.96)
          rotate(0deg)
        `;

      case PHASE.HERO:
        return `
          translate(
            calc(-50% + ${mouse.x}px),
            calc(-50% + ${mouse.y}px)
          )
          scale(.88)
          rotate(0deg)
        `;

      case PHASE.SPECS:
        return `
          translate(
            calc(-50% + ${mouse.x}px),
            calc(-50% + ${mouse.y}px)
          )
          scale(.76)
          rotate(0deg)
        `;

      case PHASE.OUT:
        return `
          translate(
            calc(-50% + ${mouse.x}px),
            calc(-50% + ${mouse.y}px)
          )
          scale(.63)
          rotate(0deg)
        `;

      case PHASE.FLIP:
        return `
          translate(-50%, -50%)
          scale(.74)
          rotate(180deg)
        `;

      case PHASE.SMOKE:
        return `
          translate(-50%, -50%)
          scale(.78)
          rotate(180deg)
        `;

      case PHASE.RESET:
        return `
          translate(-50%, -50%)
          scale(.78)
          rotate(360deg)
        `;

      case PHASE.SPLIT:
        return `
          translate(-50%, -50%)
          scale(.78)
          rotate(360deg)
        `;

      default:
        return `
          translate(-50%, -50%)
          scale(.78)
        `;
    }
  };

  const carTransform = getCarTransform();

  const showNavigation =
    phase !== PHASE.INTRO;

  const showHero =
    phase === PHASE.HERO ||
    phase === PHASE.SPECS ||
    phase === PHASE.OUT;

  const showSpecs =
    phase === PHASE.SPECS;

  const showSmoke =
    phase === PHASE.SMOKE;

  const showSplit =
    phase === PHASE.SPLIT;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] text-white">

      {/* =========================================
          CINEMATIC BACKGROUND
      ========================================= */}

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 52%,
              rgba(38,38,38,.5) 0%,
              rgba(12,12,12,.8) 38%,
              #030303 78%
            )
          `,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 48% 65%, rgba(120,0,0,.08), transparent 38%)",
          opacity:
            phase === PHASE.LIGHT ||
            showHero
              ? 1
              : 0,
          transition: "2s ease",
        }}
      />

      {/* =========================================
          TOP NAV
      ========================================= */}

      <header
        className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-7 md:px-12"
        style={{
          opacity: showNavigation ? 1 : 0,
          transform: showNavigation
            ? "translateY(0)"
            : "translateY(-20px)",
          transition: "1.2s ease",
        }}
      >

        <div className="text-[18px] font-black tracking-[-.08em]">
          PAGANI
          <span className="text-red-500">.</span>
        </div>

        <div className="hidden items-center gap-10 text-[8px] uppercase tracking-[.45em] text-white/35 md:flex">
          <span>Automobili</span>
          <span>Engineering</span>
          <span>Design</span>
          <span>Performance</span>
        </div>

        <button className="rounded-full border border-white/15 bg-white/[.03] px-5 py-2.5 text-[9px] uppercase tracking-[.25em] backdrop-blur-xl transition duration-500 hover:border-white/40">
          Get in touch
        </button>

      </header>

      {/* =========================================
          INTRO
      ========================================= */}

      <div
        className="absolute inset-0 z-40 flex items-center justify-center"
        style={{
          opacity:
            phase === PHASE.INTRO
              ? 1
              : 0,
          transition: "1.5s ease",
        }}
      >

        <div className="text-center">

          <div className="mb-7 text-[8px] uppercase tracking-[.8em] text-white/35">
            Automobili Pagani
          </div>

          <h1
            className="text-5xl font-black uppercase leading-[.82] tracking-[-.09em] md:text-[100px]"
            style={{
              animation:
                "introTitle 1.8s cubic-bezier(.22,.61,.36,1) forwards",
            }}
          >
            Zonda
            <br />

            <span className="text-white/20">
              R
            </span>
          </h1>

          <div className="mx-auto mt-9 flex items-center justify-center gap-3">

            <span className="h-px w-8 bg-red-600" />

            <span className="text-[8px] uppercase tracking-[.5em] text-white/25">
              Pure Performance
            </span>

            <span className="h-px w-8 bg-red-600" />

          </div>

        </div>

      </div>

      {/* =========================================
          CAR STAGE
      ========================================= */}

      <div
        className="absolute left-1/2 top-1/2 z-20 aspect-[16/9]"
        style={{
          width: "min(88vw, 1250px)",
          transform: carTransform,
          transition:
            "2s cubic-bezier(.16,1,.3,1)",
        }}
      >

        {/* Floor shadow */}

        <div
          className="absolute left-1/2 top-[76%] h-[10%] w-[70%] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,0,0,.95), transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Floor reflection */}

        <div
          className="absolute left-1/2 top-[79%] h-[2px] w-[52%] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent)",
            filter: "blur(5px)",
          }}
        />

        {/* =====================================
            LEFT HALF
        ===================================== */}

        <div
          className="absolute inset-0"
          style={{
            clipPath:
              showSplit
                ? "inset(0 50% 0 0)"
                : "inset(0)",
            transform:
              showSplit
                ? "translateX(-12vw)"
                : "translateX(0)",
            transition:
              "1.8s cubic-bezier(.16,1,.3,1)",
          }}
        >

          <img
            src="/mass.png"
            alt="Pagani Zonda R"
            draggable="false"
            className="absolute inset-0 h-full w-full select-none object-contain"
            style={{
              filter:
                phase === PHASE.DETAIL
                  ? "brightness(1.08) contrast(1.08)"
                  : "brightness(1) contrast(1.02)",
              transition: "1.5s ease",
            }}
          />

        </div>

        {/* =====================================
            RIGHT HALF
        ===================================== */}

        <div
          className="absolute inset-0"
          style={{
            clipPath:
              showSplit
                ? "inset(0 0 0 50%)"
                : "inset(0)",
            transform:
              showSplit
                ? "translateX(12vw)"
                : "translateX(0)",
            transition:
              "1.8s cubic-bezier(.16,1,.3,1)",
          }}
        >

          <img
            src="/mass.png"
            alt="Pagani Zonda R"
            draggable="false"
            className="absolute inset-0 h-full w-full select-none object-contain"
          />

        </div>

        {/* =====================================
            METALLIC LIGHT
        ===================================== */}

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            opacity:
              phase === PHASE.LIGHT ||
              phase === PHASE.HERO ||
              phase === PHASE.SPECS
                ? 1
                : 0,
            transition: "1.2s ease",
          }}
        >

          <div
            className="absolute top-[-10%] h-[120%] w-[9%]"
            style={{
              left: "-20%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent)",
              filter: "blur(12px)",
              transform: "skewX(-18deg)",
              animation:
                "bodyReflection 3.8s ease-in-out infinite",
            }}
          />

        </div>

      </div>

      {/* =========================================
          CINEMATIC LIGHT LINE
      ========================================= */}

      <div
        className="pointer-events-none absolute left-0 right-0 top-[54%] z-30 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent)",
          boxShadow:
            "0 0 25px rgba(255,255,255,.1)",
          opacity:
            phase === PHASE.LIGHT
              ? 1
              : 0,
          transform:
            phase === PHASE.LIGHT
              ? "scaleX(1)"
              : "scaleX(.1)",
          transition:
            "1.4s cubic-bezier(.16,1,.3,1)",
        }}
      />

      {/* =========================================
          SUBTLE RED GLOW
      ========================================= */}

      <div
        className="pointer-events-none absolute left-[50%] top-[68%] z-15 h-20 w-72 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(180,0,0,.16), transparent 70%)",
          filter: "blur(25px)",
          opacity:
            phase === PHASE.LIGHT ||
            phase === PHASE.HERO
              ? 1
              : 0,
          transition: "1.5s ease",
        }}
      />

      {/* =========================================
          HERO INFORMATION
      ========================================= */}

      <div
        className="absolute left-6 top-1/2 z-40 max-w-[540px] -translate-y-1/2 md:left-12"
        style={{
          opacity: showHero ? 1 : 0,
          transform:
            showHero
              ? "translateY(-50%) translateX(0)"
              : "translateY(-50%) translateX(-60px)",
          transition:
            "1.4s cubic-bezier(.16,1,.3,1)",
        }}
      >

        <div className="mb-6 flex items-center gap-3">

          <span className="h-px w-9 bg-red-600" />

          <span className="text-[8px] uppercase tracking-[.6em] text-red-500">
            Hypercar
          </span>

        </div>

        <div className="text-[10px] uppercase tracking-[.55em] text-white/30">
          Pagani
        </div>

        <h2 className="mt-3 text-6xl font-black uppercase leading-[.82] tracking-[-.09em] md:text-[105px]">

          Zonda

          <br />

          <span className="text-white/20">
            R
          </span>

        </h2>

        <p className="mt-7 max-w-[420px] text-[12px] leading-6 text-white/40 md:text-sm md:leading-7">
          A machine engineered without compromise.
          Extreme performance shaped by Italian
          craftsmanship.
        </p>

        {/* Specs */}

        <div
          className="mt-9 grid grid-cols-2 gap-5 md:grid-cols-4"
          style={{
            opacity: showSpecs ? 1 : 0,
            transform:
              showSpecs
                ? "translateY(0)"
                : "translateY(20px)",
            transition:
              "1.2s .2s cubic-bezier(.16,1,.3,1)",
          }}
        >

          <Spec
            value="V12"
            label="Engine"
          />

          <Spec
            value="5987"
            label="Displacement"
          />

          <Spec
            value="375+"
            label="Top speed"
          />

          <Spec
            value="551"
            label="Power KW"
          />

        </div>

      </div>

      {/* =========================================
          RIGHT TECHNICAL INFO
      ========================================= */}

      <div
        className="absolute right-7 top-1/2 z-30 hidden -translate-y-1/2 md:right-12 md:block"
        style={{
          opacity:
            showSpecs
              ? 1
              : 0,
          transition:
            "1.5s ease",
        }}
      >

        <div className="flex flex-col items-end gap-7">

          <TechLine
            number="01"
            title="AERODYNAMICS"
          />

          <TechLine
            number="02"
            title="CARBON MONOCOQUE"
          />

          <TechLine
            number="03"
            title="V12 POWERTRAIN"
          />

          <TechLine
            number="04"
            title="TRACK FOCUSED"
          />

        </div>

      </div>

      {/* =========================================
          VERTICAL BRAND LINE
      ========================================= */}

      <div
        className="absolute bottom-28 right-6 z-40 hidden md:right-12 md:block"
        style={{
          opacity: showHero ? 1 : 0,
          transition: "1s ease",
        }}
      >

        <div className="flex items-center gap-3">

          <span className="text-[8px] uppercase tracking-[.5em] text-white/20">
            Zonda R
          </span>

          <span className="h-12 w-px bg-white/10" />

          <span className="text-[8px] text-white/20">
            01
          </span>

        </div>

      </div>

      {/* =========================================
          PRICE
      ========================================= */}

      <div
        className="absolute bottom-24 right-6 z-40 md:right-12"
        style={{
          opacity: showHero ? 1 : 0,
          transform:
            showHero
              ? "translateY(0)"
              : "translateY(20px)",
          transition:
            "1.2s .3s ease",
        }}
      >

        <div className="text-right">

          <div className="mb-2 text-[7px] uppercase tracking-[.5em] text-white/20">
            Estimated value
          </div>

          <div className="text-xl font-semibold tracking-tight md:text-2xl">
            €1,500,000
          </div>

        </div>

      </div>

      {/* =========================================
          CINEMATIC SMOKE
      ========================================= */}

      <div
        className="pointer-events-none absolute inset-0 z-35 overflow-hidden"
        style={{
          opacity: showSmoke ? 1 : 0,
          transition: "1.8s ease",
        }}
      >

        {Array.from({ length: 10 }).map(
          (_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${10 + i * 9}%`,
                top: `${68 + (i % 3) * 5}%`,
                width:
                  `${150 + (i % 4) * 60}px`,
                height:
                  `${70 + (i % 3) * 50}px`,
                background:
                  i % 3 === 0
                    ? "rgba(70,70,70,.08)"
                    : "rgba(25,25,25,.18)",
                filter: "blur(32px)",
                animation:
                  `premiumSmoke ${
                    4 + i * .2
                  }s ease-in-out infinite`,
                animationDelay:
                  `${i * .15}s`,
              }}
            />
          )
        )}

      </div>

      {/* =========================================
          SPLIT CENTER LINE
      ========================================= */}

      <div
        className="pointer-events-none absolute left-1/2 top-0 z-45 h-full w-px -translate-x-1/2"
        style={{
          background:
            "linear-gradient(transparent, rgba(255,255,255,.5), transparent)",
          boxShadow:
            "0 0 25px rgba(255,255,255,.12)",
          opacity:
            showSplit ? 1 : 0,
          transition: "1s ease",
        }}
      />

      {/* =========================================
          FINAL NAME REVEAL
      ========================================= */}

      <div
        className="absolute inset-0 z-[70] flex items-center justify-center bg-[#030303]"
        style={{
          opacity:
            phase === PHASE.FINAL
              ? 1
              : 0,
          pointerEvents:
            phase === PHASE.FINAL
              ? "auto"
              : "none",
          transition: "2s ease",
        }}
      >

        <div className="text-center">

          <div
            className="mb-7 text-[8px] uppercase tracking-[.8em] text-red-500"
            style={{
              animation:
                phase === PHASE.FINAL
                  ? "finalFade 1.8s ease forwards"
                  : "none",
            }}
          >
            Automobili Pagani
          </div>

          <h2
            className="text-6xl font-black uppercase leading-[.8] tracking-[-.09em] md:text-[120px]"
            style={{
              animation:
                phase === PHASE.FINAL
                  ? "nameReveal 2s cubic-bezier(.16,1,.3,1) forwards"
                  : "none",
            }}
          >
            Zonda

            <span className="text-white/20">
              {" "}R
            </span>
          </h2>

          <div
            className="mx-auto mt-10 h-px w-20 bg-red-600"
            style={{
              animation:
                phase === PHASE.FINAL
                  ? "lineReveal 1.5s ease forwards"
                  : "none",
            }}
          />

          {/* =====================================
              YOUR NAME
          ===================================== */}

          <div
            className="mt-10"
            style={{
              opacity:
                phase === PHASE.FINAL
                  ? 1
                  : 0,
              transform:
                phase === PHASE.FINAL
                  ? "translateY(0)"
                  : "translateY(25px)",
              transition:
                "1.8s 1s cubic-bezier(.16,1,.3,1)",
            }}
          >

            <div className="text-2xl font-medium uppercase tracking-[.28em] md:text-4xl">
              ESAI PRIYA
            </div>

            <div className="mt-4 text-[8px] uppercase tracking-[.65em] text-white/25">
              Creative Developer
            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          BOTTOM CONTROL
      ========================================= */}

      <div
        className="absolute bottom-7 left-6 z-[80] flex items-center gap-4 md:left-12"
        style={{
          opacity:
            phase === PHASE.INTRO
              ? 0
              : 1,
          transition: "1s ease",
        }}
      >

        <button
          onClick={() =>
            setPlaying((value) => !value)
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[.03] text-[10px] backdrop-blur-xl transition duration-500 hover:border-white/40 hover:bg-white/[.07]"
        >
          {playing ? "Ⅱ" : "▶"}
        </button>

        <span className="text-[7px] uppercase tracking-[.5em] text-white/20">
          {playing ? "Sequence" : "Paused"}
        </span>

      </div>

      {/* =========================================
          PROGRESS BAR
      ========================================= */}

      <div className="absolute bottom-8 left-1/2 z-[80] w-[38%] -translate-x-1/2 md:w-[48%]">

        <div className="relative h-px bg-white/[.08]">

          <div
            className="absolute left-0 top-0 h-px bg-red-600"
            style={{
              width: `${progress}%`,
              transition:
                "1.5s cubic-bezier(.16,1,.3,1)",
            }}
          />

        </div>

        <div className="mt-3 flex justify-between text-[7px] uppercase tracking-[.4em] text-white/15">

          <span>01</span>

          <span>
            Zonda R / Performance
          </span>

          <span>12</span>

        </div>

      </div>

      {/* =========================================
          CSS
      ========================================= */}

      <style>{`

        @keyframes introTitle {

          0% {
            opacity: 0;
            transform: translateY(35px);
            letter-spacing: -.12em;
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: -.09em;
          }

        }

        @keyframes bodyReflection {

          0% {
            left: -20%;
            opacity: 0;
          }

          20% {
            opacity: .7;
          }

          60% {
            opacity: .7;
          }

          100% {
            left: 120%;
            opacity: 0;
          }

        }

        @keyframes premiumSmoke {

          0% {
            opacity: 0;
            transform:
              translate3d(0, 20px, 0)
              scale(.8);
          }

          25% {
            opacity: .5;
          }

          65% {
            opacity: .25;
          }

          100% {
            opacity: 0;
            transform:
              translate3d(-30px, -140px, 0)
              scale(1.5);
          }

        }

        @keyframes nameReveal {

          0% {
            opacity: 0;
            transform:
              translateY(40px)
              scale(.94);
            letter-spacing: .15em;
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
            letter-spacing: -.09em;
          }

        }

        @keyframes finalFade {

          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }

        }

        @keyframes lineReveal {

          0% {
            width: 0;
            opacity: 0;
          }

          100% {
            width: 80px;
            opacity: 1;
          }

        }

      `}</style>

    </section>
  );
}


/* =========================================
   SPEC
========================================= */

function Spec({ value, label }) {
  return (
    <div className="border-l border-white/10 pl-3">

      <div className="text-lg font-semibold tracking-tight">
        {value}
      </div>

      <div className="mt-1 text-[7px] uppercase tracking-[.35em] text-white/25">
        {label}
      </div>

    </div>
  );
}


/* =========================================
   TECHNICAL LINE
========================================= */

function TechLine({ number, title }) {
  return (
    <div className="flex items-center gap-4">

      <span className="text-[7px] text-white/15">
        {number}
      </span>

      <span className="h-px w-8 bg-white/10" />

      <span className="text-[7px] uppercase tracking-[.4em] text-white/30">
        {title}
      </span>

    </div>
  );
}

export default CarAnimation;