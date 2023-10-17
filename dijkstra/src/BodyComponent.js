import Maze from './maze';

const BodyComponent = () => {
  
  return (
    <div className="body">
      <p className="centered-text1"><strong>Você PRECISA escapar antes que SEJA TARDE DEMAIS!</strong></p>
      <p  className="centered-text2">Selecione o ponto (S) do labirinto onde você está</p>
      <p  className="centered-text2"><strong>O Algoritmo de Dijkstra irá revelar o menor caminho até a SAÍDA...</strong></p>

      <div className="maze">
      <Maze />
      </div>

    </div>
  );
};

export default BodyComponent;
