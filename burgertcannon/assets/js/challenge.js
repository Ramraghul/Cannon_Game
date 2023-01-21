
function getRandomInt(min, max) {
    min = Math.ceil(min);
    //300,50
    max = Math.floor(max);
    //1200,200
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fire(ball, ballCoOrds, targetX, targetY,burger1,burger2,burger3) {
    
    // ball => Image 
    console.log(burger1);
    console.log(ballCoOrds);

    //ballCoOrds => Ball throw hight,and angle speed
    // bottom: 695
    // height:50
    // left:0
    // right:0
    // top:645
    // width:0
    // x:0
    // y:645

    //targetX  => ball x axis
    //targetY => Ball y axis
    

    let xDistance = ballCoOrds.x - targetX;
    let yDistance = ballCoOrds.y - targetY;

    distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance),
        time = distance;
        //time is ball shooting time;

    let start = {
        x: ballCoOrds.x,
        y: ballCoOrds.y,
        t: Date.now()
    }


    let difference = {
        x: targetX - ballCoOrds.x,
        y: targetY - ballCoOrds.y,
        t: time
    };


    let fireAction = setInterval(function (curTime = Date.now()) {

        let elapsed = curTime - start.t, ratio = elapsed / difference.t;

        ball.style.left = start.x + difference.x * ratio;
        ball.style.top = start.y + difference.y * ratio;

        if (elapsed >= 1500) {
            clearInterval(fireAction);
        }

    }, 6
    )
    //60

}


const dropBurger = (burger) => {
    let movingDownwards = true;

    const speed = getRandomInt(50, 200)

    interval = setInterval(function () {

        let burgertCoOrds = burger.getBoundingClientRect();
        
        pos1 = burgertCoOrds.top


        if (pos1 > 650) {
            movingDownwards = false
        }
        if (pos1 < 100) {
            movingDownwards = true
        }

        if (movingDownwards == true) {
            pos1 = pos1 + 10;
            burger.style.top = pos1
        } else {
            pos1 = pos1 - 10;
            burger.style.top = pos1
        }
    }, speed);
}


function initializePosition(burger) {

    burger.style.left = getRandomInt(300, 1200)
}




function hanldeMouse() {

    let cannonBall = document.getElementById("cannonBall");
    let cannonBallCoOrds = cannonBall.getBoundingClientRect();

    let cannon = document.getElementById("cannon");
    let cannonCoOrds = cannon.getBoundingClientRect();

    let burger0 = document.getElementById("burger1");
    let burger1= burger0.getBoundingClientRect();

    let burger2 = document.getElementById("burger2");
    let burger3= burger2.getBoundingClientRect();

    let burger4 = document.getElementById("burger3");
    let burger5= burger4.getBoundingClientRect();


    document.addEventListener("mousemove", e => {

        let angle = Math.atan2(e.pageX - cannonCoOrds.x, - (e.pageY - cannonCoOrds.y)) * (180 / Math.PI);
        angle = angle - 13
        cannon.style.transform = `rotate(${angle}deg)`;

        document.addEventListener('click', function (event) {
            // Don't follow the link
            event.preventDefault();
            fire(cannonBall, cannonBallCoOrds, event.pageX, event.pageY, burger1, burger3, burger5)

        }, false);
    });

}



document.addEventListener('DOMContentLoaded', function () {
    hanldeMouse();

    let burger1 = document.getElementById("burger1");
    let burger2 = document.getElementById("burger2");
    let burger3 = document.getElementById("burger3");
    initializePosition(burger1)
    initializePosition(burger2)
    initializePosition(burger3)
    dropBurger(burger1)
    dropBurger(burger2)
    dropBurger(burger3)

});