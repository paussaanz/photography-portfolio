const EditorialCard = ({ src, name, year, scale, opacity }) => {
  return (
    <div
      className="flex--display flex--align-center flex--justify-center flex--column"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      <div
        className="flex--display flex--column flex--justify-center flex--align-center"
        style={{ height: '50vh', width: '50vw' }}
      >
        <img className="dimension--h-100 dimension--w-100 object-fit--cover" src={src} alt={name} />
      </div>
      <div
        className="flex--display flex--justify-between text-transform--uppercase text-color--primary h5"
        style={{ marginTop: '10px', width: '50vw' }}
      >
        <p className="margin--0" style={{ textAlign: 'left' }}>
          {name}
        </p>
        <p className="margin--0" style={{ textAlign: 'center' }}>x</p>
        <p className="margin--0" style={{ textAlign: 'right' }}>
          {year}
        </p>
      </div>
    </div>
  );
};

export default EditorialCard;
