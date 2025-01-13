//https://github.com/zzorn/pipedream/blob/master/assets/shaders/ShaderUtils.glsl

/**
 * A fast approximation for sigmoid function, from http://dinodini.wordpress.com/2010/04/05/normalized-tunable-sigmoid-functions/
 * x should be in range -1 .. 1
 * Returns value from -1 to 1
 * sharpness can be from -Inf to Inf, closer to zero it is sharper, closer to +/- inf it is more straight.
 * at 1 is is close to normal sigmoid.
 */
 //
float sigmoid2(float x, float sharpness) {
  if (x >= 1.0) return 1.0;
  else if (x <= -1.0) return -1.0;
  else {
    if (sharpness < 0.0) sharpness -= 1.0;

    if (x > 0.0) return sharpness * x / (sharpness - x + 1.0);
    else if (x < 0.0) return sharpness * x / (sharpness - abs(x) + 1.0);
    else return 0.0;
  }
}

#pragma glslify:export(sigmoid2)