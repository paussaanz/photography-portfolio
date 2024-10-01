const EditorialCard = ({ src, name, year, scale, opacity }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: '50vh', width: '50vw' }}
      >
        <img className="h-100 w-100 object-fit-cover" src={src} alt={name} />
      </div>
      <div
        className="d-flex justify-content-between text-uppercase text-primary h5"
        style={{ marginTop: '10px', width: '50vw' }}
      >
        <p className="m-0" style={{ textAlign: 'left' }}>
          {name}
        </p>
        <p className="m-0" style={{ textAlign: 'center' }}>x</p>
        <p className="m-0" style={{ textAlign: 'right' }}>
          {year}
        </p>
      </div>
    </div>
  );
};

export default EditorialCard;
