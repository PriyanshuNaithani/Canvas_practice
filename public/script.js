// const canvas = document.querySelector('canvas');
// const context = canvas.getContext("2d");
// const frames = {
//     currentIndex: 0,
//     maxIndex: 382
// };

// let imagesLoaded = 0;
// const images = [];
// function preLoadImages (){
//     for(var i = 1; i<=frames.maxIndex; i++){
//         const imageUrl = `./frames/frame_${i.toString().padStart(4,"0")}.jpeg`;

//         const img = new Image();
//         img.src = imageUrl;
//         img.onload = () => {
//             imagesLoaded++;
//             if(imagesLoaded === frames.maxIndex){
//                 loadImage(frames.currentIndex);
//                 startAnimation();
//             }
//         }

//         images.push(img);

//     }
// }

// function loadImage(index){
//     if(index>=0 && index <= frames.maxIndex){
//         const img = images[index];
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         const scaleX = canvas.width/img.width;
//         const scaleY = canvas.height/img.height;

//         const scale = Math.max(scaleX,scaleY);

//         const newWidth = img.width*scale;
//         const newHeight = img.height*scale;

//         const offsetX = (canvas.width - newWidth)/ 2;
//         const offsetY = (canvas.height - newHeight)/ 2;

//         context.clearRect(0,0, canvas.width, canvas.height);
//         context.imageSmoothingQuality = "high";
//         context.imageSmoothingEnabled = true;
//         context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
//         frames.currentIndex = index;
//     }
// }

// function startAnimation () {
//     gsap.registerPlugin(ScrollTrigger);
//     var tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: ".parent",
//             start: "top top",
//             scrub: 2,
//             markers: true
//         }
//     })

//     tl.to(frames, {currentIndex: frames.maxIndex,
//         onUpdate: function(){
//             loadImage(Math.floor(frames.currentIndex));
// }})
// }

// preLoadImages();

const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
const frames = {
    currentIndex: 0,
    maxIndex: 382
};

let imagesLoaded = 0;
const images = [];

function preLoadImages() {
    for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }
        img.onerror = () => {
            console.error(`Failed to load image at ${imageUrl}`);
        }

        images.push(img);
    }
}

function loadImage(index) {
    if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];
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
        context.imageSmoothingQuality = "high";
        context.imageSmoothingEnabled = true;
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}

function startAnimation() {
    // Ensure ScrollTrigger is included and registered
    gsap.registerPlugin(ScrollTrigger);

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            scrub: 2,
        }
    });

    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function () {
            loadImage(Math.floor(frames.currentIndex));
        }
    });
}

preLoadImages();
