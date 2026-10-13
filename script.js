let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const slideCounter = document.getElementById('slideCounter');
const progress = document.getElementById('progress');

let revealIndex = 0;
let simInterval = null;

updateSlide();

function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
            resetReveals(slide);
            
            if (slide.id === 'slide11') {
                startSimulation();
            } else {
                stopSimulation();
            }
        }
    });

    slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
    progress.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;

    prevBtn.disabled = currentSlide === 0;
    
    if (currentSlide === slides.length - 1) {
        nextBtn.textContent = 'Finish';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function resetReveals(slide) {
    const reveals = slide.querySelectorAll('.reveal');
    reveals.forEach(el => el.classList.remove('visible'));
    revealIndex = 0;
}

function nextAction() {
    const activeSlide = slides[currentSlide];
    const reveals = activeSlide.querySelectorAll('.reveal');

    if (revealIndex < reveals.length) {
        reveals[revealIndex].classList.add('visible');
        revealIndex++;
    } else {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        } else {
            alert("Thank you for watching the VL gate Orientation!");
        }
    }
}

function prevAction() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

function startSimulation() {
    stopSimulation();
    simInterval = setInterval(runSimulationStep, 4000);
    setTimeout(runSimulationStep, 500);
}

function stopSimulation() {
    if (simInterval) {
        clearInterval(simInterval);
        simInterval = null;
    }
}

function runSimulationStep() {
    const reqPacket = document.getElementById('reqPacket');
    const resPacket = document.getElementById('resPacket');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    if (!reqPacket || !resPacket) return;

    reqPacket.classList.remove('animate');
    resPacket.classList.remove('animate');
    step1.classList.remove('active');
    step2.classList.remove('active');
    step3.classList.remove('active');
    
    void reqPacket.offsetWidth;
    void resPacket.offsetWidth;

    step1.classList.add('active');
    reqPacket.classList.add('animate');

    setTimeout(() => {
        step1.classList.remove('active');
        step2.classList.add('active');
    }, 2000);

    setTimeout(() => {
        step2.classList.remove('active');
        step3.classList.add('active');
        resPacket.classList.add('animate');
    }, 2500);

    setTimeout(() => {
        step3.classList.remove('active');
    }, 4500);
}

nextBtn.addEventListener('click', nextAction);
prevBtn.addEventListener('click', prevAction);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextAction();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevAction();
    }
});

const fullscreenBtn = document.getElementById('fullscreenBtn');
const fullscreenIcon = document.getElementById('fullscreenIcon');
const presentationContainer = document.getElementById('presentationContainer');

fullscreenBtn.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        presentationContainer.requestFullscreen().then(() => {
            fullscreenIcon.textContent = '✕';
            fullscreenBtn.title = 'Exit Full Screen';
        }).catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            fullscreenIcon.textContent = '⛶';
            fullscreenBtn.title = 'Toggle Full Screen';
        });
    }
}

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenIcon.textContent = '✕';
        fullscreenBtn.title = 'Exit Full Screen';
    } else {
        fullscreenIcon.textContent = '⛶';
        fullscreenBtn.title = 'Toggle Full Screen';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            toggleFullscreen();
        }
    }
});