import { useEffect, useRef } from 'react';

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform vec2 u_origin;
  uniform vec3 u_color;
  uniform float u_time;
  uniform float u_speed;
  uniform float u_spread;
  uniform float u_length;
  uniform float u_mouse_influence;
  uniform vec2 u_mouse;
  uniform float u_noise;
  uniform float u_distortion;
  uniform float u_pulsating;
  uniform float u_fade_distance;
  uniform float u_saturation;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec3 applySaturation(vec3 color, float saturation) {
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    return mix(vec3(luma), color, saturation);
  }

  void main() {
    vec2 st = v_uv;
    vec2 origin = u_origin;
    vec2 fromOrigin = st - origin;

    float dist = length(fromOrigin);
    float angle = atan(fromOrigin.y, fromOrigin.x);

    float sweep = sin(angle * 11.0 + u_time * u_speed);
    float pulse = (u_pulsating > 0.5) ? (0.85 + 0.15 * sin(u_time * 1.5)) : 1.0;

    vec2 mouseDir = st - u_mouse;
    float mouseBoost = 1.0 + u_mouse_influence * (1.0 - smoothstep(0.0, 0.7, length(mouseDir)));

    float irregular = hash(st * 35.0 + u_time) * u_noise;
    float distortion = sin((st.y + st.x) * 12.0 + u_time * 2.0) * 0.04 * u_distortion;

    float core = smoothstep(u_spread + distortion, 0.0, abs(sweep) + irregular);
    float attenuation = smoothstep(u_length, u_fade_distance, dist);

    float intensity = core * attenuation * mouseBoost * pulse;
    vec3 color = applySaturation(u_color * intensity, u_saturation);

    gl_FragColor = vec4(color, intensity * 0.85);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${message}`);
  }

  return shader;
}

function createProgram(gl) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link failed: ${message}`);
  }

  return program;
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const bigint = parseInt(normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized, 16);

  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255
  ];
}

function resolveOrigin(position) {
  const map = {
    center: [0.5, 0.5],
    'top-center': [0.5, 0.0],
    'bottom-center': [0.5, 1.0],
    left: [0.0, 0.5],
    right: [1.0, 0.5]
  };

  return map[position] || map['top-center'];
}

export default function LightRays({
  raysOrigin = 'top-center',
  raysColor = '#6c9aea',
  raysSpeed = 1,
  lightSpread = 0.5,
  rayLength = 3,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1
}) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    const program = createProgram(gl);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      origin: gl.getUniformLocation(program, 'u_origin'),
      color: gl.getUniformLocation(program, 'u_color'),
      time: gl.getUniformLocation(program, 'u_time'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      spread: gl.getUniformLocation(program, 'u_spread'),
      length: gl.getUniformLocation(program, 'u_length'),
      mouseInfluence: gl.getUniformLocation(program, 'u_mouse_influence'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      noise: gl.getUniformLocation(program, 'u_noise'),
      distortion: gl.getUniformLocation(program, 'u_distortion'),
      pulsating: gl.getUniformLocation(program, 'u_pulsating'),
      fadeDistance: gl.getUniformLocation(program, 'u_fade_distance'),
      saturation: gl.getUniformLocation(program, 'u_saturation')
    };

    const [originX, originY] = resolveOrigin(raysOrigin);
    const color = hexToRgb(raysColor);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    };

    resize();

    const onMouseMove = (event) => {
      if (!followMouse) return;
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y: 1 - y };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting && frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = 0;
        } else if (entries[0].isIntersecting && !frameRef.current) {
          render(performance.now());
        }
      },
      { threshold: 0.01 }
    );

    const render = (time) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uniforms.origin, originX, 1.0 - originY);
      gl.uniform3f(uniforms.color, color[0], color[1], color[2]);
      gl.uniform1f(uniforms.time, time * 0.001);
      gl.uniform1f(uniforms.speed, raysSpeed);
      gl.uniform1f(uniforms.spread, lightSpread);
      gl.uniform1f(uniforms.length, rayLength);
      gl.uniform1f(uniforms.mouseInfluence, followMouse ? mouseInfluence : 0);
      gl.uniform2f(uniforms.mouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uniforms.noise, noiseAmount);
      gl.uniform1f(uniforms.distortion, distortion);
      gl.uniform1f(uniforms.pulsating, pulsating ? 1 : 0);
      gl.uniform1f(uniforms.fadeDistance, fadeDistance);
      gl.uniform1f(uniforms.saturation, saturation);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameRef.current = requestAnimationFrame(render);
    };

    observer.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, [
    distortion,
    fadeDistance,
    followMouse,
    lightSpread,
    mouseInfluence,
    noiseAmount,
    pulsating,
    rayLength,
    raysColor,
    raysOrigin,
    raysSpeed,
    saturation
  ]);

  return (
    <div className="light-rays-container" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
