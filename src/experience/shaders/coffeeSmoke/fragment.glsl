uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main(){
    //Scale and animate
    vec2 smokeUv=vUv;
    smokeUv.x*=.5;
    smokeUv.y*=.3;
    smokeUv.y-=uTime*.1;
    
    // Smoke
    float smoke=texture(uPerlinTexture,smokeUv).r;
    
    // Remap
    
    smoke=smoothstep(.5,1.,smoke);
    
    // Edges
    smoke*=smoothstep(0.,.3,vUv.x);
    smoke*=smoothstep(1.,.7,vUv.x);
    
    smoke*=smoothstep(1.,.5,vUv.y);
    smoke*=smoothstep(0.,.2,vUv.y);
    
    gl_FragColor=vec4(.6,.3,.2,smoke);
    gl_FragColor=vec4(0.,0.,0.,1.0);
    }
    