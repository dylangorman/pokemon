// import "./App.css";
const PokemonThumbnail = ({ id, name, image, type }) => {
  const style = type + "thumb-container";

  return (
    <div className="thumb-container">
      <div className="number">
        <span>#0{id}</span>
      </div>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <span>Type:{type}</span>
      </div>
    </div>
  );
};

export default PokemonThumbnail;
