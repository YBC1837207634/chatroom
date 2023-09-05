<template>
    <div class="right" >
        <div class="message-bubble"> 
            <div class="message-text">{{ msg }}</div>
        </div>
        <img src="../assets/default.svg" class="head-icon" alt="默认头像">
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
.right {
    margin: 10px 0;
    font-size: 16px;
    clear: both;
    float: right;
}
.head-icon {
    height: 50px;
    width: 50px;
}
.message-bubble {
    margin-right: 5px;
    vertical-align: bottom;
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

</style>