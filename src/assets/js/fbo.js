import * as React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { shaderMaterial } from './shaderMaterial';

// TODO: consume this from three >r154 when SemVer allows

// 👇 uncomment when TS version supports function overloads
// export function useFBO(settings?: FBOSettings)
function useFBO(/** Width in pixels, or settings (will render fullscreen by default) */
width, /** Height in pixels */
height, /**Settings */
settings) {
  const size = useThree(state => state.size);
  const viewport = useThree(state => state.viewport);
  const _width = typeof width === 'number' ? width : size.width * viewport.dpr;
  const _height = typeof height === 'number' ? height : size.height * viewport.dpr;
  const _settings = (typeof width === 'number' ? settings : width) || {};
  const {
    samples = 0,
    depth,
    ...targetSettings
  } = _settings;
  const target = React.useMemo(() => {
    const target = new THREE.WebGLRenderTarget(_width, _height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      type: THREE.HalfFloatType,
      ...targetSettings
    });
    if (depth) {
      target.depthTexture = new THREE.DepthTexture(_width, _height, THREE.FloatType);
    }
    target.samples = samples;
    return target;
  }, []);
  React.useLayoutEffect(() => {
    target.setSize(_width, _height);
    if (samples) target.samples = samples;
  }, [samples, target, _width, _height]);
  React.useEffect(() => {
    return () => target.dispose();
  }, []);
  return target;
}
const Fbo = ({
  children,
  width,
  height,
  ...settings
}) => {
  const target = useFBO(width, height, settings);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children == null ? void 0 : children(target));
};

export { Fbo, useFBO };





const DiscardMaterial = /* @__PURE__ */shaderMaterial({}, 'void main() { }', 'void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }');

export { DiscardMaterial };
