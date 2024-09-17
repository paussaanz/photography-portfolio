import { Link } from 'react-router-dom';

const preloadComponent = (component) => {
  component();  
};

const PreloadLink = ({ to, component, children, className }) => (
  <Link to={to} onMouseEnter={() => preloadComponent(component)} className={className}>
    {children}
  </Link>
);

export default PreloadLink; 
