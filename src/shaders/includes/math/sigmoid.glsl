//https://github.com/zzorn/pipedream/blob/master/assets/shaders/ShaderUtils.glsl

/**
 * A fast approximation for sigmoid function, from http://www.dontveter.com/bpr/activate.html
 * Deviation from real sigmoid is less than 0.02.
 * x should be in range -1 .. 1
 * Returns value from 0 to 1
 */
float sigmoid(float x) {
  if (x >= 1.0) return 1.0;
  else if (x <= -1.0) return 0.0;
  else return 0.5 + x * (1.0 - abs(x) * 0.5);
}

/**
 * Performs sigmoid on x over the specified range.
 * Returns value from 0 to 1, 0 if less than startX, 1 if larger than endX, and a sigmoid between the two in between.
 * startX must not be equal to endX.
 */
float sigmoid(float x, float startX, float endX) {
  if (x <= startX) return 0.0;
  else if (x >= endX) return 1.0;
  else {
    float scaledX = (x - startX) / (endX - startX);
    return 0.5 + scaledX * (1.0 - abs(scaledX) * 0.5);
  }
}

#pragma glslify:export(sigmoid)