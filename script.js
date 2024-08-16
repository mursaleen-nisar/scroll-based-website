const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");

const frames = {
    currentFrame: 1,
    totalFrames: 538
}

let imagesLoaded = 0;

const images = [];

const imagePreLoader = () => {
    for(let i = 1; i <= frames.totalFrames; i++) {
        const imageUrl = `./Frames/frame_${i.toString().padStart(3, '0')}.webp`;
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
        .to(frames, updateFrame(50), 'first')
        .to('.animate1', { opacity: 1, ease: 'linear' }, 'first')

        .to(frames, updateFrame(80), 'first')
        .to('.animate1', { opacity: 0, ease: 'linear' }, 'first')

        .to(frames, updateFrame(110), 'second')
        .to('.animate2', { opacity: 1, ease: 'linear' }, 'second')

        .to(frames, updateFrame(140), 'third')
        .to('.animate2', { opacity: 1, ease: 'linear' }, 'third')

        .to(frames, updateFrame(170), 'fourth')
        .to('.animate2', { opacity: 0, ease: 'linear' }, 'fourth')

        .to(frames, updateFrame(200), 'fifth')
        .to('.animate3', { opacity: 1, ease: 'linear' }, 'fifth')

        .to(frames, updateFrame(230), 'sixth')
        .to('.animate3', { opacity: 1, ease: 'linear' }, 'sixth')

        .to(frames, updateFrame(260), 'seventh')
        .to('.animate3', { opacity: 0, ease: 'linear' }, 'seventh')

        .to(frames, updateFrame(290), 'eighth')
        .to('.panel', { x: '0%', ease: 'linear' }, 'eighth')

        .to(frames, updateFrame(320), 'ninth')
        .to('.panel', { x: '0%', ease: 'linear' }, 'ninth')

        .to(frames, updateFrame(350), 'tenth')
        .to('.panel', { x: '100%', ease: 'linear' }, 'tenth')

        .to(frames, updateFrame(380), 'eleventh')
        .to(canvas, { scale: .5, borderRadius: '5rem', ease: 'linear' }, 'eleventh')

        .to(frames, updateFrame(410), 'twelveth')
        .to('.panelism', { opacity: 1, ease: 'linear' }, 'twelveth')

        .to(frames, updateFrame(440), 'thirteenth')
        .to('.panelism span', { width: 230, ease: 'linear' }, 'thirteenth')

        .to(frames, updateFrame(470), 'fourteenth')
        .to(canvas, { scale: 1, borderRadius: 0, ease: 'linear' }, 'fourteenth')

        .to(frames, updateFrame(500), 'fifteenth')
        .to('.panelism', { scale: 1.7, ease: 'circ' }, 'fifteenth')

        .to(frames, updateFrame(685), 'sixteenth')
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