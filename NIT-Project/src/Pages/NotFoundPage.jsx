import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.7 + 0.15,
      vy: -(Math.random() * 0.3 + 0.15),
      vx: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 2.2 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? "#534AB7" : "#AFA9EC",
      spin: Math.random() * Math.PI * 2,
      dspin: (Math.random() - 0.5) * 0.04,
      shape: Math.random() > 0.6 ? "sq" : "ci",
    }));

    const draw = (ts) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width;
      const H = canvas.height;

      particles.forEach((p) => {
        p.y += p.vy * 0.003;
        p.x += p.vx * 0.003;
        p.spin += p.dspin;
        if (p.y < -0.05 || p.x < -0.05 || p.x > 1.05) {
          p.x = Math.random();
          p.y = 0.95 + Math.random() * 0.1;
        }
        ctx.save();
        ctx.globalAlpha =
          p.alpha * (0.5 + 0.5 * Math.sin(ts * 0.001 + p.spin * 3));
        ctx.fillStyle = p.color;
        ctx.translate(p.x * W, p.y * H);
        ctx.rotate(p.spin);
        if (p.shape === "sq") {
          ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      animFrameId = requestAnimationFrame(draw);
    };

    animFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');

        .nf-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-family: 'Syne', sans-serif;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          padding: 3rem 2rem;
        }

        .nf-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(#e5e5e5 1px, transparent 1px),
            linear-gradient(90deg, #e5e5e5 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-drift 20s linear infinite;
          z-index: 0;
        }

        .nf-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .nf-ring {
          position: absolute;
          left: 50%;
          top: 46%;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 1.5px solid #534AB7;
          opacity: 0;
          pointer-events: none;
          animation: ring-pulse 3s ease-out infinite;
          z-index: 1;
        }
        .nf-ring:nth-child(3) { animation-delay: 1s; }
        .nf-ring:nth-child(4) { animation-delay: 2s; }

        .nf-badge {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #888;
          border: 0.5px solid #ccc;
          border-radius: 100px;
          padding: 4px 14px;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
          animation: fade-down 0.6s ease both;
        }

        .nf-code {
          font-size: 100px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -5px;
          color: #1a1a1a;
          position: relative;
          z-index: 2;
          margin-bottom: 0.25rem;
          animation: fade-down 0.7s 0.1s ease both, float 3.5s 0.8s ease-in-out infinite;
        }

        .nf-acc {
          color: #534AB7;
          display: inline-block;
        }
        .nf-acc-left  { animation: glitch 4s 2s infinite; }
        .nf-acc-right { animation: glitch 4s 2.3s infinite; }
        .nf-zero      { display: inline-block; animation: spin-wobble 6s 1s ease-in-out infinite; }

        .nf-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0.5rem 0 0.75rem;
          position: relative;
          z-index: 2;
          animation: fade-down 0.7s 0.2s ease both;
        }

        .nf-desc {
          font-size: 13px;
          color: #666;
          text-align: center;
          max-width: 300px;
          line-height: 1.7;
          font-family: 'Space Mono', monospace;
          position: relative;
          z-index: 2;
          margin-bottom: 2rem;
          animation: fade-down 0.7s 0.3s ease both;
        }

        .nf-actions {
          display: flex;
          gap: 12px;
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
          justify-content: center;
          animation: fade-down 0.7s 0.4s ease both;
        }

        .nf-btn-primary {
          background: #534AB7;
          color: #EEEDFE;
          border: none;
          border-radius: 8px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          transition: transform 0.15s, background 0.15s;
        }
        .nf-btn-primary:hover { background: #3C3489; transform: translateY(-2px); }
        .nf-btn-primary:active { transform: scale(0.97); }

        .nf-btn-ghost {
          background: transparent;
          color: #666;
          border: 0.5px solid #ccc;
          border-radius: 8px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, transform 0.15s;
        }
        .nf-btn-ghost:hover { border-color: #534AB7; color: #534AB7; transform: translateY(-2px); }
        .nf-btn-ghost:active { transform: scale(0.97); }

        @keyframes grid-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes glitch {
          0%, 90%, 100% { transform: translateX(0) skewX(0deg); opacity: 1; }
          91% { transform: translateX(-3px) skewX(-5deg); opacity: 0.8; }
          92% { transform: translateX(3px) skewX(5deg); opacity: 0.9; }
          93% { transform: translateX(-2px); opacity: 1; }
          94% { transform: translateX(0); }
        }
        @keyframes spin-wobble {
          0%, 100% { transform: rotate(0deg) scale(1); }
          20%       { transform: rotate(-8deg) scale(1.05); }
          40%       { transform: rotate(8deg) scale(0.97); }
          60%       { transform: rotate(-4deg) scale(1.02); }
          80%       { transform: rotate(2deg) scale(0.99); }
        }
        @keyframes ring-pulse {
          0%   { transform: translate(-50%, -50%) scale(0.6); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(2);   opacity: 0; }
        }
      `}</style>

      <div className="nf-root">
        <div className="nf-grid" />
        <canvas className="nf-canvas" ref={canvasRef} />
        <div className="nf-ring" />
        <div className="nf-ring" />
        <div className="nf-ring" />

        <div className="nf-badge">Error status</div>

        <div className="nf-code">
          <span className="nf-acc nf-acc-left">4</span>
          <span className="nf-zero">0</span>
          <span className="nf-acc nf-acc-right">4</span>
        </div>

        <h1 className="nf-title">Page Not Found</h1>

        <p className="nf-desc">
          The page you're looking for has wandered off into the void.
          It may have been moved or never existed.
        </p>

        <div className="nf-actions">
          <button className="nf-btn-primary" onClick={() => navigate("/")}>
            ← Go Home
          </button>
          <button className="nf-btn-ghost" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;