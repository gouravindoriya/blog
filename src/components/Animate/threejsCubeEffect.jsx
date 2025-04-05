import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    
    const material = new THREE.MeshBasicMaterial({
      color: "#000",
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    const cube2 = new THREE.Mesh(geometry, material);

    scene.add(cube);
    scene.add(cube2);
   
    

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true,});
    renderer.setSize(window.innerWidth, window.innerHeight);

    const animate = () => {
      cube.rotation.x += .05;
      cube.rotation.y += .05;
      cube.rotation.z += .05;
      cube.scale.x = Math.sin(Date.now() * 0.001) + 1;
      cube.scale.y = Math.sin(Date.now() * 0.001) + 1;
      cube.scale.z = Math.sin(Date.now() * 0.001) + 1;
      cube.position.x= Math.sin(Date.now() * 0.001) * 2
      cube.position.y= Math.cos(Date.now() * 0.001) * 2
      cube.position.z= Math.tan(Date.now() * 0.001) * 2

      cube2.rotation.x += .02;
      cube2.rotation.y += .02;
      cube2.rotation.z += .02;
      cube2.scale.x = Math.sin(Date.now() * 0.001) + 1;
      cube2.scale.y = Math.sin(Date.now() * 0.001) + 1;
      cube2.scale.z = Math.sin(Date.now() * 0.001) + 1;
      cube2.position.x= Math.tan(Date.now() * 0.001) * 2
      cube2.position.y= Math.cos(Date.now() * 0.001) * 2
      cube2.position.z= Math.sin(Date.now() * 0.001) * 2


      renderer.render(scene, camera);



    };
  

    renderer.setAnimationLoop(animate);
    

    
    
  }, []);

  return <canvas className="absolute top-0 left-0 bg- z-0" ref={canvasRef} id="world" />;
};

export default ThreeScene;
