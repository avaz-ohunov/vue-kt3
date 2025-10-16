<template>
    <div class="input_page">
        <div class="post_field">
            <input type="text" class="input_post" id="input_post" placeholder="Новый пост..." v-model="input_post">
            <Button title="Добавить" size="sm" color="blue" @click="addPost(input_post)"/>
        </div>
    </div>
</template>

<script setup>
import { usePostsStore } from '../stores/posts';
import Button from './UI/Button.vue'; 

const postsStore = usePostsStore();

const addPost = (title) => {
    postsStore.addPost(title);
};
</script>

<style scoped>

.input_page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post_field {
  display: flex;
  align-items: center;
  background-color: #FCFBFB;
  width: 800px;
  height: 89px;
  border-radius: 15px;
  border: 2px solid #0094FF;
  margin: 10px;
  padding-top: 5px;
  box-shadow: 0px 4px 4px 0px #00000040;
}

.input_post {
  width: 561px;
  height: 31px;
  font-size: 24px;
  margin: 10px;
  border-radius: 15px;
  border: 1px solid #6E6E6E;
  padding: 10px;
}

</style>