
import { Laocoon } from "./Laocoon";
import { Djinnis_curse_stylized_prop } from "./Djinnis_curse_-_stylized_prop";
import { Women } from "./Woman";
import { Nebula } from "./Nebula_skybox_16k";
import { Cloud_compreso } from "./Cloud-compreso";
import { EcuturaAi } from "./EcuturaAi";
import { Escultura2 } from "./Escultura2";


export const SceneObjects = () => {
  return (
    <>
      {/* Modelo animado */}
      []
      <Laocoon scale={[1.2, 1.2, 1.2]} rotation={[0, -2, 0]} />
      <Cloud_compreso scale={[22, 22, 22]} position={[0, 15, 0]}/>
      <Nebula scale ={[0.125, 0.125, 0.125]} position={[0, 35, 0]}/>
      <EcuturaAi position={[-55, 0.1, 40]} scale  ={[10, 10, 10]} />
      <Escultura2 scale ={[10, 10, 10]} position={[15, 0.1, 40]} />
      <Djinnis_curse_stylized_prop
        rotation={[0, 0, 0]}
        position={[10, 1, -35]}
      />
      <Women scale={[27, 27, 27]} position ={[-65, 12, -17]} rotation={[0, 0, 0]} />
    </>
  );
};
