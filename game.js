class ColorMatchGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00']; // Red, Green, Blue, Yellow
        this.currentColorIndex = 0;
        this.fallingBlock = { colorIndex: Math.floor(Math.random() * 4), y: 0, speed: 3 };
        this.score = 0;
        this.init();
    }

    init() {
        this.canvas.addEventListener('click', () => this.changeColor());
        requestAnimationFrame(() => this.gameLoop());
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        this.fallingBlock.y += this.fallingBlock.speed;
        if (this.fallingBlock.y > this.canvas.height - 20) {
            this.checkMatch();
            this.resetFallingBlock();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw the current color
        this.ctx.fillStyle = this.colors[this.currentColorIndex];
        this.ctx.fillRect(0, this.canvas.height - 20, this.canvas.width, 20);
        // Draw the falling block
        this.ctx.fillStyle = this.colors[this.fallingBlock.colorIndex];
        this.ctx.fillRect(this.canvas.width / 2 - 25, this.fallingBlock.y, 50, 50);
    }

    changeColor() {
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    }

    resetFallingBlock() {
        this.fallingBlock.colorIndex = Math.floor(Math.random() * this.colors.length);
        this.fallingBlock.y = -50;
    }

    checkMatch() {
        if (this.fallingBlock.colorIndex !== this.currentColorIndex) {
            // Show ad and reset game
            adBreak({
                type: 'interstitial',
                beforeAd: () => console.log('Ad is about to be shown'),
                afterAd: () => console.log('Ad was shown'),
            });
            alert(`Game Over! Your score was: ${this.score}. Starting new game...`);
            this.score = 0;
        } else {
            this.score += 1;
            this.fallingBlock.speed *= 1.05; // Slightly increase speed for added difficulty
        }
    }
}

const game = new ColorMatchGame('gameCanvas');
