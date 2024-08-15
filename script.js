const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");

const frames = {
    currentFrame: 1,
    totalFrames: 1614
}

let imagesLoaded = 0;

const images = [];

const imagePreLoader = () => {
    for(let i = 1; i <= frames.totalFrames; i++) {
        const imageUrl = `./Frames/frame_${i.toString().padStart(4, '0')}.jpg`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imagesLoaded++;
            if(imagesLoaded === frames.totalFrames) {
                loadImage(frames.currentFrame)
                startAnimation();
            }
        }
        
        images.push(img);
    }
}

const loadImage = (frameNumber) => {
    if(frameNumber >= 1 && frameNumber <= frames.totalFrames) {
        const img = images[frameNumber];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentFrame = frameNumber;
    }
}

const startAnimation = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.parent',
            start: 'top top',
            scrub: 2
        }
    });

    const updateFrame = (frameNo) => {
        return {
            currentFrame: frameNo,
            ease: 'linear',
            onUpdate: () => {
                loadImage(Math.floor(frames.currentFrame));
            }
        }
    }

    tl
        .to(frames, updateFrame(90), 'first')
        .to('.animate1', { opacity: 1, ease: 'linear' }, 'first')

        .to(frames, updateFrame(180), 'first')
        .to('.animate1', { opacity: 0, ease: 'linear' }, 'first')

        .to(frames, updateFrame(270), 'second')
        .to('.animate2', { opacity: 1, ease: 'linear' }, 'second')

        .to(frames, updateFrame(360), 'third')
        .to('.animate2', { opacity: 1, ease: 'linear' }, 'third')

        .to(frames, updateFrame(450), 'fourth')
        .to('.animate2', { opacity: 0, ease: 'linear' }, 'fourth')

        .to(frames, updateFrame(540), 'fifth')
        .to('.animate3', { opacity: 1, ease: 'linear' }, 'fifth')

        .to(frames, updateFrame(630), 'sixth')
        .to('.animate3', { opacity: 1, ease: 'linear' }, 'sixth')

        .to(frames, updateFrame(720), 'seventh')
        .to('.animate3', { opacity: 0, ease: 'linear' }, 'seventh')

        .to(frames, updateFrame(810), 'eighth')
        .to('.panel', { x: '0%', ease: 'linear' }, 'eighth')

        .to(frames, updateFrame(950), 'ninth')
        .to('.panel', { x: '0%', ease: 'linear' }, 'ninth')

        .to(frames, updateFrame(1040), 'tenth')
        .to('.panel', { x: '100%', ease: 'linear' }, 'tenth')

        .to(frames, updateFrame(1130), 'eleventh')
        .to(canvas, { scale: .5, borderRadius: '5rem', ease: 'linear' }, 'eleventh')

        .to(frames, updateFrame(1220), 'twelveth')
        .to('.panelism', { opacity: 1, ease: 'linear' }, 'twelveth')

        .to(frames, updateFrame(1310), 'thirteenth')
        .to('.panelism span', { width: 230, ease: 'linear' }, 'thirteenth')

        .to(frames, updateFrame(1400), 'fourteenth')
        .to(canvas, { scale: 1, borderRadius: 0, ease: 'linear' }, 'fourteenth')

        .to(frames, updateFrame(1500), 'fifteenth')
        .to('.panelism', { scale: 1.7, ease: 'circ' }, 'fifteenth')

        .to(frames, updateFrame(2060), 'sixteenth')
        .to('.panelism', { scale: 1.7, ease: 'circ' }, 'sixteenth')

}

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

window.addEventListener("resize", () => {
    loadImage(Math.floor(frames.currentFrame));
});

imagePreLoader();