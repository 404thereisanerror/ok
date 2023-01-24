import { load } from "ngraph.gexf";
import ForceGraph3D from "3d-force-graph";

const container = document.getElementById("container");
const gexfFilePath = "./src/111final_tagesschau.gexf";

fetch(gexfFilePath)
  .then((res) => res.text())
  .then((gexfContent) => {
    const graph = load(gexfContent);
    const forceGraph = new ForceGraph3D()
      .graphData(graph)
      .nodeAutoColorBy("group")
      .nodeThreeObject((node) => {
        const sphere = new THREE.SphereGeometry(0.05, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        return new THREE.Mesh(sphere, material);
      })
      .onNodeHover((node) => (tooltip.innerHTML = node.id))
      .onNodeClick((node) =>
        window.open(`https://www.google.com/search?q=${node.id}`)
      )
      .linkDirectionalParticles((link) => link.value)
      .linkDirectionalParticleWidth((link) => 0.5)
      .linkDirectionalParticleColor((link) => link.source.color)
      .linkOpacity(0.2)
      .linkWidth(1)
      .linkCurvature(0.2)
      .cameraPosition({ x: 0, y: 0, z: 5 })
      .appendTo(container);
  });
