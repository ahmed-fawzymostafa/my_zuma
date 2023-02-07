
const back = new Image()
back.src = "images/zuma-BK.png"

const path_image = new Image()
path_image.src = "images/zuma-track.png"

const img1 = new Image()
img1.src = "./images/Asset 5.png"

const img2 = new Image()
img2.src = "./images/Asset 4.png"

const img3 = new Image()
img3.src = "./images/Asset 2.png"

const img4 = new Image()
img4.src = "./images/Asset 3.png"


const redP = new Image()
redP.src = "./images/red_resized.png"


const life = new Image()
life.src = "images/life.png"

const life_lost = new Image()
life_lost.src = "images/life lost.png"


var widthP = redP.width
var heightP = redP.height


const blueP = new Image()
blueP.src = "./images/blue_resized.png"

var greenP = new Image();
greenP.src = './images/green_resized.png';

var yellowP = new Image();
yellowP.src = './images/orange_resized.png';


var game_finished = false

var lives = 3;

var person_index = 0;

var push_down = true

var i = 0;
var iRotate = 0;
var bullet = [];

var yImag = new Image();
yImag.src = 'images/person.png';

var person_images = [redP, greenP, blueP, yellowP]


var canvas = document.getElementById("zuma");
var ctx = canvas.getContext("2d");

var ball_color_index = 0
var randomized_num = 0
var prev_index = -1
// var prev_counter = 0

var colors = ["red", "green", "blue", "yellow"]
var images = [img2, img3, img4, img1]
var color_index = 0


var fig = false
var start = false
var resume = true
var leader = 0

var leader2 = 0
var some_paused2 = false

x_factor = 20

canvas.width = 1000;
canvas.height = 562;

// creating audio file
game_music = document.createElement('audio');
game_music.src = "gamemusic.mp3";
game_music.volume = 0.9;
var start_music = true;

win_music = document.createElement('audio');
win_music.src = "winning1.mp3";
win_music.volume = 0.9;

again = document.createElement('audio');
again.src = "again.mp3";
again.volume = 0.9;

excellent = document.createElement('audio');
excellent.src = "excellent.mp3";
excellent.volume = 0.9;

var which_question = 1

var before_start = true; 

// game_music.play()

let btnS = document.createElement("button");
// btn.innerHTML = '<img src = "Images/tryagain.png">';
btnS.innerHTML = "Start"
btnS.id = "Start"
btnS.style["position"] = "absolute"
// btnS.style["top"] = "150px"
btnS.style["border-radius"] = "25px"
btnS.style["opacity"] = "0.8"
// btnS.style["background-color"] = "#92cefc"
btnS.style["font-size"] = "20px"
btnS.style["cursor"] = "pointer"
btnS.style["backgroundImage"] = './images/start button.png'
btnS.onclick = function () {
    if (start_music) {
        game_music.play();
        start_music = false
        btnS.remove();
        start = true
    }
    
};

let stBtn = document.createElement("input")

// document.body.appendChild(btnS);
let label = document.createElement('label')
label.innerHTML = "Start Game"
label.style['position'] = "absolute"
label.style["fontSize"] = "25px"
label.style['color'] = "rgba(30, 150, 150, 1)"
label.style['marginLeft'] = "-10px"
label.style['marginTop'] = "-10px"
label.htmlFor = "Start2"

stBtn.type = "image"
stBtn.src = "./images/start button.png"
stBtn.id = "Start2"
stBtn.style["position"] = "absolute"

stBtn.style["width"] = "250px"
stBtn.onclick = function () {
    if (start_music) {
        game_music.play();
        start_music = false
        stBtn.remove();
        label.remove();
        start = true
    }
    
};

document.body.appendChild(stBtn);

// label.htmlFor = "Start"
document.body.appendChild(label);


// console.log("blbaz")


// document.addEventListener("onload", play_music)
// function play_music(){
//     if(start_music){
//         game_music.play();
//         start_music = false;
//     }
// }

// window.onload = function(){
//     // game_music.muted = true
//     game_music.play();
// }

// window.onload=function(){
//     a = document.getElementById("my_audio");
//     a.play()
//   }

function path() {


    if (canvas.getContext) {

        var ctx = canvas.getContext("2d");
        // ctx.lineWidth = "40";
        // ctx.beginPath();
        // ctx.moveTo(10 + x_factor, 0);
        // ctx.lineTo(10 + x_factor, 500);
        // ctx.strokeStyle = "rgba(50,50,50,50.4)";
        // // ctx.stroke();

        // // ctx.beginPath();

        // // ctx.strokeStyle = "red";
        // // ctx.moveTo(80,520);
        // ctx.lineTo(940 + x_factor, 500);
        // ctx.lineTo(940 + x_factor, 80);
        // ctx.lineTo(100 + x_factor, 80);
        // ctx.lineTo(100 + x_factor, 430);
        // ctx.lineTo(850 + x_factor, 430);
        // ctx.lineTo(850 + x_factor, 150);
        // ctx.lineTo(200 + x_factor, 150);
        // ctx.lineTo(200 + x_factor, 300);
        // ctx.stroke();
        // ctx.closePath();
        ctx.drawImage(path_image, 0, 0, canvas.width, canvas.height)
    }
}

class Ball {
    constructor(x, y, color, img, path) {
        this.position = {
            x,
            y
        }
        this.color = color;

        this.path_type = path;
        this.image = img
        this.pause = false
    }


    draw() {

        ctx.save();
        ctx.fillStyle = this.color
        ctx.beginPath()
        if (this.path_type == 1 && this.position.x == 30) {
            ctx.drawImage(this.image, this.position.x - 26, this.position.y - 25, 50, 50)

        } else if (this.path_type == 2) {
            ctx.drawImage(this.image, this.position.x - 18, this.position.y - 25, 50, 50)
        } else if (this.path_type == 3)
            ctx.drawImage(this.image, this.position.x - 25, this.position.y - 20, 50, 50)
        else
            ctx.drawImage(this.image, this.position.x - 25, this.position.y - 25, 50, 50)
        ctx.fill()
        ctx.restore();
    }
}
var balls = []
function reload() {

    fac = 0
    for (let i = 0; i < 40; i++) {
        ball_color_index = Math.floor(Math.random() * 4);
        randomized_num = Math.floor(Math.random() * 2);

        if (prev_index != ball_color_index) {


            if (randomized_num == 0) {
                var ball = new Ball(30, 0 - fac, "", img1, 1)
                ball.image = images[ball_color_index]
                ball.color = colors[ball_color_index]
                fac += 40
                balls.push(ball)

            } else if (randomized_num == 1) {
                var ball = new Ball(30, 0 - fac, "", img1, 1)
                ball.image = images[ball_color_index]
                ball.color = colors[ball_color_index]
                fac += 40
                var ball2 = new Ball(30, 0 - fac, "", img1, 1)
                ball2.image = images[ball_color_index]
                ball2.color = colors[ball_color_index]
                fac += 40
                i++;
                balls.push(ball)
                balls.push(ball2)


            }
            prev_index = ball_color_index
        } else {
            i--;
        }
    }
}

reload()
var pausing_counter = 0
var some_paused = false

var pausing_counter2 = 0

var c = 1
// var ball = new Ball(10+x_factor, 0, img1)
var path_type = 1

var myInterval = setInterval(

    function () {
        
        if (start) {

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(back, 0, 0, canvas.width, canvas.height)
            ctx.drawImage(path_image, 0, 0, canvas.width, canvas.height)
            //Draw the hearts
            if (lives == 3) {

                ctx.drawImage(life, 860, 20)
                ctx.drawImage(life, 900, 20)
                ctx.drawImage(life, 940, 20)

            } else if (lives == 2) {
                ctx.drawImage(life, 860, 20)
                ctx.drawImage(life, 900, 20)
                ctx.drawImage(life_lost, 940, 20)

            } else if (lives == 1) {
                ctx.drawImage(life, 860, 20)
                ctx.drawImage(life_lost, 900, 20)
                ctx.drawImage(life_lost, 940, 20)

            } else if (lives == 0) {
                ctx.drawImage(life_lost, 860, 20)
                ctx.drawImage(life_lost, 900, 20)
                ctx.drawImage(life_lost, 940, 20)
                balls = []
                game_music.pause()
                again.play()
                start = false
                setTimeout(() => {
                    reload(); game_music.load()
                    game_music.play()
                    lives = 3
                    start = true
                    which_question = 1
                }, 4000);

                // setTimeout(reload(), 10000);
                // reload()



            }

            // path()
            balls.forEach((ball) => {
                ball.draw()
                // ball.draw()
                x = ball.position.x
                y = ball.position.y
                if ((ball.position.x == 10 + x_factor && ball.position.y == 500) || (ball.position.x == 100 + x_factor && ball.position.y == 430) || (ball.position.x == 200 + x_factor && ball.position.y == 300)) {
                    ball.path_type = 3;
                } else if ((ball.position.x == 940 + x_factor && ball.position.y == 500) || (ball.position.x == 850 + x_factor && ball.position.y == 430)) {
                    ball.path_type = 2;
                } else if ((ball.position.x == 940 + x_factor && ball.position.y == 80) || (ball.position.x == 850 + x_factor && ball.position.y == 150)) {
                    ball.path_type = 4;
                } else if ((ball.position.x == 100 + x_factor && ball.position.y == 80) || (ball.position.x == 200 + x_factor && ball.position.y == 150)) {
                    ball.path_type = 1;
                } else {
                    // balls.splice(0, 0)
                    // // start = false
                    // console.log("asdssdategrfgfrrdfgfr")
                }


                if (((x == 10 + x_factor && y < 500) || (x == 100 + x_factor && y < 430) || (x == 200 + x_factor && y < 300)) && ball.path_type == 1 && !(ball.pause)) {
                    ball.position.y += 2;

                } else if (((x == 940 + x_factor && y > 80) || (x == 850 + x_factor && y > 150)) && ball.path_type == 2 && !(ball.pause)) {
                    ball.position.y -= 2;
                } else if (((x < 940 + x_factor && y == 500) || (x < 850 + x_factor && y == 430)) && ball.path_type == 3 && !(ball.pause)) {
                    ball.position.x += 2;
                } else if (((x > 100 + x_factor && y == 80) || (x > 200 + x_factor && y == 150)) && ball.path_type == 4 && !(ball.pause)) {
                    ball.position.x -= 2;
                } else {
                    // if (c == 1) {
                    //     // console.log("position: " + ball.position.x + ", " + ball.position.y)
                    //     // console.log(ball.color)
                    //     // console.log(ball.path_type)
                    //     c--;

                    // }
                    // if (resume) {

                    //     start = false
                    //     resume = false
                    //     fig = true
                    //     let btn = document.createElement("button")
                    //     btn.innerHTML = "Try Again"
                    //     btn.id = "try"
                    //     btn.style["position"] = "absolute"
                    //     btn.style["top"] = "150px"
                    //     btn.style["border-radius"] = "25px"
                    //     btn.style["opacity"] = "0.8"
                    //     btn.style["background-color"] = "#92cefc"
                    //     btn.style["font-size"] = "20px"
                    //     btn.style["cursor"] = "pointer"
                    //     btn.onclick = function () {
                    //         start = true
                    //         fig = false
                    //         btn.remove()

                    //     };
                    //     document.body.appendChild(btn);
                    // }
                }

            })

            if (some_paused2) {

                pausing_counter2 += 2;

            } else if (some_paused) {

                pausing_counter += 2;
            }

            if (pausing_counter == 80) {
                unpausing(leader)
                some_paused = false //if not something is paused in the future
                pausing_counter = 0
                console.log("unpausing")
                resume = true
            }
            if (pausing_counter2 == 80) {
                unpausing2(leader, leader2)
                some_paused2 = false
                pausing_counter2 = 0
                console.log("unpausing22222")
                resume = true
            }



            ctx.save();
            ctx.translate(500, 300);
            ctx.rotate(iRotate);
            ctx.translate(-40, -40);
            ctx.drawImage(person_images[person_index], 0, -10);
            ctx.draw
            ctx.restore();
            ctx.save();
            // ctx.fillStyle = 'black';
            // ctx.beginPath();
            // ctx.moveTo(220, 300);
            // ctx.arc(500, 300, 5, 0, 360 * Math.PI / 180, false);
            // ctx.fill();
            // ctx.restore();

            for (var i = 0; i < bullet.length; i++) {
                ctx.save();
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.moveTo(bullet[i].x, bullet[i].y);
                // ctx.arc(bullet[i].x, bullet[i].y, 20, 0, 360 * Math.PI / 180, false);
                ctx.drawImage(bullet[i].image, bullet[i].x - 20, bullet[i].y - 20, 50, 50)
                ctx.fill();
                ctx.restore();
            }







            for (var i = 0; i < bullet.length; i++) {
                bullet[i].x = bullet[i].x + bullet[i].speedX;
                bullet[i].y = bullet[i].y + bullet[i].speedY;

                //loop over the balls
                for (let j = 0; j < balls.length; j++) {
                    var x1 = bullet[i].x
                    var y1 = bullet[i].y
                    var x2 = balls[j].position.x
                    var y2 = balls[j].position.y

                    var flag = collision(x1, y1, x2, y2)
                    var color1 = bullet[i].color
                    var color2 = balls[j].color
                    var path2 = balls[j].path_type
                    paused = balls[j].pause
                    if (flag) {
                        if (color1 == color2) {
                            var index_after = null;
                            var index_before = null;
                            if (j == 0) {
                                index_before = 1;
                            } else if (j == balls.length - 1) {
                                index_after = j - 1;
                            } else {
                                index_before = j + 1;
                                index_after = j - 1;
                            }

                            var color_before = null
                            var color_after = null

                            if (index_before != null) {
                                color_before = balls[index_before].color
                            }
                            if (index_after != null) {
                                color_after = balls[index_after].color
                            }
                            // check if the color of the preceding (after) ball is the same
                            if (color_after == color2) {
                                balls.splice(index_after, 2)
                                push_down = false
                                bullet.splice(i, 1)
                                // win_music.play();
                                if (some_paused) {
                                    if (leader < index_after) {
                                        leader2 = leader
                                        leader = index_after
                                        some_paused2 = true
                                        console.log(leader + ",,,, " + leader2)
                                        pausing_balls2(leader, leader2)
                                        console.log("pausing2")
                                    } else if (leader > index_after) {
                                        leader -= 2
                                        leader2 = index_after
                                        some_paused2 = true
                                        console.log(leader + ",,,, " + leader2)
                                        // console.log(pausing_counter+" , "+pausing_counter2)
                                        var tmp = pausing_counter
                                        pausing_counter = pausing_counter2
                                        pausing_counter2 = tmp
                                        // console.log(pausing_counter+" , "+pausing_counter2)
                                        // pausing_balls2(leader, leader2)
                                        console.log("pausing2")
                                    }
                                } else {

                                    leader = index_after
                                    pausing_balls(leader)
                                    some_paused = true

                                }
                                // console.log(leader)
                                // break;
                            } else if (color_before == color2) {
                                balls.splice(j, 2)
                                push_down = false
                                bullet.splice(i, 1)
                                // win_music.play();
                                if (some_paused) {
                                    if (leader < j) {
                                        leader2 = leader
                                        leader = j
                                        console.log(leader + ",,,, " + leader2)
                                        some_paused2 = true
                                        pausing_balls2(leader, leader2)
                                        console.log("pausing2")
                                    } else if (leader > j) {
                                        leader -= 2
                                        leader2 = j
                                        console.log(leader + ",,,, " + leader2)
                                        some_paused2 = true
                                        // console.log(pausing_counter+" , "+pausing_counter2)
                                        var tmp = pausing_counter
                                        pausing_counter = pausing_counter2
                                        pausing_counter2 = tmp
                                        // console.log(pausing_counter+" , "+pausing_counter2)
                                        // pausing_balls2(leader, leader2)

                                    }
                                } else {

                                    leader = j
                                    pausing_balls(leader)
                                    some_paused = true
                                }
                                // console.log(leader)
                                // break;
                            } else {
                                var nball = new Ball(x2, y2, color2, bullet[i].image, path2)
                                nball.pause = paused
                                if (some_paused) {
                                    leader += 1
                                }
                                balls.splice(j + 1, 0, nball)
                                adding(j)
                                bullet.splice(i, 1)
                                lives--;
                            }

                            break;


                        } else {
                            pathType = balls[j].path_type
                            img = bullet[i].image



                            // If the prevoius of the collided one is the same collor of the bullet
                            if (j + 1 < balls.length && j + 2 < balls.length && (balls[j + 1].color == color1 && balls[j + 2].color == color1)) {
                                // console.log(balls.length)
                                balls.splice(j + 1, 2);
                                push_down = false
                                bullet.splice(i, 1)
                                // win_music.play();
                                // console.log(balls.length)
                                leader = j + 1
                                pausing_balls(leader)
                                some_paused = true
                                break;

                            } else {

                                var nball = new Ball(x2, y2, color1, bullet[i].image, pathType)
                                nball.pause = paused
                                if (some_paused) {
                                    leader += 1
                                }
                                balls.splice(j + 1, 0, nball)
                                adding(j)


                                bullet.splice(i, 1)
                                lives--;

                                // console.log("Index of new: "+balls.indexOf(nball))
                                // console.log(bullet.length)
                                // console.log("2: " + balls.length)
                            }
                            break;

                        }
                    }
                }


            }

            for (let i = 0; i < bullet.length; i++) {
                if (bullet[i].x > 1000 || bullet[i].x < 0 || bullet[i].y > 562 || bullet[i].y < 0) {
                    bullet.splice(i, 1)
                }
            }

        } 
        else if (before_start) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(back,0,0, canvas.width, canvas.height)
            before_start = false

        }
    }, 1000 / 60
)

function animate_question() {
    ctx.beginPath();
    ctx.rect(0, 80, 1000, 390);
    ctx.fillStyle = "rgba(10,10,10,0.7)";
    ctx.fill();
    // ctx.globalAlpha = 0.1;

}


function unpausing(leader) {
    for (let i = 0; i < leader; i++) {
        balls[i].pause = false
    }
    leader = 0
    // resume = true
    if (resume == true) {
        start = false
        // let btn = document.createElement("button");
        // // game_music.pause();
        // // btn.innerHTML = '<img src = "Images/tryagain.png">';
        // btn.innerHTML = "Try Again"
        // btn.id = "try"
        // btn.style["position"] = "absolute"
        // btn.style["top"] = "150px"
        // btn.style["border-radius"] = "25px"
        // btn.style["opacity"] = "0.8"
        // btn.style["background-color"] = "#92cefc"
        // btn.style["font-size"] = "20px"
        // btn.style["cursor"] = "pointer"
        // btn.onclick = function () {
        //     document.getElementById("try").remove();
        //     start = true
        //     game_music.play();
        //     win_music.pause();
        //     document.getElementById('first_question').style.visibility = "hidden"

        // };
        // // win_music.play();
        // document.body.appendChild(btn);
        // document.getElementById("restart").style.display = "block"
        resume = false
        // push_down = false
        animate_question()
        if (which_question == 1) {


            document.getElementById('first_question').style.display = "block"
            $(document).ready(function () {
                $('#first_question')
                    .delay(50)
                    .animate({ top: '155px', opacity: '1' }, 1000);
            });
            which_question++;
        } else if (which_question == 2) {
            document.getElementById('second_question').style.display = "block"
            $(document).ready(function () {
                $('#second_question')
                    .delay(50)
                    .animate({ top: '155px', opacity: '1' }, 1000);
            });
            which_question++;
        } else if (which_question == 3) {
            document.getElementById('third_question').style.display = "block"
            $(document).ready(function () {
                $('#third_question')
                    .delay(50)
                    .animate({ top: '155px', opacity: '1' }, 1000);
            });
            which_question++;
        } else if (which_question == 4) {
            document.getElementById('fourth_question').style.display = "block"
            $(document).ready(function () {
                $('#fourth_question')
                    .delay(50)
                    .animate({ top: '155px', opacity: '1' }, 1000);
            });
            which_question == 1;
        }
    }

}

function unpausing2(leader1, leader2) {
    for (let i = leader2; i < leader1; i++) {
        balls[i].pause = false
        console.log("index: " + i)
    }
    //switching leaders again
    leader1 = leader2
    leader2 = 0
    // resume = true
    if (resume == true) {
        start = false
        // // game_music.pause();
        // let btn = document.createElement("button");
        // // btn.innerHTML = '<img src = "Images/tryagain.png">';
        // btn.innerHTML = "Try Again"
        // btn.id = "try"
        // btn.style["position"] = "absolute"
        // btn.style["top"] = "150px"
        // btn.style["border-radius"] = "25px"
        // btn.style["opacity"] = "0.8"
        // btn.style["background-color"] = "#92cefc"
        // btn.style["font-size"] = "20px"
        // btn.style["cursor"] = "pointer"
        // btn.onclick = function () {
        //     document.getElementById("try").remove();
        //     start = true
        //     game_music.play();
        //     win_music.pause();
        //     q1 = document.getElementById('first_question') 
        //     q1.style.visibility = "hidden"

        // };
        // // win_music.play();
        // document.body.appendChild(btn);
        // document.getElementById("restart").style.display = "block"
        resume = false
        animate_question()
        if (which_question == 1) {


            document.getElementById('first_question').style.display = "block"
            $(document).ready(function () {
                $('#first_question')
                    .delay(50)
                    .animate({ top: '155px', opacity: '1' }, 1000);
            });
            
            // $(document).ready(function () {
            //     $('#first_question')
            //         .delay(50)
            //         .animate({ top: '500px', opacity: '1' }, 1000);
            // });
            which_question++;
        } else if (which_question == 2) {
            document.getElementById('second_question').style.display = "block"
            $(document).ready(function () {
                $('#second_question')
                    .delay(50)
                    .animate({ top: '155px', opacity: '1' }, 1000);
            });
            which_question++;
        } else if (which_question == 3) {
            document.getElementById('third_question').style.display = "block"
            $(document).ready(function () {
                $('#third_question')
                    .delay(50)
                    .animate({ top: '155px', opacity: '1' }, 1000);
            });
            which_question++;
        } else if (which_question == 4) {
            document.getElementById('fourth_question').style.display = "block"
            $(document).ready(function () {
                $('#fourth_question')
                    .delay(50)
                    .animate({ top: '155px', opacity: '1' }, 1000);
            });
            which_question == 1;
        }
    }
}

function pausing_balls(n) {
    for (let i = 0; i < n; i++) {
        balls[i].pause = true
    }
    // console.log(n)
    // if (n == 0) {

    // if (resume) {
    //     start = false
    //     resume = false
    //     fig = true
    //     let btn = document.createElement("button")
    //     btn.innerHTML = "Try Again"
    //     btn.id = "try"
    //     btn.style["position"] = "absolute"
    //     btn.style["top"] = "150px"
    //     btn.style["border-radius"] = "25px"
    //     btn.style["opacity"] = "0.8"
    //     btn.style["background-color"] = "#92cefc"
    //     btn.style["font-size"] = "20px"
    //     btn.style["cursor"] = "pointer"
    //     btn.onclick = function () {
    //         start = true
    //         fig = false
    //         btn.remove()

    //     };
    //     document.body.appendChild(btn);
    // }
    // start = false    
    // }
    game_music.pause();

    win_music.load();
    win_music.play();

}

function pausing_balls2(n, n2) {
    for (let i = n2; i < n; i++) {
        balls[i].pause = true
        console.log("aasa")
    }
    // if (n == 0) {
    //     if (resume) {
    //         start = false
    //         resume = false
    //         fig = true
    //         let btn = document.createElement("button")
    //         btn.innerHTML = "Try Again"
    //         btn.id = "try"
    //         btn.style["position"] = "absolute"
    //         btn.style["top"] = "150px"
    //         btn.style["border-radius"] = "25px"
    //         btn.style["opacity"] = "0.8"
    //         btn.style["background-color"] = "#92cefc"
    //         btn.style["font-size"] = "20px"
    //         btn.style["cursor"] = "pointer"
    //         btn.onclick = function () {
    //             start = true
    //             fig = false
    //             btn.remove()

    //         };
    //         document.body.appendChild(btn);
    //     }
    // }
    // start = false
    game_music.pause();
    win_music.load();
    win_music.play();

}

function adding(index) {
    for (let i = index; i >= 0; i--) {
        my_ball = balls[i]
        pathType = my_ball.path_type
        x = my_ball.position.x
        y = my_ball.position.y
        if (pathType == 1) {
            if (x == 30) {
                var dify = 500 - y
                if (dify < 40) {
                    balls[i].position.x = 30 + (40 - dify)
                    balls[i].position.y = 500
                    balls[i].path_type = 3
                } else {
                    balls[i].position.y += 40
                }

            } else if (x == 120) {
                var dify = 430 - y
                if (dify < 40) {
                    balls[i].position.x = 120 + (40 - dify)
                    balls[i].position.y = 430
                    balls[i].path_type = 3
                } else {
                    balls[i].position.y += 40
                }
            } else if (x == 220) {
                var dify = 220 - y
                if (dify < 40) {
                    console.log("Game Over")
                }
            }

        }




        else if (pathType == 2) {
            if (x == 960) {
                var dify = y - 80
                if (dify < 40) {
                    balls[i].position.x = 960 - (40 - dify)
                    balls[i].position.y = 80
                    balls[i].path_type = 4
                } else {
                    balls[i].position.y -= 40
                }
            } else if (x == 870) {
                var dify = y - 150
                if (dify < 40) {
                    balls[i].position.x = 870 - (40 - dify)
                    balls[i].position.y = 150
                    balls[i].path_type = 4
                } else {
                    balls[i].position.y -= 40
                }
            }
        }
        else if (pathType == 3) {
            if (y == 500) {
                var difx = 960 - x
                if (difx < 40) {
                    balls[i].position.x = 960
                    balls[i].position.y = 500 - (40 - difx)
                    balls[i].path_type = 2
                } else {
                    balls[i].position.x += 40
                }
            } else if (y == 430) {
                var difx = 870 - x
                if (difx < 40) {
                    balls[i].position.x = 870
                    balls[i].position.y = 430 - (40 - difx)
                    balls[i].path_type = 2
                } else {
                    balls[i].position.x += 40
                }
            }
        } else if (pathType == 4) {
            if (y == 80) {
                var difx = x - 120
                if (difx < 40) {
                    balls[i].position.x = 120
                    balls[i].position.y = 80 + (40 - difx)
                    balls[i].path_type = 1
                } else {
                    balls[i].position.x -= 40
                }
            } else if (y == 150) {
                var difx = x - 220
                if (difx < 40) {
                    balls[i].position.x = 220
                    balls[i].position.y = 150 + (40 - difx)
                    balls[i].path_type = 1
                } else {
                    balls[i].position.x -= 40
                }
            }
        }
    }




}


function collision(x1, y1, x2, y2) {
    // console.log(bullet.x)


    if ((x1 > x2 - 20 && y1 > y2 - 20) && (x1 < x2 + 20 && y1 < y2 + 20)) {
        return true
    }
}

function closeFirst() {
    document.getElementById('first_question').style.display = "none"
    // document.getElementById('first_question').remove()
     $(document).ready(function () {
                $('#first_question')
                    .delay(50)
                    .animate({ top: '500px', opacity: '1' }, 1000);
            });
    start = true
    game_music.play()
    push_down = true
}
function closeSecond() {
    document.getElementById('second_question').style.display = "none"
    // document.getElementById('second_question').remove()
    $(document).ready(function () {
        $('#second_question')
            .delay(50)
            .animate({ top: '500px', opacity: '1' }, 1000);
    });
    start = true
    game_music.play()
    push_down = true

}
function closeThird() {
    document.getElementById('third_question').style.display = "none"
    // document.getElementById('third_question').remove()
    $(document).ready(function () {
        $('#third_question')
            .delay(50)
            .animate({ top: '500px', opacity: '1' }, 1000);
    });
    start = true
    game_music.play()
    push_down = true
}
function closeFourth() {
    // document.getElementById('first_question').style.visibility = "hidden"
    document.getElementById('fourth_question').remove()
    // game_music.play()
    // game_finished = true;
    excellent.play()
    game_music.pause()
    setTimeout(() => {
        console.log("finished")
        var player = window.parent.GetPlayer()
        player.SetVar('win_zuma', true)
        // game_finished = true 
    }, 2000);
    push_down = true
}
function load_js() {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = 'lib/path.js';
    head.appendChild(script);
}

canvas.onmousemove = function (ev) {
    var ev = ev || window.event;
    var x = ev.clientX - canvas.offsetLeft;
    var y = ev.clientY - canvas.offsetTop;
    var aa = x - 500;
    var bb = y - 300;
    var cc = Math.sqrt(aa * aa + bb * bb);

    if (aa > 0 && bb > 0) {
        iRotate = Math.asin(bb / cc) + 90 * Math.PI / 180;
    } else if (aa > 0) {
        iRotate = Math.asin(aa / cc);
    }
    if (aa < 0 && bb > 0) {
        iRotate = -(Math.asin(bb / cc) + 90 * Math.PI / 180);
    } else if (aa < 0) {
        iRotate = Math.asin(aa / cc);
    }
};


canvas.onmousedown = function (ev) {
    if(push_down){


        var ev = ev || window.event;
        var x = ev.clientX - canvas.offsetLeft;
        var y = ev.clientY - canvas.offsetTop;
        var aa = x - 500;
        var bb = y - 300;
        var cc = Math.sqrt(aa * aa + bb * bb);
        
        var speed = 12;
        var speedX = speed * aa / cc;
        var speedY = speed * bb / cc;
        
        bullet.push({
        x: 500 + 40 * aa / cc,
        y: 300 + 40 * bb / cc,
        speedX: speedX,
        speedY: speedY,
        image: images[color_index],
        color: colors[color_index]
    });
    color_index = Math.floor(Math.random() * 4);
    person_index = color_index
    }
}
