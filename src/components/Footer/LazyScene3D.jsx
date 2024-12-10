import { useState, useEffect } from "react";
import Scene3D from "./Scene3D";

const LazyScene3D = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    const target = document.getElementById("footer");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return <div id="footer">{isVisible && <Scene3D />}</div>;
};

export default LazyScene3D;
