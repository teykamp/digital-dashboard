<template>
    <div style="position: absolute;">
    <img class="s2k" src="../assets/3d/anims/s2korange.gif" alt="">
    </div>
    <div style="position: absolute;">
    <img style="position:relative; left: -1100px; top: -250px;" src="../assets/3d/anims/s2kgreen.gif" alt="">
    </div>

    <div style="position: absolute;">
    <img class="c4" style="" src="../assets/3d/anims/c4orange.gif" alt="">
    </div>
    <div style="position: absolute;">
    <img style="position:relative; left: -460px; top: -250px;" src="../assets/3d/anims/c4green.gif" alt="">
    </div>

    <div style="position: absolute;">
    <img class="n300zx" style="" src="../assets/3d/anims/300zxorange.gif" alt="">
    </div>
    <div style="position: absolute;">
    <img style="position:relative; left: 200px; top: -250px;" src="../assets/3d/anims/300zxgreen.gif" alt="">
    </div>

    <div style="position: absolute;">
    <img src="../assets/logos/s2klogo.svg" style="position:relative; height: 2rem; left: -800px; top: 200px; z-index: 5;" class="logo">
    </div>

    <div style="position: absolute;">
    <img src="../assets/logos/c4logo.svg" style="position:relative; height: 2rem; left: -170px; top: 200px; z-index: 5;" class="logo">
    </div>

    <div style="position: absolute;">
    <img src="../assets/logos/300zxlogo.svg" style="position:relative; height: 2rem; left: 450px; top: 200px; z-index: 5;" class="logo">
    </div>

    <div style="position: absolute;">
    <a href="https://github.com/teykamp/digital-dashboard">
    <h2 style="position: relative; top: 350px; left: -300px; font-family: 'Courier New', Courier, monospace; color: #414141;">by teykamp and shotgunfacelift on github</h2>
    </a>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.s2k{
    position:relative; left: -1100px; top: -250px; z-index: 2;
}
.s2k:hover{
    position:relative; left: -1100px; top: -250px; z-index: 2; opacity: 0.1%;
}

.c4{
    position:relative; left: -460px; top: -250px; z-index: 2;
}
.c4:hover{
    position:relative; left: -460px; top: -250px; z-index: 2; opacity: 0.1%;
}

.n300zx{
    position:relative; left: 200px; top: -250px; z-index: 2;
}
.n300zx:hover{
    position:relative; left: 200px; top: -250px; z-index: 2; opacity: 0.1%;
}

.logo{
    filter: invert(18%) sepia(62%) saturate(5%) hue-rotate(324deg) brightness(99%) contrast(83%);
}
</style>