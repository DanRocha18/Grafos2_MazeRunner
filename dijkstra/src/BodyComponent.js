import Maze from './maze';

const BodyComponent = () => {
  
  return (
    <div className="body">
      <p className="centered-text1"><strong>Veja o Labrinto</strong></p>
      <p  className="centered-text2"><strong>ele apontará a menor saída usando o algoritmo</strong></p>

      <div className="maze">
      <Maze />
      </div>

    </div>
  );
};

export default BodyComponent;
