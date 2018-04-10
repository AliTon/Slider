const SliderData = [
    {
        img: './src/img/Boyka.jpg',
        name: '#Boyka'
    },
    {
        img: './src/img/Forsaje.jpg',
        name: '#Forsaje'
    },
    {
        img: './src/img/Lord.jpg',
        name: '#Lord of war'
    },
    {
        img: './src/img/Paster.jpg',
        name: '#Priest'
    },
    {
        img: './src/img/Samuray.jpg',
        name: '#Last samurai'
    },
    {
        img: './src/img/Terminator.jpg',
        name: '#Terminator'
    },
    {
        img: './src/img/Capone.jpg',
        name: '#/Capone'
    },
    {
        img: './src/img/MortalCombat.jpg',
        name: '#MortalCombat'
    },
    {
        img: './src/img/Constantin.jpg',
        name: '#Constantin'
    }
];

class Slider {
    constructor(data) {
        this.data = data;
        this.rotateDegree = 0;
        this.progressBarindex = 0;
        this.timeValue = 0;
        this.animation = null;
        this.index = 0;

        this.setContent($('.cube-face-front'), $('.cube-face-front p'));
    }

    startAnimation() {
        this.animation = setInterval(() => {
            if (this.timeValue === 100) {
                this.rotate(true);
            }

            $('.progressbar').eq(this.progressBarindex).progressbar({
                value: this.timeValue
            });

            this.timeValue++;
        }, 50)
    }

    swipeNext() {
        this.rotate(true);
    }

    swipePrev() {
        this.rotate(false);
    }

    setContent(cubeBackground, text) {
        cubeBackground.css('background-image', `url(${this.data[this.index % this.data.length].img})`);
        text.html(this.data[this.index % this.data.length].name);
    }

    rotate(mustRotateLeft) {
        $('.progressbar').eq(this.progressBarindex).progressbar({
            value: 0
        });

        mustRotateLeft ? this.progressBarindex += 1 : this.progressBarindex -= 1;

        if (this.progressBarindex > 3) {
            this.progressBarindex = 0;
        }

        if (this.progressBarindex < 0) {
            this.progressBarindex = 3;
        }
        this.timeValue = 0;
        mustRotateLeft ? this.index += 1 : this.index -= 1;
        this.index < 0 ? this.index = this.data.length - 1 : null;

        switch (this.progressBarindex) {
            case 0:
                this.setContent($('.cube-face-front'), $('.cube-face-front p'));
                break;
            case 1:
                this.setContent($('.cube-face-right'), $('.cube-face-right p'));
                break;
            case 2:
                this.setContent($('.cube-face-back'), $('.cube-face-back p'));
                break;
            case 3:
                this.setContent($('.cube-face-left'), $('.cube-face-left p'));
                break;
            default:
                this.setContent($('.cube-face-front'), $('.cube-face-front p'));
        }

        let quarterRotateCube = 90;

        mustRotateLeft ? this.rotateDegree -= quarterRotateCube : this.rotateDegree += quarterRotateCube;

        $('.cube').css('transform', `rotateY(${this.rotateDegree}deg)`);
        $('.progressbar').eq(this.progressBarindex).progressbar({
            value: this.timeValue
        });
    }

    pauseInterval() {
        clearInterval(this.animation);
    }
}

$(function () {
    const cube = $('.cube');
    const CubeSlider = new Slider(SliderData);

    let coordinateX;

    CubeSlider.startAnimation();
    cube.hover(function () {
        CubeSlider.pauseInterval();
        $(this).css('cursor', 'pointer');
    }, function () {
        CubeSlider.startAnimation();
    });

    cube.mousedown((event) => {
        coordinateX = event.clientX;
    });

    cube.mouseup(event => {
        if (coordinateX - event.clientX > 0) {
            CubeSlider.swipeNext();
        } else if (coordinateX - event.clientX < 0) {
            CubeSlider.swipePrev();
        } else {
            return false;
        }
    })
});