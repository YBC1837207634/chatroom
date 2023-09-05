<template>
    <div class="left" >
        <img src="../assets/default.svg" class="head-icon" alt="默认头像">
        <div class="message-bubble"> 
            <span class="message-title">{{ currentUser }}</span>
            <br>
            <div class="message-text">{{ msg }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            currentUser: String,
            msg: String
        }
    }
</script>

<style  scoped>
.left {
    margin: 10px 0;
    font-size: 16px;
    clear: both;
    float: left;
}
.head-icon {
    height: 50px;
    width: 50px;
}
.message-bubble {
    margin-left: 5px;
    vertical-align: top;
    display: inline-block;
}
.message-text {
    display: inline-block;
    padding: 8px;
    max-width: 30em;
    background-color: #95ec69;
    overflow-wrap: break-word;
    word-wrap: break-word;
    border-radius: 8px;
}
.message-title {
    font-size: 0.5em;
    color: red;
}
</style>