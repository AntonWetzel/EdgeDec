namespace shaders {
	export let all: { [key: string]: string } = {
		blurr3: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec3 res = vec3(0.0, 0.0, 0.0);res += texture2D(texture, uv + vec2(-1.0, -1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(-1.0, 0.0) / size).rgb * 2.0;res += texture2D(texture, uv + vec2(-1.0, 1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(0.0, -1.0) / size).rgb * 2.0;res += texture2D(texture, uv + vec2(0.0, 0.0) / size).rgb * 4.0;res += texture2D(texture, uv + vec2(0.0, 1.0) / size).rgb * 2.0;res += texture2D(texture, uv + vec2(1.0, -1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(1.0, 0.0) / size).rgb * 2.0;res += texture2D(texture, uv + vec2(1.0, 1.0) / size).rgb * 1.0;gl_FragColor.rgb = res / 16.0;gl_FragColor.a = 1.0;}",
		blurr5: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec3 res = vec3(0.0, 0.0, 0.0);res += texture2D(texture, uv + vec2(-2.0, -2.0) / size).rgb * 2.0;res += texture2D(texture, uv + vec2(-2.0, -1.0) / size).rgb * 4.0;res += texture2D(texture, uv + vec2(-2.0, 0.0) / size).rgb * 5.0;res += texture2D(texture, uv + vec2(-2.0, 1.0) / size).rgb * 4.0;res += texture2D(texture, uv + vec2(-2.0, 2.0) / size).rgb * 2.0;res += texture2D(texture, uv + vec2(-1.0, -2.0) / size).rgb * 4.0;res += texture2D(texture, uv + vec2(-1.0, -1.0) / size).rgb * 9.0;res += texture2D(texture, uv + vec2(-1.0, 0.0) / size).rgb * 12.0;res += texture2D(texture, uv + vec2(-1.0, 1.0) / size).rgb * 9.0;res += texture2D(texture, uv + vec2(-1.0, 2.0) / size).rgb * 4.0;res += texture2D(texture, uv + vec2(0.0, -2.0) / size).rgb * 5.0;res += texture2D(texture, uv + vec2(0.0, -1.0) / size).rgb * 12.0;res += texture2D(texture, uv + vec2(0.0, 0.0) / size).rgb * 15.0;res += texture2D(texture, uv + vec2(0.0, 1.0) / size).rgb * 12.0;res += texture2D(texture, uv + vec2(0.0, 2.0) / size).rgb * 5.0;res += texture2D(texture, uv + vec2(1.0, -2.0) / size).rgb * 4.0;res += texture2D(texture, uv + vec2(1.0, -1.0) / size).rgb * 9.0;res += texture2D(texture, uv + vec2(1.0, 0.0) / size).rgb * 12.0;res += texture2D(texture, uv + vec2(1.0, 1.0) / size).rgb * 9.0;res += texture2D(texture, uv + vec2(1.0, 2.0) / size).rgb * 4.0;res += texture2D(texture, uv + vec2(2.0, -2.0) / size).rgb * 2.0;res += texture2D(texture, uv + vec2(2.0, -1.0) / size).rgb * 4.0;res += texture2D(texture, uv + vec2(2.0, 0.0) / size).rgb * 5.0;res += texture2D(texture, uv + vec2(2.0, 1.0) / size).rgb * 4.0;res += texture2D(texture, uv + vec2(2.0, 2.0) / size).rgb * 2.0;gl_FragColor.rgb = res / 159.0;gl_FragColor.a = 1.0;}",
		edgeValue: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec3 x = texture2D(texture, uv).rgb;gl_FragColor.rgb = abs(x-0.5) * 2.0;gl_FragColor.a = 1.0;}",
		euclidean: "precision mediump float;varying vec2 uv;uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 size;void main() {vec3 x = texture2D(texture0, uv).rgb;vec3 y = texture2D(texture1, uv).rgb;gl_FragColor.rgb = sqrt(x*x + y*y) / 1.41421356237309504880168872420969;gl_FragColor.a = 1.0;}",
		grad: "precision mediump float;varying vec2 uv;uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 size;void main() {vec3 x = texture2D(texture0, uv).rgb;vec3 y = texture2D(texture1, uv).rgb;gl_FragColor.rgb = atan(x, y) / 3.1415926535897932384626433832795 * 2.0;gl_FragColor.a = 1.0;}",
		gray: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec4 col = texture2D(texture, uv);float g = (col.r + col.g + col.b) / 3.0;gl_FragColor.rgb = vec3(g, g, g);gl_FragColor.a = 1.0;}",
		grayMax: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec4 col = texture2D(texture, uv);float g = max(col.r, max(col.g, col.b));gl_FragColor.rgb = vec3(g, g, g);gl_FragColor.a = 1.0;}",
		inverse: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {gl_FragColor.rgb = 1.0 - texture2D(texture, uv).rgb;gl_FragColor.a = 1.0;}",
		laplaceA: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec3 res = vec3(0.0, 0.0, 0.0);res += texture2D(texture, uv + vec2(-1.0, 0.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(0.0, -1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(0.0, 0.0) / size).rgb * -4.0;res += texture2D(texture, uv + vec2(0.0, 1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(1.0, 0.0) / size).rgb * 1.0;gl_FragColor.rgb = res / 4.0;gl_FragColor.a = 1.0;}",
		laplaceB: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec3 res = vec3(0.0, 0.0, 0.0);res += texture2D(texture, uv + vec2(-1.0, -1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(-1.0, 0.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(-1.0, 1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(0.0, -1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(0.0, 0.0) / size).rgb * -8.0;res += texture2D(texture, uv + vec2(0.0, 1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(1.0, -1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(1.0, 0.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(1.0, 1.0) / size).rgb * 1.0;gl_FragColor.rgb = res / 8.0;gl_FragColor.a = 1.0;}",
		max: "precision mediump float;varying vec2 uv;uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 size;void main() {vec3 x = texture2D(texture0, uv).rgb;vec3 y = texture2D(texture1, uv).rgb;gl_FragColor.rgb = max(x, y);gl_FragColor.a = 1.0;}",
		median: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {const int dim = 5;vec3 colors[dim*dim];float values[dim*dim];for (int i = 0; i < dim; i++) {for (int j = 0; j < dim; j++) {vec3 col = texture2D(texture, uv + vec2(i-dim/2, j-dim/2) / size).rgb;colors[i*dim+j] = col;values[i*dim+j] = col.r + col.g + col.b;}}for (int c = 0; c < dim*dim; c++) { for (int i = 0; i < dim*dim-1; i++) {if (values[i] > values[i+1]) {float val = values[i];vec3 col = colors[i];values[i] = values[i+1];colors[i] = colors[i+1];values[i+1] = val;colors[i+1] = col;}}}gl_FragColor.rgb = colors[dim*dim/2];gl_FragColor.a = 1.0;}",
		mix: "precision mediump float;varying vec2 uv;uniform sampler2D texture0;uniform sampler2D texture1;uniform float preference;uniform vec2 size;void main() {vec3 x = texture2D(texture0, uv).rgb;vec3 y = texture2D(texture1, uv).rgb;gl_FragColor.rgb = x * preference + y * (1.0 - preference);gl_FragColor.a = 1.0;}",
		nothing: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {gl_FragColor.rgb = texture2D(texture, uv).rgb;gl_FragColor.a = 1.0;}",
		robertsA: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec3 res = vec3(0.0, 0.0, 0.0);res += texture2D(texture, uv + vec2(0.0, 1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(0.0, 0.0) / size).rgb * -1.0;gl_FragColor.rgb = res / 2.0 + 0.5;gl_FragColor.a = 1.0;}",
		robertsB: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec3 res = vec3(0.0, 0.0, 0.0);res += texture2D(texture, uv + vec2(0.0, 0.0) / size).rgb * -1.0;res += texture2D(texture, uv + vec2(1.0, 1.0) / size).rgb * 1.0;gl_FragColor.rgb = res / 2.0 + 0.5;gl_FragColor.a = 1.0;}",
		sobelX: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec3 res = vec3(0.0, 0.0, 0.0);res += texture2D(texture, uv + vec2(-1.0, -1.0) / size).rgb * -1.0;res += texture2D(texture, uv + vec2(-1.0, 0.0) / size).rgb * -2.0;res += texture2D(texture, uv + vec2(-1.0, 1.0) / size).rgb * -1.0;res += texture2D(texture, uv + vec2(1.0, -1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(1.0, 0.0) / size).rgb * 2.0;res += texture2D(texture, uv + vec2(1.0, 1.0) / size).rgb * 1.0;gl_FragColor.rgb = res / 8.0 + 0.5;gl_FragColor.a = 1.0;}",
		sobelY: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;void main() {vec3 res = vec3(0.0, 0.0, 0.0);res += texture2D(texture, uv + vec2(-1.0, -1.0) / size).rgb * -1.0;res += texture2D(texture, uv + vec2(-1.0, 1.0) / size).rgb * 1.0;res += texture2D(texture, uv + vec2(0.0, -1.0) / size).rgb * -2.0;res += texture2D(texture, uv + vec2(0.0, 1.0) / size).rgb * 2.0;res += texture2D(texture, uv + vec2(1.0, -1.0) / size).rgb * -1.0;res += texture2D(texture, uv + vec2(1.0, 1.0) / size).rgb * 1.0;gl_FragColor.rgb = res / 8.0 + 0.5;gl_FragColor.a = 1.0;}",
		suppression: "precision mediump float;varying vec2 uv;uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 size;vec2 off(float grad) {vec2 val;if (grad < 1.0/12.0) {val = vec2(-1.0, 0.0);} else if (grad < 3.0/12.0) {val = vec2(-1.0, 1.0);} else if (grad < 5.0/12.0) {val = vec2(0.0, 1.0);} else if (grad < 7.0/12.0) {val = vec2(1.0, 1.0);} else if (grad < 9.0/12.0) {val = vec2(1.0, 0.0);} else if (grad < 11.0/12.0) {val = vec2(1.0, -1.0);} else {val = vec2(0.0, -1.0);}return val / size;}void main() {vec3 val = texture2D(texture0, uv).rgb;vec3 grad = texture2D(texture1, uv).rgb;vec2 offR = off(grad.r);vec2 offG = off(grad.g);vec2 offB = off(grad.b);float r0 = texture2D(texture0, uv + offR).r;float g0 = texture2D(texture0, uv + offG).g;float b0 = texture2D(texture0, uv + offB).b;float r1 = texture2D(texture0, uv - offR).r;float g1 = texture2D(texture0, uv - offG).g;float b1 = texture2D(texture0, uv - offB).b;if (val.r >= r0 && val.r > r1) {gl_FragColor.r = val.r;}if (val.g >= g0 && val.g > g1) {gl_FragColor.g = val.g;}if (val.b >= b0 && val.b > b1) {gl_FragColor.b = val.b;}gl_FragColor.a = 1.0;}",
		threshhold: "precision mediump float;varying vec2 uv;uniform sampler2D texture;uniform vec2 size;uniform float threshhold;void main() {vec3 col = texture2D(texture, uv).rgb;if (col.r < threshhold) {col.r = 0.0;} else {col.r = 1.0;}if (col.g < threshhold) {col.g = 0.0;} else {col.g = 1.0;}if (col.b < threshhold) {col.b = 0.0;} else {col.b = 1.0;}gl_FragColor.rgb = col;gl_FragColor.a = 1.0;}",
	}
}