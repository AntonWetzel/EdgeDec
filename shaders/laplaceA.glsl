precision mediump float;
varying vec2 uv;
uniform sampler2D texture;
uniform vec2 size;

void main() {
	vec3 res = vec3(0.0, 0.0, 0.0);
	res += texture2D(texture, uv + vec2(-1.0, 0.0) / size).rgb * 1.0;
	res += texture2D(texture, uv + vec2(0.0, -1.0) / size).rgb * 1.0;
	res += texture2D(texture, uv + vec2(0.0, 0.0) / size).rgb * -4.0;
	res += texture2D(texture, uv + vec2(0.0, 1.0) / size).rgb * 1.0;
	res += texture2D(texture, uv + vec2(1.0, 0.0) / size).rgb * 1.0;
	gl_FragColor.rgb = res / 8.0 + 0.5;
	gl_FragColor.a = 1.0;
}