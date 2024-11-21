import React from "react";
import styles from "./visualizer.module.css";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model({ label, ...props }) {
  const { scene } = useGLTF(`/${label}.glb`);
  return <primitive object={scene} {...props} />;
}

function Visualizer({ label, setSelectedPoint }) {
  const handleClose = () => {
    setSelectedPoint(null);
  };

  if (!label) {
    return;
  }

  return (
    <div
      className={styles.container}
      style={{
        left: `${["Brain", "Lungs"].includes(label) ? "50px" : null}`,
        top: "50px",
        right: `${
          ["Stomach", "Intestines", "Heart", "Spine"].includes(label)
            ? "50px"
            : null
        }`,
      }}
    >
      <div className={styles.headerSection}>
        <div className={styles.title}>{label}</div>
        <button onClick={handleClose}>Close</button>
      </div>
      <Canvas
        className={styles.canvasContainer}
        shadows={false}
        dpr={[1, 2]}
        camera={{ fov: 45 }}
      >
        <PresentationControls
          speed={1.5}
          global
          zoom={0.2}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={"lobby"} intensity={0.005}>
            <Model label={label} rotation={[0, Math.PI, 0]} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

export default Visualizer;
