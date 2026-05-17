import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function AvatarBody() {
  const bodyRef = useRef<THREE.Group>(null);

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0d0d2e",
        metalness: 0.7,
        roughness: 0.3,
        emissive: "#00f0ff",
        emissiveIntensity: 0.05,
      }),
    []
  );

  const trimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00f0ff",
        metalness: 0.9,
        roughness: 0.1,
        emissive: "#00f0ff",
        emissiveIntensity: 0.6,
      }),
    []
  );

  const collarMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a3e",
        metalness: 0.6,
        roughness: 0.4,
        emissive: "#ff00e5",
        emissiveIntensity: 0.08,
      }),
    []
  );

  return (
    <group ref={bodyRef} position={[0, -1.2, 0]}>
      {/* Torso */}
      <mesh material={bodyMaterial} position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.48, 1.4, 8]} />
      </mesh>

      {/* Shoulders */}
      <mesh material={bodyMaterial} position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.1, 0.25, 0.45]} />
      </mesh>

      {/* Left arm */}
      <mesh material={bodyMaterial} position={[-0.6, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 1.0, 8]} />
      </mesh>

      {/* Right arm */}
      <mesh material={bodyMaterial} position={[0.6, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 1.0, 8]} />
      </mesh>

      {/* Collar / neck opening */}
      <mesh material={collarMaterial} position={[0, 0.72, 0]}>
        <torusGeometry args={[0.18, 0.06, 8, 16]} />
      </mesh>

      {/* Chest trim line */}
      <mesh material={trimMaterial} position={[0, 0.2, 0.39]}>
        <boxGeometry args={[0.5, 0.02, 0.01]} />
      </mesh>
      <mesh material={trimMaterial} position={[0, 0.05, 0.39]}>
        <boxGeometry args={[0.6, 0.02, 0.01]} />
      </mesh>

      {/* Shoulder trim */}
      <mesh material={trimMaterial} position={[-0.45, 0.55, 0.2]}>
        <boxGeometry args={[0.02, 0.2, 0.01]} />
      </mesh>
      <mesh material={trimMaterial} position={[0.45, 0.55, 0.2]}>
        <boxGeometry args={[0.02, 0.2, 0.01]} />
      </mesh>
    </group>
  );
}

export function AvatarHead() {
  const headRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const idleTime = useRef(0);

  const skinMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8c4a0",
        metalness: 0.1,
        roughness: 0.7,
      }),
    []
  );

  const hairMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a2e",
        metalness: 0.3,
        roughness: 0.6,
      }),
    []
  );

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00f0ff",
        emissive: "#00f0ff",
        emissiveIntensity: 2.0,
        metalness: 1,
        roughness: 0,
      }),
    []
  );

  const pupilMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#000000",
        metalness: 0,
        roughness: 1,
      }),
    []
  );

  const mouthMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c4826e",
        metalness: 0.05,
        roughness: 0.8,
      }),
    []
  );

  const { viewport } = useThree();

  const handlePointerMove = useCallback(
    (e: THREE.Event & { point?: THREE.Vector3 }) => {
      if (!headRef.current) return;
      const headWorldPos = new THREE.Vector3();
      headRef.current.getWorldPosition(headWorldPos);

      const dx = (e.point?.x ?? 0) - headWorldPos.x;
      const dy = (e.point?.y ?? 0) - headWorldPos.y;

      const maxAngle = 0.17; // ~10 degrees
      const normalizedX = THREE.MathUtils.clamp(dx / (viewport.width * 0.5), -1, 1);
      const normalizedY = THREE.MathUtils.clamp(dy / (viewport.height * 0.5), -1, 1);

      targetRotation.current.y = normalizedX * maxAngle;
      targetRotation.current.x = -normalizedY * maxAngle;
      idleTime.current = 0;
    },
    [viewport.width, viewport.height]
  );

  useFrame((state, delta) => {
    if (!headRef.current) return;

    idleTime.current += delta;

    // Idle animation when mouse hasn't moved
    if (idleTime.current > 2.0) {
      const idleSway = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      const idleNod = Math.sin(state.clock.elapsedTime * 0.3) * 0.015;
      targetRotation.current.y += idleSway * delta * 2;
      targetRotation.current.x += idleNod * delta * 2;
    }

    // Lerp for smooth follow
    const lerpFactor = 1 - Math.pow(0.001, delta);
    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      lerpFactor
    );
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      lerpFactor
    );

    headRef.current.rotation.x = currentRotation.current.x;
    headRef.current.rotation.y = currentRotation.current.y;
  });

  return (
    <group
      ref={headRef}
      position={[0, 0.85, 0]}
      onPointerMove={handlePointerMove as never}
    >
      {/* Neck */}
      <mesh material={skinMaterial} position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.1, 0.13, 0.2, 8]} />
      </mesh>

      {/* Head */}
      <mesh material={skinMaterial} position={[0, 0.15, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
      </mesh>

      {/* Hair - top */}
      <mesh material={hairMaterial} position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.3, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      </mesh>

      {/* Hair - back */}
      <mesh material={hairMaterial} position={[0, 0.15, -0.12]}>
        <boxGeometry args={[0.58, 0.35, 0.15]} />
      </mesh>

      {/* Hair - sides */}
      <mesh material={hairMaterial} position={[-0.27, 0.1, 0]}>
        <boxGeometry args={[0.06, 0.3, 0.4]} />
      </mesh>
      <mesh material={hairMaterial} position={[0.27, 0.1, 0]}>
        <boxGeometry args={[0.06, 0.3, 0.4]} />
      </mesh>

      {/* Left eye glow */}
      <mesh material={eyeMaterial} position={[-0.1, 0.18, 0.24]}>
        <sphereGeometry args={[0.04, 12, 12]} />
      </mesh>
      {/* Left pupil */}
      <mesh material={pupilMaterial} position={[-0.1, 0.18, 0.27]}>
        <sphereGeometry args={[0.02, 8, 8]} />
      </mesh>

      {/* Right eye glow */}
      <mesh material={eyeMaterial} position={[0.1, 0.18, 0.24]}>
        <sphereGeometry args={[0.04, 12, 12]} />
      </mesh>
      {/* Right pupil */}
      <mesh material={pupilMaterial} position={[0.1, 0.18, 0.27]}>
        <sphereGeometry args={[0.02, 8, 8]} />
      </mesh>

      {/* Mouth */}
      <mesh material={mouthMaterial} position={[0, 0.04, 0.25]}>
        <boxGeometry args={[0.08, 0.015, 0.01]} />
      </mesh>

      {/* Cyber visor / headpiece */}
      <mesh position={[0, 0.32, 0.15]}>
        <boxGeometry args={[0.4, 0.03, 0.08]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Ear pieces */}
      <mesh position={[-0.28, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.12, 0.08]} />
        <meshStandardMaterial
          color="#ff00e5"
          emissive="#ff00e5"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.28, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.12, 0.08]} />
        <meshStandardMaterial
          color="#ff00e5"
          emissive="#ff00e5"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export function MouseTracker() {
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { pointer } = state;
    const maxAngle = 0.17;
    targetRotation.current.y = pointer.x * maxAngle;
    targetRotation.current.x = -pointer.y * maxAngle;
  });

  return null;
}

function AvatarScene() {
  const headRef = useRef<THREE.Group>(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });
  const idleTime = useRef(0);

  useFrame((state, delta) => {
    if (!headRef.current) return;

    const { pointer } = state;
    const maxAngle = 0.17;

    const isPointerActive =
      Math.abs(pointer.x) > 0.01 || Math.abs(pointer.y) > 0.01;

    if (isPointerActive) {
      targetRot.current.y = pointer.x * maxAngle;
      targetRot.current.x = -pointer.y * maxAngle;
      idleTime.current = 0;
    } else {
      idleTime.current += delta;
    }

    // Idle sway
    if (idleTime.current > 1.5) {
      const sway = Math.sin(state.clock.elapsedTime * 0.6) * 0.025;
      const nod = Math.sin(state.clock.elapsedTime * 0.35) * 0.018;
      targetRot.current.y = sway;
      targetRot.current.x = nod;
    }

    // Smooth lerp
    const lerpFactor = 1 - Math.pow(0.0008, delta);
    currentRot.current.x = THREE.MathUtils.lerp(
      currentRot.current.x,
      targetRot.current.x,
      lerpFactor
    );
    currentRot.current.y = THREE.MathUtils.lerp(
      currentRot.current.y,
      targetRot.current.y,
      lerpFactor
    );

    headRef.current.rotation.x = currentRot.current.x;
    headRef.current.rotation.y = currentRot.current.y;
  });

  const skinMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8c4a0",
        metalness: 0.1,
        roughness: 0.7,
      }),
    []
  );

  const hairMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a2e",
        metalness: 0.3,
        roughness: 0.6,
      }),
    []
  );

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00f0ff",
        emissive: "#00f0ff",
        emissiveIntensity: 2.0,
        metalness: 1,
        roughness: 0,
      }),
    []
  );

  const pupilMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#000000",
        metalness: 0,
        roughness: 1,
      }),
    []
  );

  const mouthMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c4826e",
        metalness: 0.05,
        roughness: 0.8,
      }),
    []
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0d0d2e",
        metalness: 0.7,
        roughness: 0.3,
        emissive: "#00f0ff",
        emissiveIntensity: 0.05,
      }),
    []
  );

  const trimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00f0ff",
        metalness: 0.9,
        roughness: 0.1,
        emissive: "#00f0ff",
        emissiveIntensity: 0.6,
      }),
    []
  );

  const collarMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a3e",
        metalness: 0.6,
        roughness: 0.4,
        emissive: "#ff00e5",
        emissiveIntensity: 0.08,
      }),
    []
  );

  const visorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00f0ff",
        emissive: "#00f0ff",
        emissiveIntensity: 0.8,
        metalness: 1,
        roughness: 0,
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  const earpieceMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff00e5",
        emissive: "#ff00e5",
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.1,
      }),
    []
  );

  return (
    <group position={[0, -0.3, 0]}>
      {/* === BODY (static) === */}
      <group position={[0, -1.2, 0]}>
        {/* Torso */}
        <mesh material={bodyMaterial} castShadow>
          <cylinderGeometry args={[0.38, 0.48, 1.4, 8]} />
        </mesh>
        {/* Shoulders */}
        <mesh material={bodyMaterial} position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[1.1, 0.25, 0.45]} />
        </mesh>
        {/* Left arm */}
        <mesh material={bodyMaterial} position={[-0.6, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 1.0, 8]} />
        </mesh>
        {/* Right arm */}
        <mesh material={bodyMaterial} position={[0.6, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 1.0, 8]} />
        </mesh>
        {/* Collar */}
        <mesh material={collarMaterial} position={[0, 0.72, 0]}>
          <torusGeometry args={[0.18, 0.06, 8, 16]} />
        </mesh>
        {/* Chest trim lines */}
        <mesh material={trimMaterial} position={[0, 0.2, 0.39]}>
          <boxGeometry args={[0.5, 0.02, 0.01]} />
        </mesh>
        <mesh material={trimMaterial} position={[0, 0.05, 0.39]}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
        </mesh>
        {/* Shoulder trim */}
        <mesh material={trimMaterial} position={[-0.45, 0.55, 0.2]}>
          <boxGeometry args={[0.02, 0.2, 0.01]} />
        </mesh>
        <mesh material={trimMaterial} position={[0.45, 0.55, 0.2]}>
          <boxGeometry args={[0.02, 0.2, 0.01]} />
        </mesh>
      </group>

      {/* === HEAD (mouse-tracked) === */}
      <group ref={headRef} position={[0, 0.85, 0]}>
        {/* Neck */}
        <mesh material={skinMaterial} position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.1, 0.13, 0.2, 8]} />
        </mesh>
        {/* Head */}
        <mesh material={skinMaterial} position={[0, 0.15, 0]} castShadow>
          <sphereGeometry args={[0.28, 16, 16]} />
        </mesh>
        {/* Hair top */}
        <mesh material={hairMaterial} position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.3, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>
        {/* Hair back */}
        <mesh material={hairMaterial} position={[0, 0.15, -0.12]}>
          <boxGeometry args={[0.58, 0.35, 0.15]} />
        </mesh>
        {/* Hair sides */}
        <mesh material={hairMaterial} position={[-0.27, 0.1, 0]}>
          <boxGeometry args={[0.06, 0.3, 0.4]} />
        </mesh>
        <mesh material={hairMaterial} position={[0.27, 0.1, 0]}>
          <boxGeometry args={[0.06, 0.3, 0.4]} />
        </mesh>
        {/* Left eye */}
        <mesh material={eyeMaterial} position={[-0.1, 0.18, 0.24]}>
          <sphereGeometry args={[0.04, 12, 12]} />
        </mesh>
        <mesh material={pupilMaterial} position={[-0.1, 0.18, 0.27]}>
          <sphereGeometry args={[0.02, 8, 8]} />
        </mesh>
        {/* Right eye */}
        <mesh material={eyeMaterial} position={[0.1, 0.18, 0.24]}>
          <sphereGeometry args={[0.04, 12, 12]} />
        </mesh>
        <mesh material={pupilMaterial} position={[0.1, 0.18, 0.27]}>
          <sphereGeometry args={[0.02, 8, 8]} />
        </mesh>
        {/* Mouth */}
        <mesh material={mouthMaterial} position={[0, 0.04, 0.25]}>
          <boxGeometry args={[0.08, 0.015, 0.01]} />
        </mesh>
        {/* Cyber visor */}
        <mesh material={visorMaterial} position={[0, 0.32, 0.15]}>
          <boxGeometry args={[0.4, 0.03, 0.08]} />
        </mesh>
        {/* Ear pieces */}
        <mesh material={earpieceMaterial} position={[-0.28, 0.15, 0]}>
          <boxGeometry args={[0.04, 0.12, 0.08]} />
        </mesh>
        <mesh material={earpieceMaterial} position={[0.28, 0.15, 0]}>
          <boxGeometry args={[0.04, 0.12, 0.08]} />
        </mesh>
      </group>
    </group>
  );
}

export default function Avatar3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.3, 2.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[2, 3, 5]}
          intensity={0.8}
          color="#ffffff"
        />
        <pointLight position={[3, 2, 3]} intensity={0.6} color="#00f0ff" />
        <pointLight position={[-3, 1, 2]} intensity={0.4} color="#ff00e5" />
        <pointLight position={[0, -1, 3]} intensity={0.3} color="#b000ff" />

        <AvatarScene />
      </Canvas>
    </div>
  );
}
