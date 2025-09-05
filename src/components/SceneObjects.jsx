
import { Laocoon } from "./Laocoon";
import { Cloud_station } from "./Cloud_station";
import { Phoenyx_bird } from "./Phoenix_bird";
import { The_last_stronghold_animated } from "./The_last_stronghold_animated";
import { Cave_on_an_alien_planet_skybox } from "./Cave_on_an_alien_planet_skybox";
import { Mobile_home } from "./Mobile_home";
import { Djinnis_curse_stylized_prop } from "./Djinnis_curse_-_stylized_prop";
import { Women } from "./Woman";
import { Robot_girl_with_hair_wires } from "./Robot_girl_with_hair_wires";
import { WebPanel } from "./WebPanel";

export const SceneObjects = () => {
  return (
    <>
      {/* Modelo animado */}
      []
      <Laocoon scale={[0.7, 0.7, 0.7]} rotation={[0, 4, 0]} />
      <Cloud_station scale={[10, 10, 10]} position={[0, 7, 15]} />
      <Djinnis_curse_stylized_prop
        rotation={[0, 1, 0]}
        position={[20, 1, -25]}
      />
      <Women scale={[27, 27, 27]} position ={[-30, 12, 40]} rotation={[0, 1, 0]} />
{/*       
      <WebPanel /> */}
    </>
  );
};
