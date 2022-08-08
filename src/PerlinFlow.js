import Sketch, { TWO_PI }  from "react-p5";
import { Particle } from './Particle';


export default (props) => {
    let inc;
    let scl;
    let cols;
    let rows;

    let zoff;

    let fr;

    let particles = [];

    let flowField = [];

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
        zoff = 0;
        scl = 6;
        inc = 0.1;
        cols = Math.floor(p5.width / scl);
        rows = Math.floor(p5.height / scl);
        fr = p5.createP();
        let times = Math.random(10,200);

        for (let i = 0; i < times; i++) {
          particles[i] = new Particle();
        }

        p5.background('#fffffff');
        p5.rotate(90.0);
	};

	const draw = (p5) => {
        let yoff = 0;
        for (let y = 0; y < rows; y++) {
          let xoff = 0;
          for (let x = 0; x < cols; x++) {
            let index = (x + y * cols);
            let angle = p5.noise(xoff, yoff, zoff) * TWO_PI;
            let v = p5.p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowField[index] = v;
            xoff += inc;

          }
          yoff += inc;
          zoff += Math.random(0,0.0000003);
        }

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].edges();
          particles[i].show();
          particles[i].follow(flowField);
        }
	};

	return <Sketch setup={setup} draw={draw} />;
};
