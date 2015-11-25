
uniform vec4 LMa; // Light-Material ambient
uniform vec4 LMd; // Light-Material diffuse
uniform vec4 LMs; // Light-Material specular
uniform float shininess;

uniform sampler2D normalMap;
uniform sampler2D decal;
uniform sampler2D heightField;
uniform samplerCube envmap;

uniform mat3 objectToWorld;

varying vec2 normalMapTexCoord;
varying vec3 lightDirection;
varying vec3 eyeDirection;
varying vec3 halfAngle;
varying vec3 c0, c1, c2;

void main()
{
	float diffuse = 0.0;
    vec3 bump_normal = 2.f * 
    			texture2D(normalMap, 
    			vec2(normalMapTexCoord.x * 6.0, normalMapTexCoord.y * -2.f)).rgb - 1.0;
    bump_normal = normalize(bump_normal);
    vec3 light_normal = normalize(lightDirection);    
    if (light_normal.z >= 0.0)
        diffuse = max(dot(bump_normal, light_normal), 0.0);
    gl_FragColor = LMa + diffuse * LMd; // ambient light + diffuse light
}
