





// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-5 py-8">
//       {/* Hero Icon */}
//       <div className="w-18 h-18 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
//         <span className="text-white text-4xl">⊞</span>
//       </div>

//       <p className="text-orange-500 text-xs font-medium tracking-widest uppercase mb-3">
//         Scan. Order. Enjoy.
//       </p>
//       <h1 className="text-white text-3xl font-medium text-center leading-tight mb-2">
//         QR Food<br />Ordering
//       </h1>
//       <p className="text-gray-500 text-sm text-center mb-10 leading-relaxed">
//         Fast, contactless ordering<br />right from your table
//       </p>

//       <div className="flex flex-col gap-3 w-full max-w-sm">
//         {/* Customer */}
//         <Link href="/customer/menu?table=1"
//           className="flex items-center gap-4 p-4 bg-orange-500 hover:bg-orange-600 rounded-2xl transition">
//           <div className="w-11 h-11 bg-black/15 rounded-xl flex items-center justify-center text-white text-xl">🍽</div>
//           <div className="flex-1">
//             <p className="text-white font-medium text-sm">Browse Menu</p>
//             <p className="text-orange-200 text-xs">Table 1 — scan QR to order</p>
//           </div>
//           <span className="text-white/50">→</span>
//         </Link>

//         <div className="flex items-center gap-3 my-1">
//           <div className="flex-1 h-px bg-white/5" />
//           <span className="text-gray-600 text-xs">staff access</span>
//           <div className="flex-1 h-px bg-white/5" />
//         </div>

//         {/* Admin */}
//         <Link href="/admin/login"
//           className="flex items-center gap-4 p-4 bg-[#181818] hover:bg-[#1f1f1f] border border-white/5 rounded-2xl transition">
//           <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 text-xl">⊟</div>
//           <div className="flex-1">
//             <p className="text-gray-100 font-medium text-sm">Admin panel</p>
//             <p className="text-gray-500 text-xs">Manage orders & menu</p>
//           </div>
//           <span className="text-gray-600">→</span>
//         </Link>

//         {/* Kitchen */}
//         <Link href="/kitchen"
//           className="flex items-center gap-4 p-4 bg-[#181818] hover:bg-[#1f1f1f] border border-white/5 rounded-2xl transition">
//           <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 text-xl">👨‍🍳</div>
//           <div className="flex-1">
//             <p className="text-gray-100 font-medium text-sm">Kitchen display</p>
//             <p className="text-gray-500 text-xs">Live order queue</p>
//           </div>
//           <span className="text-gray-600">→</span>
//         </Link>
//       </div>

//       <p className="mt-10 text-xs text-gray-700 flex items-center gap-2">
//         <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
//         System online
//       </p>
//     </main>
//   );
// }



// above code work properly








// "use client";

// import { useEffect, useRef } from "react";
// import Link from "next/link";

// /* ─── Three.js ambient scene ─────────────────────────────────────────── */
// function useThreeScene(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
//   useEffect(() => {
//     let animId: number;
//     let renderer: import("three").WebGLRenderer;

//     (async () => {
//       const THREE = await import("three");

//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       // Scene
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(
//         60,
//         canvas.clientWidth / canvas.clientHeight,
//         0.1,
//         100
//       );
//       camera.position.z = 6;

//       renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//       renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//       renderer.setClearColor(0x000000, 0);

//       // Floating particles — mix of geometries to hint at food shapes
//       const geometries = [
//         new THREE.IcosahedronGeometry(0.18, 0),   // crystal / gem
//         new THREE.OctahedronGeometry(0.16, 0),    // diamond
//         new THREE.TetrahedronGeometry(0.14, 0),   // triangle chip
//         new THREE.TorusGeometry(0.12, 0.04, 6, 8), // ring / onion
//         new THREE.BoxGeometry(0.16, 0.16, 0.16),  // cube / dice
//       ];

//       const matOrange = new THREE.MeshStandardMaterial({
//         color: 0xf97316,
//         metalness: 0.3,
//         roughness: 0.4,
//         emissive: 0xf97316,
//         emissiveIntensity: 0.12,
//       });
//       const matDim = new THREE.MeshStandardMaterial({
//         color: 0x3b3b3b,
//         metalness: 0.6,
//         roughness: 0.3,
//       });
//       const matAccent = new THREE.MeshStandardMaterial({
//         color: 0xfb923c,
//         metalness: 0.2,
//         roughness: 0.5,
//         emissive: 0xfb923c,
//         emissiveIntensity: 0.08,
//       });

//       const mats = [matOrange, matDim, matDim, matAccent, matDim];

//       type Particle = {
//         mesh: import("three").Mesh;
//         speed: { rx: number; ry: number; rz: number };
//         orbit: { radius: number; theta: number; phi: number; speed: number };
//       };

//       const particles: Particle[] = [];
//       const count = 38;

//       for (let i = 0; i < count; i++) {
//         const gi = i % geometries.length;
//         const mesh = new THREE.Mesh(geometries[gi], mats[gi % mats.length]);

//         const radius = 2.5 + Math.random() * 3.5;
//         const theta = Math.random() * Math.PI * 2;
//         const phi = Math.acos(2 * Math.random() - 1);

//         mesh.position.set(
//           radius * Math.sin(phi) * Math.cos(theta),
//           radius * Math.sin(phi) * Math.sin(theta),
//           radius * Math.cos(phi) - 2
//         );

//         const s = 0.5 + Math.random() * 1.2;
//         mesh.scale.setScalar(s);
//         mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

//         scene.add(mesh);
//         particles.push({
//           mesh,
//           speed: {
//             rx: (Math.random() - 0.5) * 0.006,
//             ry: (Math.random() - 0.5) * 0.006,
//             rz: (Math.random() - 0.5) * 0.003,
//           },
//           orbit: { radius, theta, phi, speed: (Math.random() - 0.5) * 0.0015 },
//         });
//       }

//       // Lights
//       const ambient = new THREE.AmbientLight(0xffffff, 0.4);
//       scene.add(ambient);

//       const pointOrange = new THREE.PointLight(0xf97316, 2.5, 12);
//       pointOrange.position.set(3, 2, 3);
//       scene.add(pointOrange);

//       const pointBlue = new THREE.PointLight(0x3b82f6, 1.2, 10);
//       pointBlue.position.set(-4, -2, 2);
//       scene.add(pointBlue);

//       const pointWhite = new THREE.PointLight(0xffffff, 0.8, 8);
//       pointWhite.position.set(0, 4, 1);
//       scene.add(pointWhite);

//       // Resize
//       const onResize = () => {
//         if (!canvas) return;
//         camera.aspect = canvas.clientWidth / canvas.clientHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//       };
//       window.addEventListener("resize", onResize);

//       // Mouse parallax
//       let mx = 0, my = 0;
//       const onMouse = (e: MouseEvent) => {
//         mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
//         my = (e.clientY / window.innerHeight - 0.5) * 0.3;
//       };
//       window.addEventListener("mousemove", onMouse);

//       let t = 0;
//       const animate = () => {
//         animId = requestAnimationFrame(animate);
//         t += 0.01;

//         particles.forEach((p) => {
//           p.mesh.rotation.x += p.speed.rx;
//           p.mesh.rotation.y += p.speed.ry;
//           p.mesh.rotation.z += p.speed.rz;
//           p.orbit.theta += p.orbit.speed;

//           p.mesh.position.x =
//             p.orbit.radius * Math.sin(p.orbit.phi) * Math.cos(p.orbit.theta) + mx * 0.5;
//           p.mesh.position.y =
//             p.orbit.radius * Math.sin(p.orbit.phi) * Math.sin(p.orbit.theta) + my * 0.5;
//         });

//         // Slowly orbit lights
//         pointOrange.position.x = Math.cos(t * 0.3) * 4;
//         pointOrange.position.z = Math.sin(t * 0.3) * 4;

//         camera.position.x += (mx * 0.6 - camera.position.x) * 0.04;
//         camera.position.y += (-my * 0.4 - camera.position.y) * 0.04;
//         camera.lookAt(scene.position);

//         renderer.render(scene, camera);
//       };
//       animate();

//       return () => {
//         window.removeEventListener("resize", onResize);
//         window.removeEventListener("mousemove", onMouse);
//       };
//     })();

//     return () => {
//       cancelAnimationFrame(animId);
//       renderer?.dispose();
//     };
//   }, [canvasRef]);
// }

// /* ─── Card component ─────────────────────────────────────────────────── */
// function ActionCard({
//   href,
//   icon,
//   title,
//   sub,
//   variant = "dark",
// }: {
//   href: string;
//   icon: React.ReactNode;
//   title: string;
//   sub: string;
//   variant?: "orange" | "dark" | "blue";
// }) {
//   const base =
//     "group relative flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl overflow-hidden";

//   const styles = {
//     orange:
//       "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20 hover:shadow-orange-500/40",
//     dark: "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14]",
//     blue: "bg-blue-500/[0.08] border border-blue-500/[0.15] hover:bg-blue-500/[0.13] hover:border-blue-500/[0.25]",
//   };

//   return (
//     <Link href={href} className={`${base} ${styles[variant]}`}>
//       {/* Shimmer */}
//       <span
//         aria-hidden
//         className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full"
//       />

//       {/* Icon well */}
//       <div
//         className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl
//           ${variant === "orange" ? "bg-black/15" : variant === "blue" ? "bg-blue-500/20" : "bg-white/[0.06]"}`}
//       >
//         {icon}
//       </div>

//       <div className="flex-1 min-w-0">
//         <p
//           className={`text-sm font-semibold ${
//             variant === "orange" ? "text-white" : "text-white/90"
//           }`}
//         >
//           {title}
//         </p>
//         <p
//           className={`text-xs mt-0.5 truncate ${
//             variant === "orange"
//               ? "text-orange-100/70"
//               : variant === "blue"
//               ? "text-blue-300/60"
//               : "text-white/35"
//           }`}
//         >
//           {sub}
//         </p>
//       </div>

//       <svg
//         className={`shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${
//           variant === "orange" ? "text-white/60" : variant === "blue" ? "text-blue-400/50" : "text-white/20"
//         }`}
//         width="16"
//         height="16"
//         viewBox="0 0 16 16"
//         fill="none"
//       >
//         <path
//           d="M3 8h10M9 4l4 4-4 4"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </Link>
//   );
// }

// /* ─── Page ───────────────────────────────────────────────────────────── */
// export default function HomePage() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   useThreeScene(canvasRef);

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#080808] flex flex-col items-center justify-center px-5 py-12">

//       {/* Three.js canvas — fills entire background */}
//       <canvas
//         ref={canvasRef}
//         aria-hidden
//         className="pointer-events-none fixed inset-0 h-full w-full"
//         style={{ zIndex: 0 }}
//       />

//       {/* Radial vignette so center stays readable */}
//       <div
//         aria-hidden
//         className="pointer-events-none fixed inset-0"
//         style={{
//           zIndex: 1,
//           background:
//             "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 0%, #080808 75%)",
//         }}
//       />

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center w-full max-w-sm">

//         {/* Logo mark — glowing orb */}
//         <div className="relative mb-8">
//           {/* Glow ring */}
//           <div
//             aria-hidden
//             className="absolute inset-0 rounded-2xl blur-xl opacity-60 animate-pulse"
//             style={{ background: "radial-gradient(circle, #f97316, transparent 70%)", transform: "scale(1.8)" }}
//           />
//           <div
//             className="relative flex h-16 w-16 items-center justify-center rounded-2xl"
//             style={{
//               background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
//               boxShadow: "0 0 32px rgba(249,115,22,0.5), 0 0 8px rgba(249,115,22,0.3)",
//             }}
//           >
//             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
//               <path
//                 d="M3 11l19-9-9 19-2-8-8-2z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Eyebrow */}
//         <div className="flex items-center gap-2 mb-4">
//           <span className="h-px w-8 bg-orange-500/40" />
//           <p className="text-orange-500 text-[10px] font-bold tracking-[0.25em] uppercase">
//             Scan · Order · Enjoy
//           </p>
//           <span className="h-px w-8 bg-orange-500/40" />
//         </div>

//         {/* Headline */}
//         <h1
//           className="text-white text-[2.6rem] font-black text-center leading-[1.08] tracking-tight mb-3"
//           style={{ fontVariationSettings: "'wght' 900" }}
//         >
//           QR<span className="text-orange-500">Food</span>
//         </h1>

//         <p className="text-white/35 text-sm text-center leading-relaxed mb-10 max-w-[260px]">
//           Contactless ordering straight from your table — no app, no waiting.
//         </p>

//         {/* Action cards */}
//         <div className="flex flex-col gap-3 w-full">
//           <ActionCard
//             href="/customer/menu?table=1"
//             icon="🍽️"
//             title="Browse Menu"
//             sub="Table 1 — tap to order"
//             variant="orange"
//           />

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-0.5">
//             <div className="flex-1 h-px bg-white/[0.05]" />
//             <span className="text-[10px] text-white/20 tracking-widest uppercase">Staff access</span>
//             <div className="flex-1 h-px bg-white/[0.05]" />
//           </div>

//           <ActionCard
//             href="/admin/login"
//             icon={
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/50">
//                 <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
//                 <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
//                 <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
//                 <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
//               </svg>
//             }
//             title="Admin panel"
//             sub="Manage orders & menu"
//             variant="dark"
//           />

//           <ActionCard
//             href="/kitchen"
//             icon="👨‍🍳"
//             title="Kitchen display"
//             sub="Live order queue"
//             variant="blue"
//           />
//         </div>

//         {/* Status indicator */}
//         <div className="mt-10 flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2">
//           <span className="relative flex h-2 w-2">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
//             <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
//           </span>
//           <span className="text-[11px] text-white/30 tracking-wide">
//             All systems operational
//           </span>
//         </div>
//       </div>
//     </main>
//   );
// }


// above code work properly






"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Three.js Scene ──────────────────────────────────────────────────── */
function useThreeScene(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    let animId: number;
    let renderer: import("three").WebGLRenderer;

    (async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        65,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        200
      );
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setClearColor(0x000000, 0);

      // ── Central glowing orb ──
      const orbGeo = new THREE.SphereGeometry(1.1, 64, 64);
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0xf97316,
        emissive: 0xf97316,
        emissiveIntensity: 0.35,
        metalness: 0.1,
        roughness: 0.6,
        transparent: true,
        opacity: 0.08,
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      scene.add(orb);

      // Wireframe orb on top
      const wireGeo = new THREE.IcosahedronGeometry(1.35, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xf97316,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      scene.add(wire);

      // ── Ring 1 — fast inner ring ──
      const ring1Geo = new THREE.TorusGeometry(2.2, 0.012, 8, 160);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.35,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 2.5;
      scene.add(ring1);

      // ── Ring 2 — slow outer ring ──
      const ring2Geo = new THREE.TorusGeometry(3.2, 0.008, 8, 200);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0xfb923c,
        transparent: true,
        opacity: 0.18,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = Math.PI / 3;
      ring2.rotation.z = 0.4;
      scene.add(ring2);

      // ── Ring 3 — accent blue ring ──
      const ring3Geo = new THREE.TorusGeometry(4.2, 0.006, 8, 240);
      const ring3Mat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.1,
      });
      const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
      ring3.rotation.x = Math.PI / 1.8;
      ring3.rotation.y = 0.6;
      scene.add(ring3);

      // ── Floating particles ──
      const geoPool = [
        new THREE.IcosahedronGeometry(0.12, 0),
        new THREE.OctahedronGeometry(0.11, 0),
        new THREE.TetrahedronGeometry(0.1, 0),
        new THREE.BoxGeometry(0.13, 0.13, 0.13),
        new THREE.TorusGeometry(0.09, 0.03, 6, 8),
      ];

      const matOrange = new THREE.MeshStandardMaterial({
        color: 0xf97316,
        emissive: 0xf97316,
        emissiveIntensity: 0.2,
        metalness: 0.4,
        roughness: 0.3,
      });
      const matDark = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        metalness: 0.8,
        roughness: 0.2,
      });
      const matAccent = new THREE.MeshStandardMaterial({
        color: 0xfb923c,
        emissive: 0xfb923c,
        emissiveIntensity: 0.1,
        metalness: 0.2,
        roughness: 0.5,
      });
      const matBlue = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.15,
        metalness: 0.3,
        roughness: 0.4,
      });

      const matPool = [matOrange, matDark, matDark, matAccent, matBlue, matDark];

      type Particle = {
        mesh: import("three").Mesh;
        rx: number; ry: number; rz: number;
        radius: number; theta: number; phi: number; orbitSpeed: number;
        floatOffset: number; floatSpeed: number;
      };

      const particles: Particle[] = [];

      for (let i = 0; i < 55; i++) {
        const gi = i % geoPool.length;
        const mi = i % matPool.length;
        const mesh = new THREE.Mesh(geoPool[gi], matPool[mi]);

        const radius = 2.8 + Math.random() * 4.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const scale = 0.4 + Math.random() * 1.4;

        mesh.scale.setScalar(scale);
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        mesh.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi) - 2
        );
        scene.add(mesh);

        particles.push({
          mesh,
          rx: (Math.random() - 0.5) * 0.007,
          ry: (Math.random() - 0.5) * 0.007,
          rz: (Math.random() - 0.5) * 0.003,
          radius,
          theta,
          phi,
          orbitSpeed: (Math.random() - 0.5) * 0.0012,
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.3 + Math.random() * 0.5,
        });
      }

      // ── Lights ──
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));

      const pOrange = new THREE.PointLight(0xf97316, 4, 18);
      pOrange.position.set(4, 2, 4);
      scene.add(pOrange);

      const pOrange2 = new THREE.PointLight(0xea580c, 2, 14);
      pOrange2.position.set(-3, -1, 2);
      scene.add(pOrange2);

      const pBlue = new THREE.PointLight(0x3b82f6, 1.5, 12);
      pBlue.position.set(-5, 3, 1);
      scene.add(pBlue);

      const pWhite = new THREE.PointLight(0xffffff, 1, 10);
      pWhite.position.set(0, 5, 2);
      scene.add(pWhite);

      // ── Resize ──
      const onResize = () => {
        if (!canvas) return;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      };
      window.addEventListener("resize", onResize);

      // ── Mouse parallax ──
      let mx = 0, my = 0, tmx = 0, tmy = 0;
      const onMouse = (e: MouseEvent) => {
        tmx = (e.clientX / window.innerWidth - 0.5) * 0.6;
        tmy = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener("mousemove", onMouse);

      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.008;

        // Smooth mouse
        mx += (tmx - mx) * 0.05;
        my += (tmy - my) * 0.05;

        // Central objects
        wire.rotation.x += 0.003;
        wire.rotation.y += 0.005;
        orb.rotation.y += 0.002;

        // Rings
        ring1.rotation.z += 0.006;
        ring2.rotation.z -= 0.003;
        ring3.rotation.y += 0.002;
        ring3.rotation.z += 0.001;

        // Particles
        particles.forEach((p) => {
          p.mesh.rotation.x += p.rx;
          p.mesh.rotation.y += p.ry;
          p.mesh.rotation.z += p.rz;
          p.theta += p.orbitSpeed;

          const floatY = Math.sin(t * p.floatSpeed + p.floatOffset) * 0.08;

          p.mesh.position.x =
            p.radius * Math.sin(p.phi) * Math.cos(p.theta) + mx * 0.6;
          p.mesh.position.y =
            p.radius * Math.sin(p.phi) * Math.sin(p.theta) + my * 0.4 + floatY;
        });

        // Orbiting lights
        pOrange.position.x = Math.cos(t * 0.25) * 5;
        pOrange.position.z = Math.sin(t * 0.25) * 5;
        pBlue.position.x = Math.cos(t * 0.15 + Math.PI) * 6;
        pBlue.position.z = Math.sin(t * 0.15 + Math.PI) * 4;

        // Camera parallax
        camera.position.x += (mx * 0.8 - camera.position.x) * 0.03;
        camera.position.y += (-my * 0.6 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouse);
      };
    })();

    return () => {
      cancelAnimationFrame(animId);
      renderer?.dispose();
    };
  }, [canvasRef]);
}

/* ─── Animated counter ───────────────────────────────────────────────── */
function useCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return value;
}

/* ─── Stat pill ──────────────────────────────────────────────────────── */
function StatPill({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const count = useCounter(value);
  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
      <span className="text-lg font-black text-white tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-[10px] text-white/30 tracking-wider uppercase">{label}</span>
    </div>
  );
}

/* ─── Action card ────────────────────────────────────────────────────── */
function ActionCard({
  href,
  icon,
  title,
  sub,
  badge,
  variant = "dark",
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  badge?: string;
  variant?: "orange" | "dark" | "blue";
}) {
  const [hovered, setHovered] = useState(false);

  const bg = {
    orange: "bg-gradient-to-r from-orange-500 to-orange-600",
    dark: "bg-white/[0.04] border border-white/[0.08]",
    blue: "bg-blue-500/[0.07] border border-blue-500/[0.14]",
  }[variant];

  const shadow = {
    orange: hovered ? "shadow-2xl shadow-orange-500/40" : "shadow-lg shadow-orange-500/20",
    dark: hovered ? "shadow-xl shadow-black/40" : "",
    blue: hovered ? "shadow-xl shadow-blue-500/20" : "",
  }[variant];

  const iconBg = {
    orange: "bg-black/15",
    dark: "bg-white/[0.07]",
    blue: "bg-blue-500/15",
  }[variant];

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 overflow-hidden ${bg} ${shadow} ${hovered ? "-translate-y-0.5" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shimmer sweep */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 ${hovered ? "translate-x-full" : "-translate-x-full"}`}
      />

      {/* Left glow on hover */}
      {variant === "orange" && hovered && (
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-white/30" />
      )}

      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${iconBg}`}>
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`text-sm font-semibold ${variant === "orange" ? "text-white" : "text-white/90"}`}>
            {title}
          </p>
          {badge && (
            <span className="rounded-full bg-orange-500/20 border border-orange-500/30 px-2 py-0.5 text-[9px] font-bold text-orange-400 uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        <p className={`text-xs mt-0.5 ${variant === "orange" ? "text-orange-100/60" : variant === "blue" ? "text-blue-300/50" : "text-white/30"}`}>
          {sub}
        </p>
      </div>

      <svg
        className={`shrink-0 transition-all duration-200 ${hovered ? "translate-x-1 opacity-100" : "opacity-40"} ${variant === "orange" ? "text-white" : variant === "blue" ? "text-blue-400" : "text-white/50"}`}
        width="16" height="16" viewBox="0 0 16 16" fill="none"
      >
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useThreeScene(canvasRef);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060606] flex flex-col items-center justify-center px-5 py-12">

      {/* Three.js */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 h-full w-full"
        style={{ zIndex: 0 }}
      />

      {/* Deep vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 1,
          background: "radial-gradient(ellipse 65% 75% at 50% 50%, transparent 0%, #060606 72%)",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 h-40"
        style={{ zIndex: 1, background: "linear-gradient(to top, #060606, transparent)" }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center w-full max-w-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >

        {/* Logo */}
        <div className="relative mb-7">
          <div
            aria-hidden
            className="absolute inset-0 scale-[2.5] rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 65%)", filter: "blur(16px)" }}
          />
          <div
            className="relative flex h-[60px] w-[60px] items-center justify-center rounded-[18px]"
            style={{
              background: "linear-gradient(145deg, #f97316 0%, #c2410c 100%)",
              boxShadow: "0 0 0 1px rgba(249,115,22,0.3), 0 8px 32px rgba(249,115,22,0.4)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="currentColor" opacity="0.3"/>
              <path d="M8.1 13.34l2.83-9.99C11.04 2.52 11.52 2 12 2s.96.52 1.07 1.35l2.83 9.99c.24.85-.25 1.66-1 1.66H9.1c-.75 0-1.24-.81-1-1.66z" fill="currentColor"/>
              <circle cx="12" cy="19" r="2" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <div
          className={`flex items-center gap-2.5 mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-orange-500/50" />
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-orange-500/80">
            Scan · Order · Enjoy
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-orange-500/50" />
        </div>

        {/* Headline */}
        <div
          className={`transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-white text-[3rem] font-black text-center leading-none tracking-tighter mb-1">
            QR<span
              style={{
                background: "linear-gradient(135deg, #f97316, #fb923c, #fdba74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >Food</span>
          </h1>
        </div>

        <p
          className={`text-white/30 text-sm text-center leading-relaxed mb-8 max-w-[240px] transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Contactless ordering from your table — no app, no waiting, no friction.
        </p>

        {/* Stats row */}
        <div
          className={`flex gap-2.5 mb-8 w-full justify-center transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <StatPill value={500} label="Orders" suffix="+" />
          <StatPill value={99} label="Uptime" suffix="%" />
          <StatPill value={3} label="Modules" />
        </div>

        {/* Cards */}
        <div
          className={`flex flex-col gap-2.5 w-full transition-all duration-700 delay-[350ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <ActionCard
            href="/customer/menu?table=1"
            icon="🍽️"
            title="Browse Menu"
            sub="Tap to start ordering from your table"
            badge="Live"
            variant="orange"
          />

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-white/[0.04]" />
            <span className="text-[9px] text-white/15 tracking-[0.2em] uppercase">Staff Access</span>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>

          <ActionCard
            href="/admin/login"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/40">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Admin Panel"
            sub="Menu, orders, analytics & QR codes"
            variant="dark"
          />

          <ActionCard
            href="/kitchen"
            icon="👨‍🍳"
            title="Kitchen Display"
            sub="Live order queue with real-time alerts"
            variant="blue"
          />
        </div>

        {/* Status + version */}
        <div
          className={`mt-10 flex flex-col items-center gap-3 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-4 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
            </span>
            <span className="text-[10px] text-white/25 tracking-widest">All systems operational</span>
          </div>

          <p className="text-[10px] text-white/[0.12] tracking-wider">
            Made with <span className="text-red-500/60">♥</span> by{" "}
            <span className="text-white/20">Rajan Kumar Singh</span>
          </p>
        </div>

      </div>
    </main>
  );
}