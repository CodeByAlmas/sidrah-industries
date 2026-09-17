"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The hero is the product itself: a length of loom-state cloth, lit from one
 * side, moving the way fabric moves on a hanging roll.
 *
 * The weave is generated in the fragment shader — warp and weft are shaded
 * separately with an over/under mask, so at close range you can see the
 * interlacing rather than a texture photograph.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;      // 0 -> 1 on load: the cloth settles into place
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vFold;

  // Two crossed travelling waves give cloth-like, non-repeating motion.
  float clothHeight(vec2 p, float t) {
    float a = sin(p.x * 2.4 + t * 0.55) * 0.16;
    float b = sin(p.y * 1.7 - t * 0.38) * 0.10;
    float c = sin((p.x + p.y) * 3.1 + t * 0.9) * 0.04;
    return a + b + c;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float h = clothHeight(pos.xy, uTime);

    // Cloth is pinned along the top edge, so movement grows downward.
    float pin = smoothstep(0.0, 1.0, 1.0 - uv.y);
    h *= mix(0.15, 1.0, pin);

    // Intro: the sheet unrolls from the top.
    float unroll = smoothstep(0.0, 1.0, clamp((uIntro * 1.6) - (1.0 - uv.y) * 0.6, 0.0, 1.0));
    pos.z += h * unroll;
    pos.y += (1.0 - unroll) * 0.35;

    vFold = h;

    // Finite-difference normal for lighting the folds.
    float e = 0.02;
    float hx = clothHeight(pos.xy + vec2(e, 0.0), uTime) - h;
    float hy = clothHeight(pos.xy + vec2(0.0, e), uTime) - h;
    vNormal = normalize(vec3(-hx / e, -hy / e, 1.0));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uDensity;    // threads across the width
  uniform vec3  uWarp;
  uniform vec3  uWeft;
  uniform vec3  uShadow;
  uniform vec3  uDye;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vFold;

  // Rounded thread profile: 1 at the centre of a thread, 0 in the gap.
  float thread(float x) {
    float f = fract(x);
    return smoothstep(0.5, 0.06, abs(f - 0.5) * 2.0);
  }

  void main() {
    float d = uDensity;
    vec2 g = vUv * vec2(d, d * 1.2);

    float warp = thread(g.x);
    float weft = thread(g.y);

    // Plain weave: alternate which thread sits on top, square by square.
    float parity = mod(floor(g.x) + floor(g.y), 2.0);
    float warpOnTop = parity;

    vec3 col = uShadow;
    float lift = 0.0;

    if (warpOnTop > 0.5) {
      col = mix(col, uWeft, weft * 0.85);
      col = mix(col, uWarp, warp);
      lift = warp;
    } else {
      col = mix(col, uWarp, warp * 0.85);
      col = mix(col, uWeft, weft);
      lift = weft;
    }

    // Cylindrical shading across each raised thread gives the yarn its round.
    float round = 0.72 + 0.28 * lift;
    col *= round;

    // Single key light from the upper left, the way a shed lamp sits.
    vec3 n = normalize(vNormal);
    float diff = clamp(dot(n, normalize(vec3(-0.45, 0.7, 0.85))), 0.0, 1.0);
    col = mix(col * 0.50, col, 0.42 + diff * 0.78);
    // Indigo settles in the troughs, the way dye pools in a fold.
    col = mix(col, uDye, smoothstep(0.55, 1.0, 1.0 - diff) * 0.22);
    col += vec3(0.96, 0.93, 0.86) * pow(diff, 6.0) * 0.14;

    // Folds darken in the trough.
    col *= 1.0 + vFold * 0.5;

    // Vignette so the sheet reads as a roll, not a wall.
    float edge = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
    edge *= smoothstep(0.0, 0.10, vUv.y) * smoothstep(1.0, 0.86, vUv.y);
    col *= 0.38 + edge * 0.62;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Cloth() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const start = useRef<number>(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uDensity: { value: small ? 78 : 130 },
      uWarp: { value: new THREE.Color("#ded5c1") },
      uWeft: { value: new THREE.Color("#a89a7c") },
      uShadow: { value: new THREE.Color("#15180f") },
      uDye: { value: new THREE.Color("#3a5a96") },
    }),
    [],
  );

  useFrame((state) => {
    if (!mat.current) return;
    if (!start.current) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime;
    mat.current.uniforms.uTime.value = t;
    mat.current.uniforms.uIntro.value = Math.min(1, (t - start.current) / 1.9);
  });

  return (
    <mesh rotation={[0, 0, 0]}>
      <planeGeometry args={[8, 8, SEG, SEG]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/** Phones get a coarser mesh, a lower pixel ratio and fewer threads — the
 *  weave still reads at arm's length and the frame budget stays honest. */
const small = typeof window !== "undefined" && window.innerWidth < 768;
const SEG = small ? 110 : 180;
const MAX_DPR = small ? 1.5 : 2;

export default function WeaveCloth() {
  return (
    <Canvas
      dpr={[1, MAX_DPR]}
      camera={{ position: [0, 0, 3.1], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Cloth />
    </Canvas>
  );
}
