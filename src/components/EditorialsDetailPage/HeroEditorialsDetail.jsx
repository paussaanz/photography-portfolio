const HeroEditorialsDetail = () => {

  return (
    <>
      <div className="editorials-detail__hero--image d--vh-50 d--vw-100">
        <img className="d--h-100 d--w-100 object-fit--cover" src="/images/mid/lifestyle-3.webp" />
      </div>
      <div className="editorials-detail__hero--title flex flex--col text-color--secondary-greece">
        <div className="editorials-detail__hero--title-h2 flex flex--j-between d--w-100">
          <h2 className="editorials-detail__hero--title-h2">Blue Horizons</h2>
          <h2 className="editorials-detail__hero--title-h2">Sail & Style</h2>
          <h2 className="editorials-detail__hero--title-h2">Wave Makers</h2>

        </div>
        <h1 className="editorials-detail__hero--title-h1 ">SEAFARING GREECE</h1>
      </div>

      <div className="editorials-detail__hero--text text-color--secondary-greece">
        <p>Living on a sailing boat in Greece offers a unique and enchanting lifestyle surrounded by the breathtaking beauty of the Mediterranean. Imagine waking up to the gentle sounds of waves lapping against the hull and the soft caress of the sea breeze. Everyday life becomes a harmonious dance between the elements and the simplicity of living with the essentials. The open seas become your backyard, inviting you to explore hidden coves, secret beaches, and pristine coastlines.</p>
      </div>
    </>
  );
};

export default HeroEditorialsDetail;
