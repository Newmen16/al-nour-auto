import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export interface PointerState {
  x: number;
  y: number;
}

type Track = <T extends { dispose(): void }>(item: T) => T;

function buildCar(track: Track): THREE.Group {
  const group = new THREE.Group();

  const bodyMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xc9ccd4,
      metalness: 0.6,
      roughness: 0.34,
    }),
  );
  const darkMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x16161a,
      metalness: 0.5,
      roughness: 0.5,
    }),
  );
  const glassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x0a0b0e,
      metalness: 0.2,
      roughness: 0.15,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    }),
  );
  const chromeMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x93939d,
      metalness: 1,
      roughness: 0.24,
    }),
  );
  const goldMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xf5b942,
      metalness: 0.7,
      roughness: 0.3,
    }),
  );
  const headMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xfff6e5,
      emissive: 0xffe6b0,
      emissiveIntensity: 1.6,
      roughness: 0.35,
    }),
  );
  const tailMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xe8a317,
      emissive: 0xe8a317,
      emissiveIntensity: 1.3,
      roughness: 0.35,
    }),
  );
  const tyreMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x0e0e11,
      roughness: 0.9,
      metalness: 0,
    }),
  );
  const rimMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x35353d,
      metalness: 0.9,
      roughness: 0.35,
    }),
  );

  const shell = new THREE.Shape();
  shell.moveTo(-2.04, 0.52);
  shell.lineTo(-1.88, 0.52);
  shell.absarc(-1.42, 0.52, 0.46, Math.PI, 0, true);
  shell.lineTo(0.96, 0.52);
  shell.absarc(1.42, 0.52, 0.46, Math.PI, 0, true);
  shell.lineTo(1.98, 0.52);
  shell.lineTo(2.14, 0.6);
  shell.lineTo(2.17, 0.9);
  shell.quadraticCurveTo(2.15, 1.0, 1.94, 1.02);
  shell.lineTo(1.3, 1.08);
  shell.lineTo(-1.64, 1.14);
  shell.lineTo(-1.92, 1.14);
  shell.quadraticCurveTo(-2.08, 1.1, -2.1, 0.96);
  shell.lineTo(-2.1, 0.66);
  shell.closePath();

  const shellGeo = track(
    new THREE.ExtrudeGeometry(shell, {
      depth: 1.7,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
      curveSegments: 24,
      steps: 1,
    }),
  );
  shellGeo.computeBoundingBox();
  const shellBox = shellGeo.boundingBox;
  if (shellBox) shellGeo.translate(0, 0, -(shellBox.min.z + shellBox.max.z) / 2);
  const shellMesh = new THREE.Mesh(shellGeo, bodyMat);
  shellMesh.castShadow = true;
  group.add(shellMesh);

  const cabin = new THREE.Shape();
  cabin.moveTo(1.26, 1.06);
  cabin.quadraticCurveTo(1.0, 1.1, 0.84, 1.34);
  cabin.lineTo(0.26, 1.58);
  cabin.lineTo(-0.98, 1.58);
  cabin.quadraticCurveTo(-1.34, 1.56, -1.56, 1.28);
  cabin.lineTo(-1.66, 1.12);
  cabin.closePath();

  const cabinGeo = track(
    new THREE.ExtrudeGeometry(cabin, {
      depth: 1.5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
      curveSegments: 20,
      steps: 1,
    }),
  );
  cabinGeo.computeBoundingBox();
  const cabinBox = cabinGeo.boundingBox;
  if (cabinBox) cabinGeo.translate(0, 0, -(cabinBox.min.z + cabinBox.max.z) / 2);
  const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
  cabinMesh.castShadow = true;
  group.add(cabinMesh);

  const roofGeo = track(new RoundedBoxGeometry(1.4, 0.1, 1.66, 3, 0.04));
  const roof = new THREE.Mesh(roofGeo, bodyMat);
  roof.position.set(-0.36, 1.6, 0);
  roof.castShadow = true;
  group.add(roof);

  const railGeo = track(new RoundedBoxGeometry(1.05, 0.05, 0.06, 2, 0.02));
  for (const side of [1, -1]) {
    const rail = new THREE.Mesh(railGeo, darkMat);
    rail.position.set(-0.36, 1.66, side * 0.62);
    group.add(rail);
  }

  const grilleGeo = track(new RoundedBoxGeometry(0.06, 0.2, 1.0, 2, 0.02));
  const grille = new THREE.Mesh(grilleGeo, darkMat);
  grille.position.set(2.16, 0.74, 0);
  group.add(grille);

  const accentGeo = track(new THREE.BoxGeometry(0.05, 0.04, 1.06));
  const accent = new THREE.Mesh(accentGeo, goldMat);
  accent.position.set(2.17, 0.6, 0);
  group.add(accent);

  const headGeo = track(new RoundedBoxGeometry(0.08, 0.11, 0.4, 2, 0.02));
  for (const side of [1, -1]) {
    const lamp = new THREE.Mesh(headGeo, headMat);
    lamp.position.set(2.14, 0.95, side * 0.52);
    group.add(lamp);
  }

  const tailGeo = track(new RoundedBoxGeometry(0.06, 0.1, 1.42, 2, 0.02));
  const tail = new THREE.Mesh(tailGeo, tailMat);
  tail.position.set(-2.08, 1.03, 0);
  group.add(tail);

  const lineGeo = track(new THREE.BoxGeometry(2.5, 0.03, 0.02));
  for (const side of [1, -1]) {
    const character = new THREE.Mesh(lineGeo, darkMat);
    character.position.set(-0.1, 0.96, side * 0.905);
    group.add(character);
  }

  const handleGeo = track(new RoundedBoxGeometry(0.16, 0.04, 0.03, 2, 0.015));
  for (const side of [1, -1]) {
    for (const x of [0.3, -0.85]) {
      const handle = new THREE.Mesh(handleGeo, chromeMat);
      handle.position.set(x, 1.03, side * 0.91);
      group.add(handle);
    }
  }

  const mirrorGeo = track(new RoundedBoxGeometry(0.16, 0.09, 0.13, 2, 0.03));
  for (const side of [1, -1]) {
    const mirror = new THREE.Mesh(mirrorGeo, bodyMat);
    mirror.position.set(1.0, 1.17, side * 0.96);
    mirror.castShadow = true;
    group.add(mirror);
  }

  const tyreGeo = track(new THREE.CylinderGeometry(0.37, 0.37, 0.27, 30));
  tyreGeo.rotateX(Math.PI / 2);
  const rimGeo = track(new THREE.CylinderGeometry(0.215, 0.215, 0.28, 24));
  rimGeo.rotateX(Math.PI / 2);
  const hubGeo = track(new THREE.CylinderGeometry(0.055, 0.055, 0.31, 16));
  hubGeo.rotateX(Math.PI / 2);
  const spokeGeo = track(new THREE.BoxGeometry(0.045, 0.3, 0.04));
  const ringGeo = track(new THREE.TorusGeometry(0.17, 0.016, 8, 32));

  for (const x of [1.42, -1.42]) {
    for (const z of [0.8, -0.8]) {
      const wheel = new THREE.Group();
      wheel.position.set(x, 0.37, z);

      const tyre = new THREE.Mesh(tyreGeo, tyreMat);
      tyre.castShadow = true;
      wheel.add(tyre);

      const rim = new THREE.Mesh(rimGeo, rimMat);
      wheel.add(rim);

      const face = z > 0 ? 0.15 : -0.15;

      const ring = new THREE.Mesh(ringGeo, goldMat);
      ring.position.z = face;
      if (z < 0) ring.rotation.y = Math.PI;
      wheel.add(ring);

      const hub = new THREE.Mesh(hubGeo, goldMat);
      wheel.add(hub);

      for (let i = 0; i < 5; i += 1) {
        const spoke = new THREE.Mesh(spokeGeo, chromeMat);
        spoke.position.z = face;
        spoke.rotation.z = (i * Math.PI * 2) / 5;
        wheel.add(spoke);
      }

      group.add(wheel);
    }
  }

  return group;
}

function buildFloor(track: Track): THREE.Group {
  const group = new THREE.Group();

  const baseGeo = track(new THREE.CircleGeometry(8, 64));
  const baseMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x101013,
      roughness: 0.95,
      metalness: 0.05,
    }),
  );
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.rotation.x = -Math.PI / 2;
  base.receiveShadow = true;
  group.add(base);

  const stageGeo = track(new THREE.CircleGeometry(3.7, 64));
  const stageMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x16161b,
      roughness: 0.75,
      metalness: 0.2,
    }),
  );
  const stage = new THREE.Mesh(stageGeo, stageMat);
  stage.rotation.x = -Math.PI / 2;
  stage.position.y = 0.004;
  stage.receiveShadow = true;
  group.add(stage);

  const rimGeo = track(new THREE.TorusGeometry(3.7, 0.012, 8, 96));
  const rimMat = track(
    new THREE.MeshBasicMaterial({ color: 0xf5b942, transparent: true, opacity: 0.55 }),
  );
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = -Math.PI / 2;
  rim.position.y = 0.006;
  group.add(rim);

  return group;
}

export function HeroStudio({ pointer }: { pointer: RefObject<PointerState> }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const disposables: { dispose(): void }[] = [];
    const track: Track = (item) => {
      disposables.push(item);
      return item;
    };

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 140);
    const lookTarget = new THREE.Vector3(0, 0.62, 0);

    const car = buildCar(track);
    scene.add(car);

    const floor = buildFloor(track);
    scene.add(floor);

    const hemi = new THREE.HemisphereLight(0x50505e, 0x09090b, 0.7);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xfff1dc, 2.4);
    key.position.set(5, 8, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 32;
    key.shadow.camera.left = -7;
    key.shadow.camera.right = 7;
    key.shadow.camera.top = 7;
    key.shadow.camera.bottom = -7;
    key.shadow.bias = -0.001;
    key.shadow.normalBias = 0.02;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xa8c0ff, 0.55);
    fill.position.set(-7, 3, 4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xf5b942, 2.1);
    rim.position.set(-3, 5, -8);
    scene.add(rim);

    let baseCamY = 1.47;

    const layout = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;

      const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
      const tanH = tanV * camera.aspect;
      const wide = width / height >= 1.1;

      if (wide) {
        const scale = 1;
        const halfExtent = 2.45 * scale;
        const targetY = 0.62;
        const dist = Math.max(halfExtent / (0.6 * tanH), 1.35 / tanV);
        const halfW = tanH * dist;
        car.scale.setScalar(scale);
        car.position.set(0.4 * halfW, 0, 0);
        lookTarget.set(0, targetY, 0);
        baseCamY = targetY + 0.85;
        camera.position.set(0, baseCamY, dist);
      } else {
        const scale = 1.25;
        const halfExtent = 2.45 * scale;
        const dist = Math.max((halfExtent * 1.14) / tanH, 2.4 / tanV);
        const halfV = tanV * dist;
        const centerY = -0.38 * halfV;
        car.scale.setScalar(scale);
        car.position.set(0, centerY - 0.8 * scale, 0);
        lookTarget.set(0, 0, 0);
        baseCamY = Math.max(1, centerY + 1.7);
        camera.position.set(0, baseCamY, dist);
      }

      camera.lookAt(lookTarget);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    layout();

    let rafId = 0;
    let lastTime = performance.now();
    let idleYaw = -0.45;
    let yaw = idleYaw;
    let camY = baseCamY;

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      idleYaw += dt * 0.16;
      const targetYaw = idleYaw + pointer.current.x * 0.55;
      yaw += (targetYaw - yaw) * (1 - Math.exp(-5 * dt));
      car.rotation.y = yaw;

      const targetCamY = baseCamY - pointer.current.y * 0.35;
      camY += (targetCamY - camY) * (1 - Math.exp(-4 * dt));
      camera.position.y = camY;
      camera.lookAt(lookTarget);

      renderer.render(scene, camera);
    };

    const start = () => {
      if (rafId === 0 && !reduced) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      layout();
      if (reduced) {
        car.rotation.y = -0.45;
        camera.lookAt(lookTarget);
        renderer.render(scene, camera);
      }
    });
    resizeObserver.observe(mount);

    let inView = true;
    const viewObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        if (inView) start();
        else stop();
      },
      { threshold: 0.02 },
    );
    viewObserver.observe(mount);

    if (reduced) {
      car.rotation.y = -0.45;
      renderer.render(scene, camera);
    } else {
      start();
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      for (const item of disposables) item.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [pointer]);

  return <div ref={mountRef} className="absolute inset-0" />;
}
