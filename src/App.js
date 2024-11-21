import Visualizer from "./components/visualizer";
import "./app.css";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { useState } from "react";

function Model(props) {
  const { scene } = useGLTF("/human.glb");
  return <primitive object={scene} {...props} />;
}

function ClickablePoint({ position, onClick, label }) {
  return (
    <>
      {/* Glow effect using a ring */}
      <mesh position={position}>
        <ringGeometry args={[0.02, 0.03, 32]} />
        <meshBasicMaterial color="yellow" transparent opacity={0.6} />
      </mesh>

      {/* Clickable point */}
      <mesh position={position} onClick={onClick}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}

function App() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handlePointClick = (label) => {
    setSelectedPoint(null);
    setSelectedPoint(label);
  };

  return (
    <div className="app">
      <div className="title">Important Human Organs</div>
      <div className="container">
        <Canvas
          className="canvas-container"
          dpr={[1, 2]}
          shadows={"soft"}
          gl={{ physicallyCorrectLights: true }}
          camera={{ fov: 45 }}
        >
          <color attach="background" args={["#fff"]} />
          <PresentationControls
            speed={1.5}
            global
            zoom={0.2}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment={"lobby"} intensity={0.005}>
              <Model rotation={[0, Math.PI, 0]} />
              {/* Clickable points with light circle effect */}
              <ClickablePoint
                position={[-0.03, 0.45, 0.15]} // Adjust coordinates
                onClick={() => handlePointClick("Brain")}
                label="Brain"
              />
              <ClickablePoint
                position={[-0.06, 0.3, 0.15]} // Adjust coordinates
                onClick={() => handlePointClick("Lungs")}
                label="Lungs"
              />
              <ClickablePoint
                position={[-0.02, 0.28, 0.15]} // Adjust coordinates
                onClick={() => handlePointClick("Heart")}
                label="Heart"
              />
              <ClickablePoint
                position={[-0.03, 0.23, 0.15]} // Adjust coordinates
                onClick={() => handlePointClick("Stomach")}
                label="Stomach"
              />
              <ClickablePoint
                position={[-0.03, 0.23, -0.06]} // Adjust coordinates
                onClick={() => handlePointClick("Spine")}
                label="Spine"
              />
              <ClickablePoint
                position={[-0.03, 0.15, 0.15]} // Adjust coordinates
                onClick={() => handlePointClick("Intestines")}
                label="Intestines"
              />
            </Stage>
          </PresentationControls>
        </Canvas>
      </div>
      <Visualizer label={selectedPoint} setSelectedPoint={setSelectedPoint} />
    </div>
  );
}

export default App;
