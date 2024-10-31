const EditorialCard = ({ src, name, year, scale, opacity }) => {
  return (
    <div
      className="flex flex--a-center flex--j-center flex--col"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      <div
        className="flex flex--col flex--j-center flex--a-center"
        style={{ height: '50vh', width: '50vw' }}
      >
        <img className="d--h-100 d--w-100 object-fit--cover" src={src} alt={name} />
      </div>
      <div
        className="flex flex--j-between text-transform--uppercase text-color--primary h5"
        style={{ marginTop: '10px', width: '50vw' }}
      >
        <p className="m--0" style={{ textAlign: 'left' }}>
          {name}
        </p>
        <p className="m--0" style={{ textAlign: 'center' }}>x</p>
        <p className="m--0" style={{ textAlign: 'right' }}>
          {year}
        </p>
      </div>
    </div>
  );
};

export default EditorialCard;
