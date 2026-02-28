"use client";

import { useEffect } from "react";

export default function OgImage() {
  useEffect(() => {
    const removeOverlays = () => {
      document.querySelectorAll("body > *").forEach((el) => {
        if (el instanceof HTMLElement) {
          const style = window.getComputedStyle(el);
          if (style.position === "fixed") el.remove();
        }
      });
      document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
    };
    removeOverlays();
    const observer = new MutationObserver(removeOverlays);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow: hidden; }
      `}</style>

      <div
        style={{
          width: 1200,
          height: 630,
          background: "#080808",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
          overflow: "hidden",
        }}
      >
        {/* Subtle top-left glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Subtle bottom-right glow */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Globe icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="44"
              height="44"
            >
              <path
                d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Product name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            LlamaDNS
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 300,
              color: "rgba(163,163,163,0.9)",
              letterSpacing: "-0.01em",
            }}
          >
            Free Dynamic DNS
          </div>

          {/* Terminal snippet */}
          <div
            style={{
              marginTop: 8,
              background: "#050505",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "10px 24px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily:
                '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 16,
            }}
          >
            <span style={{ color: "rgba(34,197,94,0.7)" }}>$</span>
            <span style={{ color: "rgba(212,212,212,0.8)" }}>curl</span>
            <span style={{ color: "rgba(253,224,139,0.7)" }}>
              &quot;www.llamadns.org/update?domains=lab&token=...&quot;
            </span>
          </div>

          {/* Feature pills */}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 4,
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(115,115,115,0.9)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.6)",
                }}
              />
              Free forever
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.6)",
                }}
              />
              No credit card
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.6)",
                }}
              />
              Open-source
            </div>
          </div>
        </div>

        {/* Domain at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            fontSize: 16,
            fontWeight: 400,
            color: "rgba(115,115,115,0.6)",
            letterSpacing: "0.05em",
          }}
        >
          llamadns.org
        </div>
      </div>
    </>
  );
}
